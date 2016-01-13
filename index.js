const { Class } = require('sdk/core/heritage');
const { MessageChannel } = require('sdk/messaging');
const { Panel } = require('dev/panel');
const { Tool } = require('dev/toolbox');

const self = require('sdk/self');
const ss = require('sdk/simple-storage');
const tabs = require("sdk/tabs");
const url = require("sdk/url");

// DevTools
const { Cu } = require("chrome");
const { gDevTools } = Cu.import("resource:///modules/devtools/gDevTools.jsm", {});

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

gDevTools.on("toolbox-ready", onToolboxReady);

/**
 * Toolbox Ready
 */
function onToolboxReady(eventId, toolbox) {
  toolbox.getPanelWhenReady("styleeditor").then(panel => {
    for (let editor of panel.UI.editors) {
      editor.on("source-editor-load", () => {
        editor.getSourceEditor().then( () => {
          alert("editor.sourceEditor.getText(): " + editor.sourceEditor.getText());
        })
      });
    }
  });
}
