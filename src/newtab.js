var React = require('react'),
    ReactDOM = require('react-dom'),

    OS = require('os');
    require('./components/widgets/clock');

ReactDOM.render(
  <OS.Desktop />,
  document.getElementById('desktop-container')
);
