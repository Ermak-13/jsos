var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var Container = React.createClass({
  handleClickRemoveBtn: function (element) {
    this.props.onClickRemoveBtn(element);
  },

  render: function () {
    return (
      <table
        className="table table-hover"
        style={{ marginBottom: 0, marginTop: '10px' }}>

        <tbody>
          { this.getCollectionTrHTML() }
        </tbody>
      </table>
    );
  },

  getCollectionTrHTML: function () {
    var collectionTrHTML = _.map(this.props.collection, function (element, i) {
      return (
        <tr key={ i }>
          <td>
            <Link
              href={ element.url }>
              { element.url }
            </Link>
          </td>
          <td>
            <Link
              className="btn btn-danger btn-xs pull-right"
              onClick={ this.handleClickRemoveBtn.bind(this, element) }>
              <span className="fa fa-remove" />
            </Link>
          </td>
        </tr>
      );
    }.bind(this));

    return collectionTrHTML;
  }
});

module.exports = Container;
