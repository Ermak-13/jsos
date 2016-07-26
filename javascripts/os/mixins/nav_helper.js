var NavHelper = {
  isActive: function (tab) {
    return tab === this.state.tab;
  },

  handleNavTab: function (tab) {
    this.setState({ tab: tab });
  },

  getNavTabClassName: function (tab) {
    if (this.isActive(tab)) {
      return global.Settings.get('nav_active_tab_class_name');
    } else {
      return global.Settings.get('nav_inactive_tab_class_name');
    }
  },

  getNavHTML: function () {
    var liHTML = _.map(this.getTabs(), function (options, tab) {
      return (
        <li key={ tab } className={ this.getNavTabClassName(tab) }>
          <a href="#" onClick={ this.handleNavTab.bind(this, tab) }>
            { options.navText }
          </a>
        </li>
      );
    }.bind(this));

    return (
      <ul className={ global.Settings.get('nav_class_name') }>
        { liHTML }
      </ul>
    );
  },

  getContentHTML: function () {
    return this.getTabs()[this.state.tab].content;
  }
};

module.exports = NavHelper;
