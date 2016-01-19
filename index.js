const { Class } = require('sdk/core/heritage');
const { MessageChannel } = require('sdk/messaging');
const { Panel } = require('dev/panel');
const { Tool } = require('dev/toolbox');

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
    this.postMessage(ss.storage.devDomains || '', [panelSide]);
  }
});

const DoiuseTool = new Tool({
  panels: { doiuse: DoiusePanel }
});

function init(tab) {
  var tabURL = url.URL(tab.url);
  var devDomains = [];

  if (ss.storage.hasOwnProperty('devDomains')) {
    devDomains = ss.storage.devDomains.split(',').map(function(strValue){return strValue.trim();});
  }
  if (devDomains.indexOf(tabURL.hostname) > -1) {
    var tabWorker = tab.attach({
      contentScriptFile: "./doiuse-script.js"
    });
  }
}

tabs.on("ready", init);
