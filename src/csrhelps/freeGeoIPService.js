(function(){

    angular
        .module('csrhelps')
        .factory('FreeGeoIP', FreeGeoIPService);

    FreeGeoIPService.$inject = ['$http'];

    function FreeGeoIPService($http) {
        return {
            getJson: getJson,
        };

        function getJson() {
            var url = 'https://freegeoip.net/json/';

            return $http.get(url)
                .then(function(resp) {
                    var data = resp.data || {};

                    return {
                        state: data['region_name'] || '',
                        city: data['city'] || '',
                        country: data['country_code'] || '',
                    };
                });
        }
    }

})()