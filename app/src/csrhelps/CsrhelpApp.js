	'use strict';
  angular
      .module('csrhelpApp', ['ngMaterial', 'csrhelps', 'ngMessages'])
      .config(function($mdThemingProvider, $mdIconProvider){						
              
              $mdThemingProvider.theme('docs-dark', 'default')
                  .primaryPalette('yellow')
                  .dark();

							
							  // configure html5 to get links working on jsfiddle
							  //$locationProvider.html5Mode(true);
      })