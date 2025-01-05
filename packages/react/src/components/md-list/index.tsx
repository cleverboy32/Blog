import React, { useCallback, useDeferredValue, useEffect, useRef } from 'react';
import { marked } from 'utils/markdown';

import './index.scss'
import { mergePdfOption, previewMDPdf } from 'utils/markdown';

interface IMdListProps {
    files: string[];
    onClick: (file: MDFile) => void;
}

export interface MDFile {
    name: string;
    imgUri: string;
    content: string;
    html: string;
}

export const MdList: React.FC<IMdListProps> = ({ files, onClick }) => {

    const [thumbnailList, setThumbnailList] = React.useState<string[]>([]);

    const deferThumbnailList = useDeferredValue(thumbnailList);

    const fileContents = useRef<Pick<MDFile, 'content' | 'html' >[]>([]);

    useEffect(() => {
        generateMdThumbnail();
    }, [])

    const importBlog = async (file: string) => {
        const mdContent = await import(`blogs/markdown/${file}`).then(res => res.default);
        
        return mdContent;
    };

    const generateMdThumbnail = async () => {

        const list: string[] = [];
        files.forEach(async (file) => {
            const mdContent = await importBlog(file);
            const htmlContent = await marked.parse(mdContent);

            fileContents.current.push({ content: mdContent, html: htmlContent });
            const uri = await previewMDPdf(htmlContent, mergePdfOption());
            list.push(uri);
        })
        setThumbnailList(list);
    }

    const handleClick = useCallback((index: number) => () => {
        onClick({ name: files[index], imgUri: thumbnailList[index], ...fileContents.current[index]  });
    }, [onClick])
    

    return (
        <ul className="md-list">
            {deferThumbnailList.map((uri, index) => (
                <li key={index} className="md-list-item" onClick={handleClick(index)}>
                    <img className="md-list-item-thumbnail" src={uri} />
                </li>
            ))}
            
        </ul>
    );
};
