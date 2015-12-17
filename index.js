var child_process = require("sdk/system/child_process");
var tabs = require("sdk/tabs");
var url = require("sdk/url");

const DEV_DOMAINS = [
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
      // Spawn the doiuse process
      var doiuse = child_process.spawn("doiuse");

      // Attach stdout data handler to doiuse process
      doiuse.stdout.on('data', function(data) {
        // TODO: show the doiuse output somehow - maybe throw it back to the content script?
        alert(data);
      });

      // Write the stylesheet content to the doiuse process
      doiuse.stdin.setEncoding('utf-8');
      doiuse.stdin.write(styleSheetContent);
    });
  }
}
