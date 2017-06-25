function gifCtrl($scope, giphyAPIService, localStorageService, $localStorage) {
  var vm = this;
  vm.list = [];
  vm.searchStr = '';
  vm.loadProcess = false;
  vm.loginState = localStorageService.loginState;
  vm.favorites = [];
  vm.user = localStorageService.user;

  if (localStorageService.IDstorage) {
    var temp = localStorageService.IDstorage;
      giphyAPIService.getGifsById(temp.join(',')).then(function(data){
        vm.favorites  = data;
      });
  }

  function init() {
    giphyAPIService.getGifs('trending',25,0,[]).then(function(data){
      vm.list = data;
      for (var f = 0; f < vm.favorites.length; f++) {
        for (var l = 0; l < vm.list.length; l++) {
          if (vm.favorites[f].id === vm.list[l].id) {
            vm.list.splice(l, 1);
          }
        }
      }
    });
  }
  init();

  vm.addToFavorites = function(id) {
    var favGif;
    for (var i = 0; i<vm.list.length; i++) {
      if (id === vm.list[i].id) {
        favGif = vm.list[i];
        vm.list.splice(i,1);
      }
    }
    vm.favorites.push(favGif);
    localStorageService.addToLs(favGif.id);
  };

  vm.removeFromFavorites = function(id) {
    for (var i = 0; i<vm.favorites.length; i++) {
      if (id === vm.favorites[i].id) {
        var removedGif = vm.favorites[i];
        localStorageService.removeFromLs(removedGif.id);
        vm.list.push(removedGif);
        vm.favorites.splice(i,1);
      }
    }
    localStorageService.removeFromLs(removedGif.id);
  };

  vm.searchGif = function() {
    vm.list = [];
    vm.loadProcess = true;
    var params = 'q=' + vm.searchStr.split(' ').join('+');
    giphyAPIService.getGifs('search',25,0,params).then(function(data){
      vm.list = data;
      vm.loadProcess = false;
    });
  };

  vm.logOut = function() {
    localStorageService.logOut();
  };

  $scope.$watch(function () { return $localStorage.userInfo; },function(newVal,oldVal){
    localStorageService.init();
    vm.loginState = localStorageService.loginState;
    vm.user = localStorageService.user;
  });

}

angular.module('testApp')
    .controller('gifCtrl', ['$scope', 'giphyAPIService', 'localStorageService', '$localStorage', gifCtrl]);