import React from 'react'

const ImageModal = ({ isOpen, onClose, imgSrc }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg p-4 w-3/4 max-w-3xl">
          <button onClick={onClose} className="absolute top-0 right-1 text-gray-600 text-xl hover:text-gray-800">
            &times;
          </button>
          <img src={"/upload/" + imgSrc} alt="Story" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  };

export default ImageModal