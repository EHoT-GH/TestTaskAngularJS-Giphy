function localStorageService($localStorage) {
  var local = this;

  local.init = init;

  function init() {
    if ($localStorage.userInfo && typeof $localStorage.userInfo !== 'undefined') {
      local.loginState = true;
      local.user = JSON.parse($localStorage.userInfo);
    } else {
      local.loginState = false;
    }

    if (typeof $localStorage.IDstorage !== 'undefined') {
      local.IDstorage = JSON.parse($localStorage.IDstorage);
    } else {
      local.IDstorage = [];
    }
  }

  local.addToLs = function(id) {
    local.IDstorage.push(id);
    $localStorage.IDstorage = JSON.stringify(local.IDstorage);
  };

  local.removeFromLs = function(id) {
    for (var i = 0; i < local.IDstorage.length; i++) {
      if (local.IDstorage[i] === id) {
        local.IDstorage.splice(i, 1);
        $localStorage.IDstorage = JSON.stringify(local.IDstorage);
      }
    }
  };

  local.logOut = function() {
    local.loginState = false;
    $localStorage.userInfo = '';
  }
}

angular.module('testApp')
    .service('localStorageService', localStorageService);