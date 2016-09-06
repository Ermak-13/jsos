// NavHelper is react mixin. It contains useful methods for navigation tabs
//
// Methods:
// getNavHTML - return navigation header
// getContentHTML - return content
//
// Requirement [or you should implement]:
// getTabs - return dict of navigation tabs.
// { navText: '', content: '' }

var NavHelper = {
  handleNavTab: function (tab) {
    if (this._handleNavTab) return this._handleNavTab(tab);

    this.setState({ tab: tab });
  },

  getNavHTML: function () {
    if (this._getNavHTML) return this._getNavHTML();

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
    if (this._getContentHTML) return this._getContentHTML();

    return this.getTabs()[this.state.tab].content;
  },

  getNavTabClassName: function (tab) {
    if (this._getNavTabClassName) return this._getNavTabClassName(tab);

    if (this.isActive(tab)) {
      return global.Settings.get('nav_active_tab_class_name');
    } else {
      return global.Settings.get('nav_inactive_tab_class_name');
    }
  },

  isActive: function (tab) {
    if (this._isActive) return this._isActive(tab);

    return tab === this.state.tab;
  }
};

module.exports = NavHelper;
