import { useEffect } from 'react';

interface Listeners {
  onDragStart: EventListenerOrEventListenerObject;
  onDrag: EventListenerOrEventListenerObject;
  onDragEnd: EventListenerOrEventListenerObject;
}

export default (
  element: HTMLElement | null,
  { onDragStart, onDrag, onDragEnd }: Listeners
) => {
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
};
