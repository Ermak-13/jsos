require('./globals');

var OS = {
  AppDispatcher: require('./os/app_dispatcher'),
  Events: require('./os/events'),
  settings: require('./os/settings'),

  Desktop: require('./os/components/desktop'),
  Widget: require('./os/components/widget'),
  Configurator: require('./os/components/configurator'),
  WidgetStylesForm: require('./os/components/widget_styles_form'),
  HForm: require('./os/components/hform'),
  Input: require('./os/components/input'),
  Submit: require('./os/components/submit'),

  Mixins: require('./os/mixins'),
  storage: require('./os/storage'),

  log: require('./os/actions/log'),
  request: require('./os/actions/request'),
  download: require('./os/actions/download')
};

global.OS = OS;
