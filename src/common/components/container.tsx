import React from 'react'

type Props = React.PropsWithChildren;
const Container: React.FC<Props> = ({ children }) => {
  return <div className='container p-5 rounded shadow-lg bg-white m-auto'>{children}</div>;
};

export default Container;