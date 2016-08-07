var _ = require('underscore');

var PositionHelper = {
  move: function (delta) {
    if (this._move) return this._move(delta);

    this.setState({
      position: this.getPositionByDelta(delta)
    });
  },

  handleStartMoving: function (e) {
    if (this._handleStartMoving) return this._handleStartMoving(e);

    e.preventDefault();

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY
    });

    document.addEventListener('mousemove', this.handleMoving);
    document.addEventListener('mouseup', this.handleStopMoving);
  },

  handleMoving: function (e) {
    if (this._handleMoving) return this._handleMoving(e);

    var startMovingX = this.state.startMovingX,
        startMovingY = this.state.startMovingY;

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY,
      position: this.getPositionByDelta({
        x: (e.pageX - startMovingX),
        y: (e.pageY - startMovingY)
      })
    });
  },

  handleStopMoving: function (e) {
    if (this._handleStopMoving) return this._handleStopMoving(e);

    this.setState({
      startMovingX: null,
      startMovingY: null
    }, this.saveSettings);

    document.removeEventListener('mousemove', this.handleMoving);
    document.removeEventListener('mouseup', this.handleStopMoving);
  },

  getPositionByDelta: function (delta) {
    if (this._getPositionByDelta) return this._getPositionByDelta(delta);

    var position = _.clone(this.state.position),
        xSide = position.xSide,
        ySide = position.ySide,

        xSideValue = parseInt(position[xSide].split('px')[0]),
        ySideValue = parseInt(position[ySide].split('px')[0]),

        deltaX = (xSide === 'left') ? delta.x : -1 * delta.x,
        deltaY = (ySide === 'top') ? delta.y : -1 * delta.y;

    position[xSide] = xSideValue + deltaX + 'px';
    position[ySide] = ySideValue + deltaY + 'px';

    return position;
  }
};

module.exports = PositionHelper;
