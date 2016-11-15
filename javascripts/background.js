var _ = require('underscore');

chrome.alarms.onAlarm.addListener(function (alarm) {
  var alarmTypes = {
    simple: {
      prefix: [
        'jsos-default',
        'jsos-simple'
      ],
      handler: function (alarm) {
        alert('Аааа... Будильник сработал!');
      }
    }
  };

  var key = _.findKey(alarmTypes, function (type) {
    return _.contains(type.prefix, alarm.name);
  });
  alarmTypes[key].handler(alarm);
});
