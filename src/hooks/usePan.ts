import { useCallback, useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Pan {
  x: number;
  y: number;
}

export default (
  element: HTMLElement | null,
  containerSize: Size,
  elementSize: Size,
  startPan: Pan
) => {
  const [translate, setTranslate] = useState(startPan);
  const [dragging, setDragging] = useState(false);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        setTranslate((t) => {
          const newX = t.x + e.movementX;
          const newY = t.y + e.movementY;

          return {
            x:
              newX < 0 && newX > -elementSize.width + containerSize.width
                ? newX
                : t.x,
            y:
              newY < 0 && newY > -elementSize.height + containerSize.height
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
    if (element) {
      element.addEventListener('mousedown', onDragStart);

      return () => {
        element.removeEventListener('mousedown', onDragStart);
      };
    }
    return () => null;
  }, [element]);

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

  return { translate };
};
