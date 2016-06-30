var React = require('react'),
    Widget = require('../widget');

var DefaultBody = React.createClass({
  render: function () {
    return (
      <Widget.Body>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-md-10 col-md-offset-1">
            { this.props.children }
          </div>
        </div>
      </Widget.Body>
    );
  }
});

module.exports = DefaultBody;
