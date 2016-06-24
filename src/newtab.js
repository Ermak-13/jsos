var React = require('react'),
    ReactDOM = require('react-dom'),

    OS = require('os'),
    Desktop = OS.Desktop,
    Clock = require('./components/widgets/clock'),
    Calendar = require('./components/widgets/calendar');

var modules = [
  Clock,
  Calendar
];

ReactDOM.render(
  <Desktop modules={ modules } />,
  document.getElementById('desktop-container')
);
