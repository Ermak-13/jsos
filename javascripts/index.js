require('./globals');

new OS.Logger();
new OS.Installer();

ReactDOM.render(
  <Desktop />,
  document.getElementById('desktop-container')
);
