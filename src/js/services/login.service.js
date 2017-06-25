function loginService() {
  var login = {
    model: {
      name: '11111',
      password: ''
    }
  };

  login.userIsLogged = false;

  login.userLogin = function() {
    login.userIsLogged = !login.userIsLogged;
    return login;
  };

  login.logOut = function() {
    login.loginState = false;
    login.userInfo = {};
    //window.localStorage.clear();
  };
  return login;
}

angular.module('testApp')
    .factory('loginService', loginService);