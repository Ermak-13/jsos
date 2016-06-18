var React = require('react');
var ReactDOM = require('react-dom');

var Widget = require('./widget');

ReactDOM.render(
  <Widget
    header="Welcome Widget"
  />,
  document.getElementById('react-container')
);
