import React, { useCallback, useEffect, useState } from 'react';
import usePan from './hooks/usePan';
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
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const [scale] = useState(startZoom / 100);

  const [containerSize] = useSizeObserver(container);
  const [elementSize] = useSizeObserver(element);

  const { translate } = usePan(element, containerSize, elementSize, startPan);

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
