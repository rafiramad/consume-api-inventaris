import React from "react";
import "../components/ImageModal.css";

const ImageModal = ({ show, onClose, imageSrc, altText }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          x
        </button>
        <img className="modal-content" src={imageSrc} alt={altText} />
        <div className="caption">{altText}</div>
      </div>
    </div>
  );
};

export default ImageModal;
