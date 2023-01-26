import React from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function _BaseButton(props, ref) {
    return (
      <button
        {...props}
        className={[
          'py-2 px-5 transition text-white text-sm rounded',
          props.className || '',
        ].join(' ')}
        ref={ref}
      >
        {props.children}
      </button>
    );
  },
);

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function _PrimaryButton(props, ref) {
    return (
      <BaseButton
        {...props}
        className='bg-green-700 hover:bg-green-800'
        ref={ref}
      >
        {props.children}
      </BaseButton>
    );
  },
);

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function _SecondaryButton(props, ref) {
    return (
      <BaseButton
        {...props}
        className='bg-gray-700 hover:bg-gray-800'
        ref={ref}
      >
        {props.children}
      </BaseButton>
    );
  },
);