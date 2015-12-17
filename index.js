const { emit } = require('sdk/event/core');
const { spawn } = require('sdk/system/child_process');
var Request = require('sdk/request').Request;
var tabs = require("sdk/tabs");
var url = require("sdk/url");

var DEV_DOMAINS = [
  'developer-local.allizom.org',
  'developer.allizom.org'
];
  

tabs.on("ready", init);

function init(tab) {
  var tabURL = url.URL(tab.url);
  
  if (DEV_DOMAINS.indexOf(tabURL.hostname) > -1) {
    var tabWorker = tab.attach({
      contentScriptFile: "./doiuse-script.js"
    });

    // Receive styleSheetContent messages from content script
    tabWorker.port.on("styleSheet", function(styleSheetHref) {
      var styleSheetRequest = Request({url: styleSheetHref});
      styleSheetRequest.on("complete", function(styleSheetResponse){
        var styleSheetContent = styleSheetResponse.text;
        var doiuseOutput = '';

        // Spawn the doiuse process
        var doiuse = spawn("/usr/local/bin/doiuse");

        // Attach stdout data handler to doiuse process
        doiuse.stdout.on('data', onStdoutData);
        doiuse.stderr.on('data', onStderrData);
        doiuse.on('exit', onExit);
        doiuse.on('error', onError);

        function onStdoutData (data) {
          doiuseOutput += data;
        }

        function onStderrData (data) {
          doiuseOutput += data;
        }

        function onError (error) {
          console.error(error);
        }

        emit(doiuse.stdin, 'data', styleSheetContent);
        emit(doiuse.stdin, 'end');

        function onExit (code, signal) {
          doiuse.stdout.off('data', onStdoutData);
          doiuse.stderr.off('data', onStderrData);
          doiuse.off('exit', onExit);
          tabWorker.port.emit("doiuseOutput", doiuseOutput);
        }
      });
      styleSheetRequest.get();
    });
  }
}
