var React = require('react');

var SettingsDialog = require('./settings_dialog');
var Input = require('./input');
var Submit = require('./submit');

var DefaultSettingsDialog = React.createClass({
  render: function () {
    return (
      <SettingsDialog>
        <form className="form-horizontal">
          <div className="form-group">
            <Label text="width:" />

            <div className="col-md-8">
              <Input
                ref="width"
              />
            </div>
          </div>

          <div className="form-group">
            <Label text="height:" />

            <div className="col-md-8">
              <Input
                ref="height"
              />
            </div>
          </div>

          <div className="form-group">
            <Label text="top:" />

            <div className="col-md-8">
              <Input
                ref="top"
              />
            </div>
          </div>

          <div className="form-group">
            <Label text="left:" />

            <div className="col-md-8">
              <Input
                ref="left"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-8 col-md-offset-3">
              <Submit value="Сохранить" />
            </div>
          </div>
        </form>
      </SettingsDialog>
    );
  }
});

var Label = React.createClass({
  render: function () {
    return (
      <label className="control-label col-md-2 col-md-offset-1">
        { this.props.text }
      </label>
    );
  }
});

module.exports = DefaultSettingsDialog;
