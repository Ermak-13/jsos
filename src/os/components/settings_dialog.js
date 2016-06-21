var React = require('react'),
    s = require('underscore.string'),

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events');

var SettingsDialog = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },

  handleClosingIcon: function () {
    this.close();
  },

  open: function () {
    this.setState({ open: true });
  },

  close: function () {
    this.setState({ open: false });
  },

  getModalDialogStyles: function () {
    if (this.state.open) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  },

  getHeader: function () {
    var header = this.props.header || s.capitalize(this.props.name);
    return s.sprintf('%s - Settings', header);
  },

  render: function () {
    return (
      <div className="modal-dialog" style={ this.getModalDialogStyles() }>
        <div className="widget modal-dialog-content">
          <div className="widget-header">
            <div className="icons-container">
              { this.getClosingWidgetIconHTML() }
            </div>

            <h4>{ this.getHeader() }</h4>
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
