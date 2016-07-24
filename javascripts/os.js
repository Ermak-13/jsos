var OS = {
  Loader: require('./os/loader'),
  AppDispatcher: require('./os/app_dispatcher'),
  Events: require('./os/events'),
  settings: require('./os/settings'),
  Logger: require('./os/logger'),
  storage: require('./os/storage'),
  widgets: require('./os/widgets'),

  Mixins: require('./os/mixins'),
  Widget: require('./os/components/widget'),
  Dialog: require('./os/components/dialog'),
  Configurator: require('./os/components/configurator'),
  PositionAndSizeForm: require('./os/components/position_and_size_form'),

  Link: require('./os/components/link'),
  HForm: require('./os/components/hform'),
  IForm: require('./os/components/iform'),
  Input: require('./os/components/input'),
  Select: require('./os/components/select'),
  Option: require('./os/components/option'),
  Textarea: require('./os/components/textarea'),
  ColorInput: require('./os/components/color_input'),
  Submit: require('./os/components/submit'),

  reload: require('./os/actions/reload'),
  log: require('./os/actions/log'),
  request: require('./os/actions/request'),
  download: require('./os/actions/download'),

  Scripts: require('./os/scripts'),
  Modules: require('./os/modules'),

  installScript: require('./os/actions/install_script'),
  uninstallScript: require('./os/actions/uninstall_script'),

  installModule: require('./os/actions/install_module'),

  addWidget: require('./os/actions/add_widget'),
  removeWidget: require('./os/actions/remove_widget'),
  saveDesktop: require('./os/actions/save_desktop'),

  isURL: require('./os/actions/is_url'),
  isUrl: require('./os/actions/is_url'),
  parseURL: require('./os/actions/parse_url'),
  parseUrl: require('./os/actions/parse_url')
};
