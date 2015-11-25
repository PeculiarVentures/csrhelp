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
    var menu_items = [
      {
        name: 'About Us',
        avatar: 'svg-1',
        link: 'Aboutus',
        content: 'SSL Certificate signing request tool-Requesting a certificate made simple'
      },
      {
        name: 'Certificate Request',
        avatar: 'svg-2',
        link: 'CertificateRequest',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      },
      {
        name: 'Faqs',
        avatar: 'svg-3',
        link: 'Faqs',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      }
    ];

    // Promise-based API
    return {
      loadAllMenuItems : function() {
        // Simulate async nature of real remote calls
        return $q.when(menu_items);
      }
    };
  }

})();
