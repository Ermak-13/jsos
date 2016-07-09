var OS = {
  AppDispatcher: require('./os/app_dispatcher'),
  Events: require('./os/events'),
  settings: require('./os/settings'),
  Logger: require('./os/logger'),
  storage: require('./os/storage'),

  Mixins: require('./os/mixins'),
  Widget: require('./os/components/widget'),
  Dialog: require('./os/components/dialog'),
  Configurator: require('./os/components/configurator'),
  WidgetStylesForm: require('./os/components/widget_styles_form'),

  Link: require('./os/components/link'),
  HForm: require('./os/components/hform'),
  Input: require('./os/components/input'),
  Select: require('./os/components/select'),
  Option: require('./os/components/option'),
  Textarea: require('./os/components/textarea'),
  Submit: require('./os/components/submit'),

  log: require('./os/actions/log'),
  request: require('./os/actions/request'),
  download: require('./os/actions/download'),
  addWidget: require('./os/actions/add_widget'),
  removeWidget: require('./os/actions/remove_widget'),
  saveDesktop: require('./os/actions/save_desktop')
};
