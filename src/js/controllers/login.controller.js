function loginCtrl(localStorageService, $localStorage, $scope) {
  var vm = this;

  localStorageService.init();

  if ($localStorage.userInfo && typeof $localStorage.userInfo !== "undefined") {
    vm.loginState = true;
    vm.userInfo = JSON.parse($localStorage.userInfo);
  } else {
    vm.loginState = false;
    vm.userInfo = {};
  }

  vm.login = function(name, pass) {
    vm.userInfo = {
      name:     name,
      password: pass
    };
    $localStorage.userInfo = JSON.stringify(vm.userInfo);
    vm.loginState = true;

    localStorageService.init();
  };

  $scope.$watch(function() {
    return $localStorage.userInfo;
  }, function(newVal, oldVal) {
    localStorageService.init();
    vm.loginState = localStorageService.loginState;
    vm.userInfo = localStorageService.user;
  });
}

angular.module('testApp')
    .controller('loginCtrl', ['localStorageService', '$localStorage', '$scope', loginCtrl]);