const { Class } = require('sdk/core/heritage');
const { MessageChannel } = require('sdk/messaging');
const { Panel } = require('dev/panel');
const { Request } = require('sdk/request');
const { Tool } = require('dev/toolbox');
const { emit } = require('sdk/event/core');
const { spawn } = require('sdk/system/child_process');

const self = require('sdk/self');
const ss = require('sdk/simple-storage');
const tabs = require("sdk/tabs");
const url = require("sdk/url");


// Create a message channel port for communicating with dev panel
const channel = new MessageChannel();
const addonSide = channel.port1;
const panelSide = channel.port2;

// When the panel sends its event ...
addonSide.onmessage = function(event) {
  // save the data to simple storage
  ss.storage.devDomains = event.data;
};

const DoiusePanel = Class({
  extends: Panel,
  label: "doiuse",
  tooltip: "Configure doiuse",
  icon: self.data.url('icon-64.png'),
  url: self.data.url('doiuse_panel.html'),
  onReady: function() {
    // Send dev domains and port to panel
    this.postMessage(ss.storage.devDomains, [panelSide]);
  }
});

const DoiuseTool = new Tool({
  panels: { doiuse: DoiusePanel }
});

function init(tab) {
  var tabURL = url.URL(tab.url);

  var devDomains = ss.storage.devDomains.split(',').map(function(strValue){return strValue.trim();});
  if (devDomains.indexOf(tabURL.hostname) > -1) {
    var tabWorker = tab.attach({
      contentScriptFile: "./doiuse-script.js"
    });

    // Receive styleSheet messages from content script
    tabWorker.port.on("styleSheet", function(styleSheetHref) {

      // GET the contents of the stylesheet
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

        // Pipe the stylesheet content to doiuse process stdin
        emit(doiuse.stdin, 'data', styleSheetContent);
        emit(doiuse.stdin, 'end');

        // When the process exits, remove handlers
        // and send output back to content script
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

tabs.on("ready", init);
