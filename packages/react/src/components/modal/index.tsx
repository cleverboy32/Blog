import React from "react";
import { useEffect, useRef } from "react";
import "./index.scss"

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maskClose?: boolean;
  bodyStyle?: React.CSSProperties;
  closeAble?: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children, title, maskClose, bodyStyle, closeAble = true }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible]);

  const handleMaskClick = () => {
    if (maskClose) {
        onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal"
      style={{ display: visible ? 'block' : 'none' }}
      ref={modalRef}
      onClick={handleMaskClick}
    >
   
    
      <div className="modal-container">

        <div className="modal-body" style={bodyStyle} >

          <div className="modal-header">
            {title && <h4 className="title">{title}</h4>}
            {closeAble && <span className="close" onClick={onClose}>&times;</span> }
          </div>

          <div className="modal-content" onClick={handleModalClick}>
            {children}
          </div>

          <div className="modal-footer" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
