var tabs = require("sdk/tabs");
var url = require("sdk/url");

const DEV_DOMAINS = [
  'developer-local.allizom.org',
  'developer.allizom.org'
]
  

tabs.on("ready", init);

function init(tab) {
  var tabURL = url.URL(tab.url);
  
  if (DEV_DOMAINS.indexOf(tabURL.hostname) > -1) {
    tab.attach({
      contentScript: "if (document.body) document.body.style.border = '5px solid red';"
    });
  }
}
