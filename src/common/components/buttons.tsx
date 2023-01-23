import React from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(function _PrimaryButton(props, ref) {

  return <button {...props} className='py-2 px-5 bg-green-700 hover:bg-green-800 transition text-white text-sm rounded' ref={ref}>
    {props.children}
  </button>;
});