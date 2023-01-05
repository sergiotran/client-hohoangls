import React from 'react';

type Props = {
  droppableId: string;
  className: string;
} & React.PropsWithChildren;

const Droppable: React.FC<Props> = ({ droppableId ,children, className }) => {
  const droppableRef = React.createRef<HTMLDivElement>();

  return <div ref={droppableRef} data-droppable-id={droppableId} className={className}>{children}</div>;
};

export default Droppable;