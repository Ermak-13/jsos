var React = require('react');

var ConfigurationDialog = React.createClass({
  getInitialState: function () {
    return {
      open: true
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

            <h2>{ this.props.header } - Settings</h2>
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
        <i className="fa fa-close" aria-hidden="true"></i>
      </a>
    );
  }
});

module.exports = ConfigurationDialog;
