import React, { useState } from 'react';

import Panzoom from '@metapriori/react-panzoom';

const App = () => {
  const [zoom, setZoom] = useState(100);
  return (
    <>
      <Panzoom style={{width: 500, height: 500}} pan={{x: 0, y: 0}} zoom={zoom}>
        <img alt="test" src="http://www.metapriori.com.br/wp-content/uploads/2018/10/animal-big-big-cat-247502.jpg"/>
      </Panzoom>
      <button onClick={() => setZoom(zoom => zoom + 10)}>Increase zoom</button>
      <button onClick={() => setZoom(zoom => zoom - 10)}>Decrease zoom</button>
      <span>{zoom}%</span>
    </> 
  );
};

export default App;
