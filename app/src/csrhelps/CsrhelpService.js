(function(){
  'use strict';

  angular.module('csrhelps')
         .service('csrhelpService', ['$q', CsrhelpService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CsrhelpService($q){
    // Promise-based API
    
  }

})();