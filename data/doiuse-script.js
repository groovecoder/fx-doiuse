const DOIUSE_URL = 'https://moz-doiuse.herokuapp.com';

// Style border green to verify content script is running
if (document.body) document.body.style.border = '5px solid green';

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Example_using_new_XMLHttpRequest%28%29
function $http(url){
  var core = {
    ajax: function (method, url, data) {
      var promise = new Promise(function (resolve, reject) {
        xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(data);
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        xhr.onerror = function () {
          reject(this.statusText);
        };
      });
      return promise;
    }
  };

  return {
    'get': function() {
      return core.ajax('GET', url);
    },
    'post': function(data) {
      return core.ajax('POST', url, data);
    }
  };
}

function postToDoiuse (css) {
  var styleSheetContent = css;
  $http(DOIUSE_URL).post('{"css":' + JSON.stringify(styleSheetContent) + '}').then(function (response) {
    alert(response);
  });
}

for (var i=0; i < document.styleSheets.length; i++) {
  var styleSheet = document.styleSheets[i];
  if (styleSheet.href) {
    $http(styleSheet.href).get().then(postToDoiuse);
  }
}
