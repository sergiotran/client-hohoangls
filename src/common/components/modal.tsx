import classNames from 'classnames';
import React from 'react';
import XMark from '../assets/icons/x-mark';
import { BaseButton } from './buttons';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  footer?: React.ReactNode;
  closeOnClickOutside?: boolean;
} & React.PropsWithChildren;

const Modal: React.FC<Props> = ({
  open,
  closeOnClickOutside = false,
  footer,
  handleClose,
  children,
  title,
}) => {
  return (
    <div
      className={classNames({
        'fixed top-0 left-0 w-full h-full overflow-hidden z-20 flex flex-col justify-center items-center':
          open,
      })}
      style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
      onClick={closeOnClickOutside ? handleClose : undefined}
    >
      <dialog
        className='w-[768px] max-w-full rounded p-4 flex flex-col gap-3 animate-fadeIn'
        open={open}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className='flex flex-row justify-between items-center'>
          <h3 className='text-lg font-bold flex-1'>{title}</h3>
          <BaseButton
            onClick={handleClose}
            className='flex-0 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 !p-1 !text-black transition'
          >
            <XMark width={15} height={15} />
          </BaseButton>
        </header>
        <main className='p-3 rounded border'>{children}</main>
        <footer className='flex justify-end items-center'>{footer}</footer>
      </dialog>
    </div>
  );
};

export default Modal;