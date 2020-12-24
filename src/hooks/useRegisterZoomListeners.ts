import { useEffect } from 'react';

interface Listeners {
  onWheel: EventListenerOrEventListenerObject;
}

export default (element: HTMLElement | null, { onWheel }: Listeners) => {
  useEffect(() => {
    if (element) {
      element.addEventListener('wheel', onWheel);
      return () => {
        element.removeEventListener('wheel', onWheel);
      };
    }
    return () => null;
  }, [element, onWheel]);
};
