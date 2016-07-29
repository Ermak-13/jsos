var settings = require('./settings'),

    convertPX = function (px) {
      return parseInt(px, 10);
    };

var initCarousel =  function ($panel, type) {
  $prevArrow = $panel.find('.prev-shortcuts-arrow'),
  $nextArrow = $panel.find('.next-shortcuts-arrow'),
  $wrapper = $panel.find('.shortcuts-container-wrapper'),
  $container = $panel.find('.shortcuts-container'),

  vInitContainer = function () {
    var $shortcut = $container.find('.shortcut');
    $container.css({
      'height': $shortcut.length * convertPX($shortcut.css('height')),
      'width': '100%'
    });
  },
  vPrevArrowHandler = function () {
    var distance = (
      convertPX($container.css('height')) + convertPX($container.css('margin-top')) +
      convertPX($nextArrow.css('height')) -  convertPX($wrapper.css('height'))
    );

    if (distance > 0) {
      distance = _.min([distance, settings.SHORTCUTS_CONTAINER_MOVING_DISTANCE]);

      $container.animate({
        'margin-top': '-=' + distance
      }, settings.SHORTCUTS_ARROW_ANIMATE_DURATION);
    }
  },
  vNextArrowHandler = function () {
    var distance = (
      convertPX($prevArrow.css('height')) - convertPX($container.css('margin-top'))
    );

    if (distance > 0) {
      distance = _.min([distance, settings.SHORTCUTS_CONTAINER_MOVING_DISTANCE]);

      $container.animate({
        'margin-top': '+=' + distance
      }, settings.SHORTCUTS_ARROW_ANIMATE_DURATION);
    }
  },

  hInitContainer = function () {
    var $shortcut = $container.find('.shortcut');
    $container.css({
      'height': '100%',
      'width': $shortcut.length * convertPX($shortcut.css('width'))
    });
  },
  hPrevArrowHandler = function () {
    var distance = (
      convertPX($container.css('width')) + convertPX($container.css('margin-left')) +
      convertPX($nextArrow.css('width')) - convertPX($wrapper.css('width'))
    );

    if (distance > 0) {
      distance = _.min([distance, settings.SHORTCUTS_ARROW_ANIMATE_DURATION]);

      $container.animate({
        'margin-left': '-=' + distance,
      }, settings.SHORTCUTS_ARROW_ANIMATE_DURATION);
    }
  },
  hNextArrowHandler = function () {
    var distance = (
      convertPX($prevArrow.css('width')) - convertPX($container.css('margin-left'))
    );

    if (distance > 0) {
      distance = _.min([distance, settings.SHORTCUTS_CONTAINER_MOVING_DISTANCE]);

      $container.animate({
        'margin-left': '+=' + distance
      }, settings.SHORTCUTS_ARROW_ANIMATE_DURATION);
    }
  };

  var prevArrowHandler = {
    'left-vertical': vPrevArrowHandler,
    'right-vertical': vPrevArrowHandler,
    'top-horizontal': hPrevArrowHandler,
    'bottom-horizontal': hPrevArrowHandler
  }[type];

  var nextArrowHandler = {
    'left-vertical': vNextArrowHandler,
    'right-vertical': vNextArrowHandler,
    'top-horizontal': hNextArrowHandler,
    'bottom-horizontal': hNextArrowHandler
  }[type];

  var initContainer = {
    'left-vertical': vInitContainer,
    'right-vertical': vInitContainer,
    'top-horizontal': hInitContainer,
    'bottom-horizontal': hInitContainer
  }[type];

  initContainer();

  $prevArrow.off('click');
  $prevArrow.on('click', prevArrowHandler);

  $nextArrow.off('click');
  $nextArrow.on('click', nextArrowHandler);
};

module.exports = initCarousel;
