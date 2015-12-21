(function(){

    angular
        .module('csrhelps')
        .factory('OpenCorporates', OpenCorporatesService);

    OpenCorporatesService.$inject = ['$q', '$http'];

    function OpenCorporatesService($q, $http){
        return {
            search: search
        };

        function search(q){
            var url = 'https://api.opencorporates.com/v0.4/companies/search?q='+q+'&callback=JSON_CALLBACK';
            return $http
                .jsonp(url)
                .then(function(resp){
                    var results = resp.data && resp.data.results || {};
                    return (results.companies || []).map(function(item){
                        return {name: item.company.name};
                    });
                })
        }
    }

})()