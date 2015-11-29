	'use strict';
  angular
      .module('csrhelpApp', ['ngMaterial', 'csrhelps', 'ngMessages','zeroclipboard'])
      .config(function($mdThemingProvider, $mdIconProvider, uiZeroclipConfigProvider){						              
              $mdThemingProvider.theme('docs-dark', 'default')
                  .primaryPalette('yellow')
                  .dark();
                  
              uiZeroclipConfigProvider.setZcConf({swfPath: 'assets/js/ZeroClipboard.swf'});
							  // configure html5 to get links working on jsfiddle
							  //$locationProvider.html5Mode(true);
      });