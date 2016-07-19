var isUrl = function (url) {
  var urlTester = /^(http|https):\/\/\S+\.\S+/i;
  return urlTester.test(url);
};

module.exports = isUrl;
