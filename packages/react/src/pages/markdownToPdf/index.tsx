import { readFile } from 'utils/index'
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";

import * as styles from './index.module.scss';
import { pageSizeInPixels } from 'utils/pdfSize';
import { PageSizeTypes, MDTemplateFileList } from 'constant';
import { marked, mergePdfOption, previewMDPdf, savePdf } from 'utils/markdown';
import { MdList, MDFile } from 'components/md-list';
import Modal from 'components/modal';
import MdEditor from 'components/md-editor';

import '../../styles/md.scss';

const MarkdownToPdf = () => {

    const previewRef = useRef<any>(null);

    const [pageSize, setPageSize] = useState<PageSizeTypes>("A4");
    const [customSize, setCustomSize] = useState({ width: 250, height: 353 });
    const [pdfPageSize, setPdfPageSize] = useState({ width: 0, height: 0 });

    const [file, setFile] = useState<Partial<MDFile>>({});
    const [imgUri, setImgUri] = useState('');

    const [showTemplate, setShowTemplate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    console.log(file.name)


    const pdfOption = useMemo(() => {
        return mergePdfOption({
            filename: file.name?.split('.')?.[0],
            format: pageSize === 'custom' ? 
            [customSize.width, customSize.height] : pageSize.toLowerCase(),
        })
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

        setFile({ name: file?.name ?? '', content, html });
        previewPdf(html);
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

    const previewPdf = async (html: string) => {
        const uri = await previewMDPdf(html, pdfOption);
        if (previewRef.current) {
            previewRef.current.onload = () => {
                setImgUri(uri);
            }
            previewRef.current.src = uri;
        }
    }

    const handleSave = () => {
        savePdf(file?.html ?? '', pdfOption);
    }

    const handleEdit = () => {
        setShowEdit(true);
    }

    const handleExitEdit = () => {
        setShowEdit(false);
    }

    const handleCompleteEdit = (file: MDFile) => {
        setFile(file);
        previewPdf(file.html);
        setShowEdit(false);
    }

    const handleSizeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setPageSize(event.target.value as PageSizeTypes);
    }

    const toggleTemplate = () => {
        setShowTemplate(!showTemplate);
    }

    const handleSelectTemplate = useCallback((file: MDFile) => {
        setFile(file);
        previewPdf(file.html);
        toggleTemplate();
    }, [file, showTemplate, imgUri])



    return (
        <div className={styles['page']}>
            <h1>Hello, Transfer Markdown to PDF!</h1>

            <div className={styles['tool-bar']}>
                

                <label className={styles['upload']}>
                    选择文件
                    <input
                        style={{ opacity: '0', width: '0' }}
                        type="file"
                        onChange={handleFileChange} accept='.md'
                        aria-description='' />
                </label>
                <span className={styles['use-template']} onClick={toggleTemplate}>使用模板</span>
                
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
                    style={{ display: file.content ? 'block' : 'none'}}
                    onClick={handleEdit}
                    className={styles['show-content']}>
                    编辑
                </button>
                

                <img ref={previewRef} className={styles['preview-img']} style={{ width: `${pdfPageSize.width}px`}} />
            </div>


            <Modal 
                visible={showEdit}
                onClose={() => setShowEdit(false)}
                closeAble={false}
                bodyStyle={{ borderRadius: '0px', padding: '0px'}} 
            >
                <MdEditor 
                    file={file}
                    handleExitEdit={handleExitEdit}
                    handleCompleteEdit={handleCompleteEdit}>
                </MdEditor>
            </Modal>

            <Modal visible={showTemplate} onClose={toggleTemplate} title='简历模板'>
                <MdList files={MDTemplateFileList} onClick={handleSelectTemplate} />
            </Modal>
        </div>
    )
}


export default MarkdownToPdf