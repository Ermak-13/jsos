var React = require('react');

var SettingsDialog = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },

  handleClosingIcon: function () {
    this.setState({ open: false });
  },

  getModalDialogStyles: function () {
    if (this.state.open) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  },

  render: function () {
    return (
      <div className="modal-dialog" style={ this.getModalDialogStyles() }>
        <div className="widget modal-dialog-content">
          <div className="widget-header">
            { this.getClosingWidgetIconHTML() }

            <h4>{ this.props.header } - Settings</h4>
          </div>

          <div className="widget-body">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  },

  getClosingWidgetIconHTML: function () {
    return (
      <a className="icon" onClick={ this.handleClosingIcon }>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </a>
    );
  }
});

module.exports = SettingsDialog;
