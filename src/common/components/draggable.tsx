import React from 'react';
import { dragDropContext } from './drag-drop-context';

interface Props extends React.PropsWithChildren {
  draggableId: string;
  className: string;
}
type Space = {
  x: number;
  y: number;
}
const Draggable = (props: Props) => {
  // Ref
  const draggableRef = React.createRef<HTMLDivElement>();
  // Context
  const { style, setStyle } = React.useContext(dragDropContext);
  // States
  const [dragTargetId, setDragTargetId] = React.useState<string | null>(null);
  const [savedSpace, setSavedSpace] = React.useState<Space>({
    x: 0,
    y: 0,
  });

  // Handlers
  const handleHideDragImage = (event: DragEvent) => {
    const img = new Image();
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    if (event.dataTransfer) {
      event.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  const handleCalculate = (
    space: Space,
    mouseX: number,
    mouseY: number,
    targetX: number,
    targetY: number,
  ): string => {
    const { left: screenX, top: screenY } =
      document.body.getBoundingClientRect();
    const transformX = screenX + mouseX - space.x - targetX;
    const transformY = screenY + mouseY - space.y - targetY;
    return `translate(${transformX}px, ${transformY}px)`;
  };

  const handleDrag = React.useCallback(
    (e: DragEvent) => {
      // Calculate the transform
      const { clientX: mouseX, clientY: mouseY } = e;
      const target = e.currentTarget as HTMLDivElement;
      if (target) {
        // Arguments
        const targetX = +target.style.left.slice(0, -2);
        const targetY = +target.style.top.slice(0, -2);
        // Render result
        setStyle((prevStyle) => ({
          ...prevStyle,
          transform: handleCalculate(
            savedSpace,
            mouseX,
            mouseY,
            targetX,
            targetY,
          ),
        }));
      }
    },
    [savedSpace],
  );

  const handleDragStart = React.useCallback((e: DragEvent) => {
    handleHideDragImage(e);
    const { clientX: mouseX, clientY: mouseY } = e;
    const target = e.currentTarget as HTMLDivElement;
    if (target) {
      const { left: screenX, top: screenY } =
        document.body.getBoundingClientRect();
      const { left: targetX, top: targetY } = target.getBoundingClientRect();
      const space: Space = {
        x: screenX + mouseX - (screenX + targetX),
        y: screenY + mouseY - (screenY + targetY),
      };
      setDragTargetId(target.dataset.draggableId as string);
      setSavedSpace(space);
      setStyle((prevStyle) => ({
        ...prevStyle,
        position: 'fixed',
        top: targetY,
        left: targetX,
        width: target.offsetWidth,
        height: target.offsetHeight,
        transform: handleCalculate(space, mouseX, mouseY, targetX, targetY),
        margin: 0,
      }));
    }
  }, []);

  const handleDragEnd = React.useCallback(() => {
    setStyle(undefined);
    setDragTargetId(null);
  }, []);

  React.useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current?.addEventListener('drag', handleDrag);
      draggableRef.current?.addEventListener('dragstart', handleDragStart);
      draggableRef.current?.addEventListener('dragend', handleDragEnd);

      return () => {
        draggableRef.current?.removeEventListener('drag', handleDrag);
        draggableRef.current?.removeEventListener('dragstart', handleDragStart);
        draggableRef.current?.removeEventListener('dragend', handleDragEnd);
      };
    }
  }, [draggableRef]);

  return (
    <div
      data-draggable-id={props.draggableId}
      ref={draggableRef}
      className={props.className}
      draggable
      style={style && dragTargetId === props.draggableId ? style : undefined}
    >
      {props.children}
    </div>
  );
};

export default Draggable;