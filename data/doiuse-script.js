// Style border green to verify content script is running
if (document.body) document.body.style.border = '5px solid green';

self.port.on("doiuseOutput", function (doiuseOutput) {
  // TODO: make the real UI for showing doiuseOutput on the page
  alert(doiuseOutput);
});

for (var i=0; i < document.styleSheets.length; i++) {
  var styleSheet = document.styleSheets[i];
  if (styleSheet.href) {
    styleSheetXHR = new XMLHttpRequest();

    styleSheetXHR.onreadystatechange = function () {
      if (styleSheetXHR.readyState === XMLHttpRequest.DONE) {
        if (styleSheetXHR.status === 200) {
          var styleSheetContent = styleSheetXHR.responseText;
          var doiuseURL = 'http://127.0.0.1:3000';
          var doiuseXHR = new XMLHttpRequest();
          doiuseXHR.open('POST', doiuseURL);

          doiuseXHR.onreadystatechange = function () {
            if (doiuseXHR.readyState === XMLHttpRequest.DONE) {
              if (doiuseXHR.status === 200) {
                var doiuseOutput = doiuseXHR.responseText;
                console.log(doiuseOutput);
              }
            }
          };

          if (styleSheetContent) {
            doiuseXHR.send('{"css":' + JSON.stringify(styleSheetContent) + '}');
          }
        }
      }
    };

    // Don't try to GET <style> stylesheets
    styleSheetXHR.open('GET', styleSheet.href);
    styleSheetXHR.send();
  }
}
