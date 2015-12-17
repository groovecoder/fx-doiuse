// Style border green to verify content script is running
if (document.body) document.body.style.border = '5px solid green';

self.port.on("doiuseOutput", function (doiuseOutput) {
  // TODO: make the real UI for showing doiuseOutput on the page
  alert(doiuseOutput);
});

for (var i=0; i < document.styleSheets.length; i++) {
  var styleSheet = document.styleSheets[i];
  // TODO: get the real stylesheet content from styleSheet
  var styleSheetContent = ".disabled{cursor:not-allowed;}";

  // Send the stylesheet content to add-on script to call doiuse process
  self.port.emit("styleSheetContent", styleSheetContent);
}
