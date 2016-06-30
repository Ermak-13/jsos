var React = require('react'),
    ReactDOM = require('react-dom'),

    OS = require('os'),
    Widgets = require('./widgets');

ReactDOM.render(
  <OS.Desktop />,
  document.getElementById('desktop-container')
);
