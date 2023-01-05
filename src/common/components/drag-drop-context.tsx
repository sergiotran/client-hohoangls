import React from 'react';

type DragDropCtx = {
  style: React.CSSProperties | undefined;
  setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties | undefined>>;
};
export const dragDropContext = React.createContext<DragDropCtx>(null as unknown as DragDropCtx);
const { Provider } = dragDropContext;

const DragDropContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [style, setStyle] = React.useState<React.CSSProperties | undefined>(undefined);

  const value = {
    style,
    setStyle
  };

  return <Provider value={value}>{children}</Provider>;
};

export default DragDropContext;