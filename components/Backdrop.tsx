import React from 'react';

interface BackdropProps {
  onHideModal: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-rose-500 to-transparent'
      onClick={props.onHideModal}
    />
  );
};

export default Backdrop;