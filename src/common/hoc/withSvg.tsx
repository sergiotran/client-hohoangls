import React from 'react';

type Props = {
  width?: number;
  height?: number;
};
const withSvg = <T extends object>(Component: React.ComponentType<T & Props>) => {
  const EnchantedSvgImage = (props: T & Props) => {
    const {width, height} = props;

    return <Component {...props} width={width} height={height} />;
  };
  return EnchantedSvgImage;
};

export default withSvg;