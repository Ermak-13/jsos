var sprintf = require('sprintf-js').sprintf,
    settings = require('./settings');

var disabled = false;

var carousel =  function ($carousel, type) {
  var $prevArrow = $carousel.find('.prev-shortcuts-arrow'),
      $nextArrow = $carousel.find('.next-shortcuts-arrow'),
      $wrapper = $carousel.find('.shortcuts-container-wrapper'),
      $container = $carousel.find('.shortcuts-container');

  var prevArrowHandler = function () {
    if (disabled) return ;
    disabled = true;

    var handlers = {
      'vertical': vPrevArrowHandler,
      'horizontal': hPrevArrowHandler
    };
    handlers[type]($wrapper, $container, $prevArrow, $nextArrow);
  };

  var nextArrowHandler = function () {
    if (disabled) return ;
    disabled = true;

    var handlers = {
      'vertical': vNextArrowHandler,
      'horizontal': hNextArrowHandler
    };
    handlers[type]($wrapper, $container, $prevArrow, $nextArrow);
  };

  var initContainer = function () {
    var inits = {
      'vertical': vInitContainer,
      'horizontal': hInitContainer
    };
    inits[type]($container);
  };

  initContainer();

  $prevArrow.off('click');
  $prevArrow.on('click', prevArrowHandler);

  $nextArrow.off('click');
  $nextArrow.on('click', nextArrowHandler);
};


var vInitContainer = function ($container) {
      initContainer($container, 'height', { 'width': '100%' });
    },

    vPrevArrowHandler = function ($wrapper, $container, $prevArrow, $nextArrow) {
      var distance = (
        css($container, 'height') + css($container, 'margin-top') +
        css($nextArrow, 'height') - css($wrapper, 'height')
      );

      if (distance > 0) {
        vAnimate($container, distance, -1);
      } else {
        disabled = false;
      }
    },

    vNextArrowHandler = function ($wrapper, $container, $prevArrow, $nextArrow) {
      var distance = css($prevArrow, 'height') - css($container, 'margin-top');

      if (distance > 0) {
        vAnimate($container, distance, 1);
      } else {
        disabled = false;
      }
    },

    hInitContainer = function ($container) {
      initContainer($container, 'width', { 'height': '100%' });
    },

    hPrevArrowHandler = function ($wrapper, $container, $prevArrow, $nextArrow) {
      var distance = (
        css($container, 'width') + css($container, 'margin-left') +
        css($nextArrow, 'width') - css($wrapper, 'width')
      );

      if (distance > 0) {
        hAnimate($container, distance, -1);
      }
    },

    hNextArrowHandler = function ($wrapper, $container, $prevArrow, $nextArrow) {
      var distance = css($prevArrow, 'width') - css($container, 'margin-left');

      if (distance > 0) {
        hAnimate($container, distance, 1);
      }
    },

    initContainer = function ($container, propName, cssProps) {
      var $shortcut = $container.find('.shortcut'),
          propValue = _.reduce($shortcut, function (memo, el) {
            var $el = $(el);
            return memo + css($el, propName);
          }, 0);

      cssProps[propName] = propValue;
      $container.css(cssProps);
    },

    vAnimate = function ($container, distance, direction) {
      animate($container, {
        'margin-top': prepareDistance(distance, direction)
      });
    },

    hAnimate = function ($container, distance, direction) {
      animate($container, {
        'margin-left': prepareDistance(distance, direction)
      });
    },

    animate = function ($container, animateProps) {
      $container.animate(
        animateProps,
        settings.SHORTCUTS_ARROW_ANIMATE_DURATION,
        function () { disabled = false; }
      );
    },

    prepareDistance = function (distance, direction) {
      distance = _.min([distance, settings.SHORTCUTS_CONTAINER_MOVING_DISTANCE]);

      distance = distance * (direction || 1);
      return sprintf('+=%s', distance);
    },

    css = function ($obj, prop) {
      return convertPX($obj.css(prop));
    },

    convertPX = function (px) {
      return parseInt(px, 10);
    };

module.exports = carousel;
