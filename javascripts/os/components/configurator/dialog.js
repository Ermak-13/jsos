var React = require('react');

var Dialog = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
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

  render: function () {
    return (
      <div className="modal-dialog" style={ this.getModalDialogStyles() }>
        <div className="widget content">
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = Dialog;
