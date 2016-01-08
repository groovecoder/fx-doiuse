var doiuse = require('doiuse');
var postcss = require('postcss');

// Style border green to verify content script is running
if (document.body) document.body.style.border = '5px solid green';

self.port.on("doiuseOutput", function (doiuseOutput) {
  // TODO: make the real UI for showing doiuseOutput on the page
  alert(doiuseOutput);
});

for (var i=0; i < document.styleSheets.length; i++) {
  var styleSheetHref = document.styleSheets[i].href;
  styleSheetXHR = new XMLHttpRequest();

  styleSheetXHR.onreadystatechange = function () {
    if (styleSheetXHR.readyState === XMLHttpRequest.DONE) {
      if (styleSheetXHR.status === 200) {
        var styleSheetContent = styleSheetXHR.responseText;
        if (styleSheetContent) {
          postcss([doiuse]).process(styleSheetContent).then(function(result) {
            alert(result);
          });
        }
      }
    }
  };

  styleSheetXHR.open('GET', styleSheetHref);
  styleSheetXHR.send();
}
