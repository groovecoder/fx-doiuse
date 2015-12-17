const { emit } = require('sdk/event/core');
const { spawn } = require('sdk/system/child_process');
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
    tabWorker.port.on("styleSheetContent", function(styleSheetContent) {
      var doiuseOutput = '';
      // Spawn the doiuse process
      var doiuse = spawn("/usr/local/bin/doiuse");

      // Attach stdout data handler to doiuse process
      doiuse.stdout.on('data', onData);
      doiuse.on('close', onClose);

      function onData (data) {
        doiuseOutput += data;
      }

      function onClose (code, signal) {
        doiuse.stdout.off('data', onData);
        doiuse.off('close', onClose);
        console.log(doiuseOutput);
      }

      emit(doiuse.stdin, 'data', styleSheetContent);
      emit(doiuse.stdin, 'end');

    });
  }
}
