(function () {
  
  'use strict';
  /*
   * fireAuth Controller 
   * @author: Alan Museljic
   * @licence: MIT
   * @github: https://github.com/uloga
   */
  
  angular
    .module('fireAuth')
    .controller('AuthController', AuthController);
  
  /*
   * Auth Controller
   */
  
  AuthController.$inject = ['AuthService'];
  
  function AuthController(AuthService){
  
    var vm      = this;
    vm.login    = Login;
    vm.register = Register;
    vm.logout   = Logout;
    vm.github   = Github;
    
    AuthService.resolve();
    
    // Login User
    function Login(){
      
      // get and set the form data
      var data = {
        email: vm.email,
        password: vm.password
      };
      
      // authenticate user
      AuthService.login(data);
      
    }
    
    // Register User
    function Register(){
      // get and set the form data
      var data = {
        username: vm.username,
        email: vm.email,
        password: vm.password
      };
      
      AuthService.register(data);
    }
    
    // Logout 
    function Logout(){
      AuthService.logout();
    }
    
    // Facebook Connect
    function Github(){
      AuthService.github();
    }
    
  }
  
})();