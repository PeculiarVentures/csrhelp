(function(){

    angular
        .module('csrhelps')
        .factory('FreeGeoIP', FreeGeoIPService);

    FreeGeoIPService.$inject = ['$http'];

    function FreeGeoIPService($http){
        return {
            getJson: getJson
        };

        function getJson(){
            var url = 'http://freegeoip.net/json/?callback=JSON_CALLBACK';
            return $http
                .jsonp(url)
                .then(function(resp){
                    var data = resp.data || {};
                    return {
                        state: data['region_name'] || '',
                        city: data['city'] || '',
                        country: data['country_code'] || ''
                    };
                    
                })
        }
    }

})()