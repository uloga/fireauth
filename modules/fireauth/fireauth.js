(function () {
  
  'use strict';
  
  /*
   * fireAuth App - Bootstrap / Routing / Extend Firebase
   * @author: Alan Museljic
   * @licence: MIT
   * @github: https://github.com/uloga
   */
  
 
  angular
    .module('fireAuth', ['firebase'])
    .config(fireAuthConfig)
    .service('$fireAuth', fireAuth)
    .factory('Flash', Flash)
    .run(fireAuthRun);
  
  
  /*
   * fireAuth Configuration
   * @router: $routeProvider
   * You can use also ui-router
   */
  
  fireAuthConfig.$inject = ['$routeProvider'];
  
  function fireAuthConfig($routeProvider){
   
    $routeProvider
      .when('/login', {
        templateUrl: 'modules/fireauth/view/login.html',
        controller: 'AuthController',
        controllerAs: 'Auth'
      })
      .when('/register', {
        templateUrl: 'modules/fireauth/view/register.html',
        controller: 'AuthController',
        controllerAs: 'Auth'
      })
      .when('/profile', {
        templateUrl: 'modules/fireauth/view/profile.html',
        controller: 'AuthController',
        controllerAs: 'Auth'
      })
      .when('/home', {
        templateUrl: 'modules/fireauth/view/home.html',
        controller: 'AuthController',
        controllerAs: 'Auth'
      })
      .when('/logout', {
        controller: 'AuthController',
        controllerAs: 'Auth'
      })
      .otherwise({
        redirectTo: 'login'
      });
  }
  
  /*
   * FireBase Extending angularFire
   * We could put this into it's own module
   * but just for this example i've decided to keep it here
   * Soon I will add an angular.js orm repo @github 
   * which will support FireBase and many other api's
   */
  
  fireAuth.$inject = [
    'DB',
    'firePath',
    '$rootScope', 
    '$firebaseAuth', 
    '$firebaseObject',
    '$location',
    'Flash'
  ];
  
  function fireAuth(DB, firePath, $rootScope, $firebaseAuth, $firebaseObject, $location, Flash){
    
    var vm        = this;
    vm.ref        = Reference;
    vm.auth       = $firebaseAuth(vm.ref());
    vm.get        = Get;
    vm.onAuth     = onAuth;
    vm.loginUser  = loginUser;
    vm.createUser = createUser;
    vm.github     = Github;
    vm.unAuth     = unAuth;
    vm.resolve    = Resolve;
    vm.restricted = Restricted;
    vm.allowed    = Allowed;
    
    
    // Allowed Paths
    function Allowed(path){
      return firePath.allowed.indexOf(path) > -1;
    }
    
    // Restricted Paths 
    function Restricted(path){
      return firePath.restricted.indexOf(path) > -1;
    }
    
    // FireBase Reference
    function Reference(path){
      var url = (path !== 'undefined') ? DB.url + path + '/' : DB.url;
      return new Firebase(url);
    }
    
    // Get FireBase Object
    function Get(path){
      return $firebaseObject(vm.ref(path));
    }
    
    // FireBase $onAuth
    function onAuth(){
      
      vm.auth.$onAuth(function(userInfo){
        if(userInfo){
          $rootScope.userData = vm.get('users/' + userInfo.uid);
        }else{
          $rootScope.userData = '';
        }
      });
      
    }
    
    
    // FireBase $authWithPassword
    function loginUser(data){
      
      vm.auth.$authWithPassword(data)
      
        .then(function(loggedinUser){
          
          Flash.success("You've successfully logged in.");
          $location.path(firePath.afterLogin);

        }).catch(function(err){
          
          var msg = err.message
            .replace('Firebase.authWithPassword failed: ', '');
          
          Flash.error(msg);
          
        });
    }
    
    // FireBase $createUser
    function createUser(data){
      
      vm.auth.$createUser(data)
        
          .then(function(user){
            
            var obj =  {
              userId: user.uid,
              created: Firebase.ServerValue.TIMESTAMP,
              username: data.username,
              email: data.email
            };
            
            vm.ref('users')
              .child(user.uid)
              .set(obj);
            
            // after register login and redirect
            vm.loginUser(data); 
           
          }).catch(function(err){
            
            var msg  = 
              err.message
                .replace('Firebase.createUser failed: ', '');
              Flash.error(msg);
              
          });
    }
    
    // Github Authentication
    function Github(){
      
      vm.ref().authWithOAuthPopup("github", GitAuth, {
        remember: "sessionOnly",
        scope: "user,gist"
      });
      
      function GitAuth(err, authData){
        
        if (err) {
          
          Flash(err.message);
          
        } else {
          
          var obj = {
              userId: authData.uid,
              created: Firebase.ServerValue.TIMESTAMP,
              username: authData.github.username,
              email: authData.github.email
          }
          
          vm.ref('users')
            .child(authData.uid)
            .set(obj);
          
          Flash.success("You've successfully logged in using Github Auth.");
          $location.path(firePath.afterLogin);
          
        }
      }
    }
    
    // FrieBase $unauth
    function unAuth(){
      vm.auth.$unauth();
      Flash.success("You've successfully logged out.");
      vm.resolve();
    }
    
    // fireAuth custom resolve
    function Resolve(){
      if(vm.ref().getAuth()){
        if(!vm.allowed($location.$$path) && !vm.restricted($location.$$path)){
          $location.path(firePath.afterLogin);
        }
      }else if(vm.restricted($location.$$path)){
        $location.path('/login');
      }
    }
    
  }
  
  /* 
   * Flash Message
   * @return: object | success or error 
   */
  
  Flash.$inject = ['$rootScope', '$timeout'];
    
  function Flash($rootScope, $timeout){
    
    return {
      success: function(msg){
        $rootScope.flashMsg = msg;
        $rootScope.flashType = 'green fade-in-down fast';
        $timeout(function(){
          $rootScope.flashType = 'green fade-out-up fast';
        }, 2000);
      },
      error: function(msg){
        $rootScope.flashMsg = msg;
        $rootScope.flashType = 'red fade-in-down fast';
        $timeout(function(){
          $rootScope.flashType = 'red fade-out-up fast';
        }, 2000);
      }
    }
    
  }
    
    
 /*
  * fireAuth Run Function
  */

  fireAuthRun.$inject = ['$fireAuth'];

  function fireAuthRun($fireAuth){
    $fireAuth.onAuth();
  }
  
})();