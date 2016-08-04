var _ = require('underscore');

var PositionHelper = {
  move: function (delta) {
    this.setState({
      position: this.getPositionByDelta(delta)
    });
  },

  handleStartMoving: function (e) {
    e.preventDefault();

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY
    });

    document.addEventListener('mouseup', this.handleStopMoving);
    document.addEventListener('mousemove', this.handleMoving);
  },

  handleMoving: function (e) {
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
    this.setState({
      startMovingX: null,
      startMovingY: null
    }, this.saveSettings);

    document.removeEventListener('mousemove', this.handleMoving);
    document.removeEventListener('mouseup', this.handleStopMoving);
  },

  getPositionByDelta: function (delta) {
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
