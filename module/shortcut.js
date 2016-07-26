var Link = OS.Link;

var Shortcut = React.createClass({
  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.props.onClick }>

        <span className="fa fa-spinner" />
      </Link>
    );
  }
});

module.exports = Shortcut;
