(function () {
  'use strict';
  
  /*
   * @author: Alan Museljic
   * @licence: MIT
   * @github: https://github.com/uloga
   */
  
  /* 
   * Replace firebaseUrl with your own firebase url.
   */
  
  var firebaseUrl  = 'https://ulogadb.firebaseio.com/';
  
  // Module Setter | This could be your main app module
  angular
    .module('myApp', [
      'ngRoute',
      'fireAuth'
    ]);
  
  
  // Getters
  angular
    .module('myApp')
    .constant('DB', { url: firebaseUrl })
    .factory('firePath', Paths);
  
  
  /*
   * fireAuth Paths
   * Here you can setup your restricted and
   * allowed pahts. Restricted paths will require
   * authentication. All you have to do is add 
   * paths to restricted or allowed 
   * array e.g. ['/home', '/somepath']
   */
   
   function Paths(){
     return {
       // can be accessed without authentication
       allowed: ['/home'],
       // requires authentication
       restricted: ['/profile'],
       // after login redirect to:
       afterLogin: ['/profile'] 
     };
   }
   

})();