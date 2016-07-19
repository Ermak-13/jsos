var isUrl = require('./is_url');

var parseUrl = function (url) {
  if (!isUrl(url)) {
    return;
  }

  var link = document.createElement('a');
  link.href = url;

  return link;
};

module.exports = parseUrl;
