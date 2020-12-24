import React, { useCallback, useEffect, useState } from 'react';
import usePan from './hooks/usePan';
import useSizeObserver from './hooks/useSizeObserver';
import useZoom from './hooks/useZoom';

interface Props {
  style?: React.CSSProperties;
  children: React.ReactElement;
  zoom?: number;
  pan?: Pan;
}

interface Pan {
  x: number;
  y: number;
}

const Panzoom = ({
  children,
  style,
  zoom = 100,
  pan = { x: 0, y: 0 }
}: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const [containerSize] = useSizeObserver(container);
  const [elementSize] = useSizeObserver(element);

  const { translate } = usePan(element, containerSize, elementSize, pan);
  const { scale } = useZoom(element, containerSize, elementSize, zoom);

  useEffect(() => {
    if (element) {
      element.draggable = false;
    }
  }, [element]);

  const setContainerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  const setChildRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  return (
    <div ref={setContainerRef} style={{ ...style, overflow: 'hidden' }}>
      <div
        style={{
          cursor: 'grab',
          transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
          ...style
        }}
      >
        {React.cloneElement(React.Children.only(children), {
          ref: setChildRef
        })}
      </div>
    </div>
  );
};

export default Panzoom;
