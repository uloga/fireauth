(function () {
  'use strict';
  
  /*
   * fireAuth Service
   * @author: Alan Museljic
   * @licence: MIT
   * @github: https://github.com/uloga
   */
  
  
  angular
    .module('fireAuth')
    .service('AuthService', AuthService);
  
  
  /*
   *  Auth Service
   */
  
  AuthService.$inject = [
    'DB',
    '$fireAuth'
  ];
  
  function AuthService(DB, $fireAuth){
    
    var vm      = this;
    vm.login    = Login;
    vm.register = Register;
    vm.logout   = Logout;
    vm.resolve  = Resolve;
    vm.github   = Github;
    
    // Auth Service Login
    function Login(data){
      /*
       * You could do something with 
       * the data before login a user,
       * like custom validation for example
       */
      $fireAuth.loginUser(data);
    }
    
    // Auth Service Regiser
    function Register(data){
      /*
       * You could do something with 
       * the data before registering a user,
       * like custom validation for example
       */
      $fireAuth.createUser(data);
    }
    
    // Auth Service Logout
    function Logout(){
      $fireAuth.unAuth();
    }
    
    // FireBase Resolve
    function Resolve(){
      $fireAuth.resolve();
    }
    
    function Github(){
      $fireAuth.github();
    }
    
  }
  
  
})();