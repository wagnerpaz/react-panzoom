import { useCallback, useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export default (
  element: HTMLElement | null,
  containerSize: Size,
  elementSize: Size,
  startZoom: number
) => {
  console.log(containerSize, elementSize);
  const [scale, setScale] = useState(startZoom / 100);

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

  console.log(scale);
  return { scale };
};
