const fs = require('fs');
const path = require('path');
const isLoading = false;

onload = function() {
  const webview = document.querySelector('webview');
  const css = fs.readFileSync(path.join(__dirname, 'assets/overwrite.css'));

  document.querySelector('#back').onclick = function() {
    webview.goBack();
  };

  document.querySelector('#forward').onclick = function() {
    webview.goForward();
  };

  document.querySelector('#home').onclick = function() {
    webview.src = 'https://app.smartsheet.com/';
  };

  document.querySelector('#refresh').onclick = function() {
    webview.reload();
  };

  webview.addEventListener("dom-ready", function() {
    webview.insertCSS(css.toString());
  });
};
