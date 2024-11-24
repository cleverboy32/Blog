import { readFile } from 'utils/index'
import React, { ChangeEventHandler, useEffect, useMemo, useRef, useState } from "react";

import html2pdf from 'html2pdf.js';

import * as styles from './index.module.scss';
import { pageSizeInPixels } from 'utils/pdfSize';
import type { PageSizeTypes } from 'constant';
import { marked } from 'utils/markdown';

const MarkdownToPdf = () => {

    const previewRef = useRef<any>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [pageSize, setPageSize] = useState<PageSizeTypes>("A4");
    const [file, setFile] = useState('');

    const [customSize, setCustomSize] = useState({ width: 250, height: 353 });
    const [pdfPageSize, setPdfPageSize] = useState({ width: 0, height: 0 });

    const [showContent, setShowContent] = useState(true);
    const [imgUri, setImgUri] = useState('');


    const pdfOption = useMemo(() => {
         return {
            margin:       [0, 0],
            filename:     file.split('.')?.[0] ?? 'file',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: window.devicePixelRatio },
            jsPDF:        { 
                unit: 'mm',
                format: pageSize === 'custom' ? 
                [customSize.width, customSize.height] : pageSize.toLowerCase(),
                orientation: 'portrait'
            },
            pagebreak: { mode: ['css', 'legacy'] }
        };
    }, [file, pageSize, customSize])
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    useEffect(() => {
        if (pageSize === 'custom') {
            setPdfPageSize(pageSizeInPixels(pageSize, customSize));
        } else {
            setPdfPageSize(pageSizeInPixels(pageSize));
        }
    }, [pageSize, customSize])

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];
        const content = await readFile(file) as string;
        const html = await marked.parse(content)

        insertToPreview(html);
        setFile(file?.name ?? 'file')
    }

    const handleCustomSize =  (type: 'width' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'height') {
            setCustomSize({
                ...customSize,
                height: Number(e.target.value)
            })
        } else {
            setCustomSize({
                ...customSize,
                width: Number(e.target.value)
            })
        }
    }

    const previewPdf = (html: string) => {
        html2pdf().set(pdfOption).from(html).outputImg('datauristring').then(function(uri: string) {
            if (previewRef.current) {
                previewRef.current.onload = () => {
                    setImgUri(uri);
                    setShowContent(false);
                }
                previewRef.current.src = uri;
            }
        });
    }

    const saveToPdf = (html: string) => {
        html2pdf().set(pdfOption).from(html).save();
    }

    const handleSave = () => {
        saveToPdf(contentRef.current?.outerHTML ?? '')
    }


    const handlePreview = () => {
        previewPdf(contentRef.current?.outerHTML ?? '')
    }

    const handleToggleContent = () => {
        setShowContent(!showContent);
    }

    const insertToPreview = (domStr: string) => {
        if (contentRef.current) {
            contentRef.current.innerHTML = domStr;
        }
    }

    const handleSizeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setPageSize(event.target.value as PageSizeTypes);
    }

    return (
        <div className={styles['page']}>
            <h1>Hello, Get PDF type file!</h1>

            <div className={styles['tool-bar']}>
                <input 
                    className={styles['upload']}
                    type="file"
                    onChange={handleFileChange} accept='.md,.html'
                    aria-description='' />

                <button 
                    onClick={handlePreview}
                    className={styles['preview']}
                    style={{ display: file ? 'inline-block' : 'none'}}>
                    图片预览
                </button>

                <button 
                    onClick={handleSave}
                    className={styles['save']}
                    style={{ display: file ? 'inline-block' : 'none'}}>
                    保存
                </button>

                <div className={styles['size-select']}>
                    页面尺寸:
                    <select value={pageSize} onChange={handleSizeSelect} style={{ width: '175px' }}>
                        <option value="A4">A4(210×297mm)</option>
                        <option value="A2">A2(420 x 594mm)</option>
                        <option value="B4">B4(250 x 353mm)</option>
                        <option value="B2">B2(500 x 707mm)</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className={styles['size']}>
                    <span style={{ display: pageSize === 'custom' ? 'inline-block' : 'none'}}>
                        输入自定义宽高(mm): 
                        <input type="number" style={{ width: '80px'}} onChange={handleCustomSize('width')} />
                        <input type="number" style={{ width: '80px'}} onChange={handleCustomSize('width')} />
                    </span>
                </div>
                
            </div>
           

           <hr className={styles.hr}/>

            <div className={styles['preview-container']}>
                <button 
                    style={{ display: imgUri ? 'none' : 'none'}}
                    onClick={handleToggleContent}
                    className={styles['show-content']}>
                    { showContent ? '收起HTML' : '展示HTML'}
                </button>
                
                <div 
                    className={
                        `${styles['preview-content']}
                    `}
                    ref={contentRef}
                    style={{ width: `${pdfPageSize.width}px`}}
                    >
                </div>

                <img ref={previewRef} className={styles['preview-img']} style={{ width: `${pdfPageSize.width}px`}} />
            </div>
        </div>
    )
}


export default MarkdownToPdf