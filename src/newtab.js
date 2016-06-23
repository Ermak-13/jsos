var React = require('react'),
    ReactDOM = require('react-dom'),
    Clock = require('./components/widgets/clock'),
    Calendar = require('./components/widgets/calendar');

ReactDOM.render(
  <Calendar.Widget/>,
  document.getElementById('widgets-container')
);

ReactDOM.render(
  <Clock.SettingsDialog />,
  document.getElementById('configuration-dialogs-container')
);
