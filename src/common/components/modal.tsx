import classNames from 'classnames';
import React from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  footer?: React.ReactNode;
} & React.PropsWithChildren;
const Modal: React.FC<Props> = ({ open, footer, handleClose, children, title }) => {
  return (
    <div
      className={classNames({
        'fixed top-0 left-0 w-full h-full overflow-hidden z-20 flex flex-col justify-center items-center':
          open,
      })}
      style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
      onClick={handleClose}
    >
      <dialog
        className='w-96 rounded p-4 divide-y divide-y-1'
        open={open}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header>
          <h3 className='text-lg font-bold'>{title}</h3>
        </header>
        {children}
        <footer className='p-3 flex justify-end items-center'>
          {footer}
        </footer>
      </dialog>
    </div>
  );
};

export default Modal;