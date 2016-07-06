var settings = require('../settings');

var NavHelper = {
  isActive: function (tab) {
    return tab === this.state.tab;
  },

  handleNavTab: function (tab) {
    this.setState({ tab: tab });
  },

  getNavTabClassName: function (tab) {
    if (this.isActive(tab)) {
      return settings.NAV_ACTIVE_TAB_CLASS_NAME;
    } else {
      return settings.NAV_INACTIVE_TAB_CLASS_NAME;
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
      <ul className={ settings.NAV_CLASS_NAME }>
        { liHTML }
      </ul>
    );
  },

  getContentHTML: function () {
    return this.getTabs()[this.state.tab].content;
  }
};

module.exports = NavHelper;
