// components/Modal.js
import React from "react";
import IconComp from "./IconComp";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ${className}`} >
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <IconComp className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose} icon={<AiOutlineClose size={24} />} />

                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="w-full">{children}</div>
            </div>
        </div >
    );
};

export const PdfViewModal = ({ isOpen, children, title, onClose, fileUrl }) => {
    return (
        <div
            className={`${isOpen ? "block" : "hidden"} fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50`}
        >
            <div className="bg-white w-full max-w-4xl mx-4 sm:mx-8 rounded-lg shadow-lg relative">
                {/* Modal Header */}
                <div className="relative border-b p-4">
                    <h2 className="text-xl font-bold text-center">{title}</h2>
                    {/* <button
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button> */}
                    <IconComp className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 text-2xl" onClick={onClose} icon={<AiOutlineClose size={24} />} />
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    <div className="flex justify-center items-center">
                        <iframe
                            src={`${process.env.NEXT_PUBLIC_API_URL}/upload/pdf/${fileUrl}`}
                            title={title || `Set ${title}`}
                            className="w-full h-[80vh] border rounded-md"
                            style={{
                                maxWidth: '100%',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Modal;
