import React from 'react';

const withAuth = <T extends object>(Component: React.ComponentType<T>) => {
  const EnchantedComponent: React.FC<T> = (props) => {
    console.log('enchanted');

    return <Component {...props} />;
  };
  return EnchantedComponent;
};

export default withAuth;
