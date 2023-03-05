import type { NextPageWithLayout } from 'pages/_app';
import React from 'react';


type FormInputProps = {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FormInput: React.FC<FormInputProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <>
      <label className='self-start' onClick={handleClick}>
        {props.label}
      </label>
      <input ref={ref} {...props} className='p-3 rounded bg-gray-100' />
    </>
  );
};

const LoginPage: NextPageWithLayout = () => {
  return (
    <div className='h-full relative flex items-center justify-center max-h-full overflow-auto'>
      <div className='bg-white p-5 min-w-min rounded shadow-lg'>
        <h2 className='text-lg font-bold text-black mb-3 text-center'>
          Login Admin
        </h2>
        <form className='flex flex-col justify-center items-center gap-3'>
          <FormInput
            label='Username'
            type='text'
            placeholder='Enter username or email...'
            required
          />
          <FormInput
            label='Password'
            type='password'
            placeholder='Enter password'
            required
          />
          <button
            className='bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded text-white font-bold text-sm'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
