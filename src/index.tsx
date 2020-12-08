import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSizeObserver from './hooks/useSizeObserver';

interface Props {
  style?: React.CSSProperties;
  children: React.ReactElement;
  startZoom?: number;
  startPan?: Pan;
}

interface Pan {
  x: number;
  y: number;
}

const Panzoom = ({
  children,
  style,
  startZoom = 100,
  startPan = { x: 0, y: 0 }
}: Props) => {
  const containerRef = useRef(null);
  const childRef: React.RefObject<HTMLElement> = useRef(null);
  const childElement = React.Children.only(children);

  const [scale] = useState(startZoom / 100);
  const [translate, setTranslate] = useState(startPan);
  const [dragging, setDragging] = useState(false);

  const [containerSize] = useSizeObserver(containerRef.current);
  const [childSize] = useSizeObserver(childRef.current);

  const onDragStart = () => {
    setDragging(true);
  };
  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        setTranslate((t) => {
          const newX = t.x + e.movementX;
          const newY = t.y + e.movementY;

          return {
            x:
              newX < 0 && newX > -childSize.width + containerSize.width
                ? newX
                : t.x,
            y:
              newY < 0 && newY > -childSize.height + containerSize.height
                ? newY
                : t.y
          };
        });
      }
    },
    [dragging]
  );
  const onDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onDrag);

    return () => {
      document.removeEventListener('mousemove', onDrag);
    };
  }, [onDrag]);

  useEffect(() => {
    document.addEventListener('mouseup', onDragEnd);

    return () => {
      document.removeEventListener('mouseup', onDragEnd);
    };
  }, [onDragEnd]);

  useEffect(() => {
    if (childRef.current) {
      childRef.current.draggable = false;
    }
  }, []);

  return (
    <div ref={containerRef} style={{ ...style, overflow: 'hidden' }}>
      <div
        style={{
          cursor: 'grab',
          transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
          ...style
        }}
        onMouseDown={onDragStart}
      >
        {React.cloneElement(childElement, { ref: childRef })}
      </div>
    </div>
  );
};

export default Panzoom;
