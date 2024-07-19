import React from "react";

interface ModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="bg-beige shadow-[0_2px_8px_rgba(0,0,0,0.25)] animate-[slide-down_300ms_ease-out_forwards] p-4 rounded-[14px]">
        {props.children}
      </div>
    </div>
  );
};

export default ModalOverlay;
