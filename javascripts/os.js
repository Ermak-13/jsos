var OS = {
  AppDispatcher: require('./os/app_dispatcher'),
  Events: require('./os/events'),
  settings: require('./os/settings'),

  Widget: require('./os/components/widget'),
  Configurator: require('./os/components/configurator'),
  WidgetStylesForm: require('./os/components/widget_styles_form'),

  Link: require('./os/components/link'),
  HForm: require('./os/components/hform'),
  Input: require('./os/components/input'),
  Textarea: require('./os/components/textarea'),
  Submit: require('./os/components/submit'),

  Mixins: require('./os/mixins'),
  storage: require('./os/storage'),

  log: require('./os/actions/log'),
  request: require('./os/actions/request'),
  download: require('./os/actions/download'),
  addWidget: require('./os/actions/add_widget'),
  removeWidget: require('./os/actions/remove_widget')
};
