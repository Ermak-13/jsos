require('./globals');

var loader = new OS.Loader();
loader.load(function () {
  ReactDOM.render(
    <Desktop />,
    document.getElementById('desktop-container')
  );
});
