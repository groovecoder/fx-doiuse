var domainsTextArea = document.querySelector('#domains');
var toAddon, devDomains;

window.addEventListener('message', function(event) {
  // Get the port for communicating with add-on script
  toAddon = event.ports[0];

  // Set the domains textarea value to data from add-on script's simple storage
  devDomains = event.data;
  domainsTextArea.value = localStorage.getItem('devDomains');
});

document.querySelector('#submit').addEventListener('click', function() {
  // Send the domains textarea value to add-on script for storing into simple storage
  toAddon.postMessage(domainsTextArea.value);
});
