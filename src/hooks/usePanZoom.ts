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
  pan: Pan,
  zoom: number
) => {
  const coordsToTranslate = useCallback(
    (coords: Pan) => {
      const centerX = -elementSize.width / 2 + containerSize.width / 2;
      const centerY = -elementSize.height / 2 + containerSize.height / 2;
      const appliedCoordsX = centerX - coords.x;
      const appliedCoordsY = centerY - coords.y;
      return {
        x: Math.max(
          Math.min(appliedCoordsX, 0),
          -elementSize.width + containerSize.width
        ),
        y: Math.max(
          Math.min(appliedCoordsY, 0),
          -elementSize.height + containerSize.height
        )
      };
    },
    [containerSize, elementSize]
  );

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(zoom / 100);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setTranslate(coordsToTranslate(pan));
  }, [coordsToTranslate, pan]);

  console.log('translate', translate);

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

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setScale((scale) => Math.max(scale + e.deltaY * -0.001, 0.1));
  }, []);

  useEffect(() => {
    if (element) {
      element.addEventListener('wheel', onWheel);
      return () => {
        element.removeEventListener('wheel', onWheel);
      };
    }
    return () => null;
  }, [element, onWheel]);

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

  return { translate, scale };
};