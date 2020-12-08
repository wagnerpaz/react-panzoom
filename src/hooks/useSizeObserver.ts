import { useEffect, useState } from 'react';
import { ResizeObserver } from 'resize-observer';

export default (element?: HTMLElement | null) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (element) {
      const observer = new ResizeObserver((entries) => {
        setSize({
          width: (entries[0].target as HTMLElement).offsetWidth,
          height: (entries[0].target as HTMLElement).offsetHeight
        });
      });

      observer.observe(element);

      return () => observer.disconnect();
    }
    return () => null;
  }, [element]);

  return [size];
};
