var parseUrl = function (url) {
  var urlTester = /^(http|https):\/\/\S+\.\S+/i;
  if (!urlTester.test(url)) {
    return;
  }

  var link = document.createElement('a');
  link.href = url;

  return link;
};

module.exports = parseUrl;
