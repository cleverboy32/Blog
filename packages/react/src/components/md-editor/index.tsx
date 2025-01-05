import React, { useEffect, useRef, useState } from 'react';
import { MDFile } from 'components/md-list';
import { marked } from 'utils/markdown';

import './index.scss';

interface MdEditorProps {
    file: Partial<MDFile>;
    handleExitEdit: () => void;
    handleCompleteEdit: (file: MDFile) => void;
}

const MdEditor: React.FC<MdEditorProps> = ({ file, handleCompleteEdit, handleExitEdit }) => {

    const htmlRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [content, setContent] = useState<string>(file.content ?? '');

    useEffect(() => {
        setContent(file.content ?? ''); // Set the initial value of content based on the file.content
    }, [file.content]);
    
    const handleSave = () => {
        handleCompleteEdit({ 
            content: content ?? '',
            html: htmlRef.current?.innerHTML ?? '',
            name: file.name ?? '',
            imgUri: file.imgUri ?? '',
        });
    };



    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    return (
        <div className='md-wrap'>
            <div className='md-editor-header'>
                <h4>{file.name}</h4>
                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleExitEdit}>Exit</button>
                </div>
            </div>
            
            <div className='md-editor-container'>
                <textarea 
                    onChange={handleChange}
                    ref={contentRef}
                    className="md-editor" 
                    value={content} />
                <div
                    ref={htmlRef}
                    className="md-preview"
                    dangerouslySetInnerHTML={{ __html: marked.parse(content ?? '') }}
                />
            </div>
            
        </div>
    );
};

export default MdEditor;
