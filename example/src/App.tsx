import React from 'react';

import Panzoom from '@metapriori/react-panzoom';

const App = () => {
  return (
      <Panzoom style={{width: 500, height: 500}} startPan={{x: -1920 / 2 + 500 / 2, y: -1491 / 2 + 500 / 2}}>
        <img alt="test" src="http://www.metapriori.com.br/wp-content/uploads/2018/10/animal-big-big-cat-247502.jpg"/>
      </Panzoom>
  );
};

export default App;
