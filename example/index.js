import React from 'react';
import ReactDOM from 'react-dom';

const {Navigation} = require("../index").default

const render = () => {
  ReactDOM.render(
      <Navigation/>,
    document.getElementById('root')
  );
};

render();

