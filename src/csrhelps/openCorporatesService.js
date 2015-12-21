(function(){

    angular
        .module('csrhelps')
        .factory('OpenCorporates', OpenCorporatesService);

    OpenCorporatesService.$inject = ['$q', '$http'];

    function OpenCorporatesService($q, $http){

        var US_STATES = [
            {"name":"Alabama","iso_code":"US-AL"},
            {"name":"Alaska","iso_code":"US-AK"},
            {"name":"Arizona","iso_code":"US-AZ"},
            {"name":"Arkansas","iso_code":"US-AR"},
            {"name":"California","iso_code":"US-CA"},
            {"name":"Colorado","iso_code":"US-CO"},
            {"name":"Connecticut","iso_code":"US-CT"},
            {"name":"Delaware","iso_code":"US-DE"},
            {"name":"District of Columbia","iso_code":"US-DC"},
            {"name":"Florida","iso_code":"US-FL"},
            {"name":"Georgia","iso_code":"US-GA"},
            {"name":"Hawaii","iso_code":"US-HI"},
            {"name":"Idaho","iso_code":"US-ID"},
            {"name":"Illinois","iso_code":"US-IL"},
            {"name":"Indiana","iso_code":"US-IN"},
            {"name":"Iowa","iso_code":"US-IA"},
            {"name":"Kansa","iso_code":"US-KS"},
            {"name":"Kentucky","iso_code":"US-KY"},
            {"name":"Lousiana","iso_code":"US-LA"},
            {"name":"Maine","iso_code":"US-ME"},
            {"name":"Maryland","iso_code":"US-MD"},
            {"name":"Massachusetts","iso_code":"US-MA"},
            {"name":"Michigan","iso_code":"US-MI"},
            {"name":"Minnesota","iso_code":"US-MN"},
            {"name":"Mississippi","iso_code":"US-MS"},
            {"name":"Missouri","iso_code":"US-MO"},
            {"name":"Montana","iso_code":"US-MT"},
            {"name":"Nebraska","iso_code":"US-NE"},
            {"name":"Nevada","iso_code":"US-NV"},
            {"name":"New Hampshire","iso_code":"US-NH"},
            {"name":"New Jersey","iso_code":"US-NJ"},
            {"name":"New Mexico","iso_code":"US-NM"},
            {"name":"New York","iso_code":"US-NY"},
            {"name":"North Carolina","iso_code":"US-NC"},
            {"name":"North Dakota","iso_code":"US-ND"},
            {"name":"Ohio","iso_code":"US-OH"},
            {"name":"Oklahoma","iso_code":"US-OK"},
            {"name":"Oregon","iso_code":"US-OR"},
            {"name":"Pennsylvania","iso_code":"US-PA"},
            {"name":"Rhode Island","iso_code":"US-RI"},
            {"name":"South Carolina","iso_code":"US-SC"},
            {"name":"South Dakota","iso_code":"US-SD"},
            {"name":"Tennessee","iso_code":"US-TN"},
            {"name":"Texas","iso_code":"US-TX"},
            {"name":"Utah","iso_code":"US-UT"},
            {"name":"Vermont","iso_code":"US-VT"},
            {"name":"Virginia","iso_code":"US-VA"},
            {"name":"Washington","iso_code":"US-WA"},
            {"name":"West Virginia","iso_code":"US-WV"},
            {"name":"Wisconsin","iso_code":"US-WI"},
            {"name":"Wyoming","iso_code":"US-WY"}
        ];

        return {
            getCompanyDetails: getCompanyDetails,
            search: search
        };

        function trimDoubleQuotes(str){
            return str.replace(/^\"/, '').replace(/\"$/, '');
        }

        function getCompanyDetails(data){
            var code = data.jurisdiction_code;
            var number = data.company_number;
            var url = 'https://api.opencorporates.com/companies/'+code+'/'+number+'?callback=JSON_CALLBACK';
            return $http
                .jsonp(url)
                .then(function(resp){
                    var company = (resp.data.results || {}).company;
                    if(!company){
                        return $q.reject();
                    }
                    var jurisdiction_code = (company.jurisdiction_code || '').replace('_', '-').toUpperCase();
                    var address = company.registered_address;
                    var country, state = '', city;
                    var result = {
                        name: trimDoubleQuotes(company.name),
                        city: '',
                        state: ''
                    };

                    if(angular.isObject(address)){
                        if(!!address.locality){
                            result.city = trimDoubleQuotes(address.locality);
                        }
                        if(!!address.region){
                            result.state = trimDoubleQuotes(address.region);
                        }
                    }

                    var isUSCode = /^US\-/.test(jurisdiction_code);
                    if(isUSCode && !(!!result.state)){
                        US_STATES.forEach(function(obj){
                            if(obj["iso_code"] == jurisdiction_code){
                                country = 'US';
                                state = obj["name"];
                            }
                        })
                    }

                    country = country || jurisdiction_code;

                    if(country){
                        result.country = trimDoubleQuotes(country);
                    }
                    if(state){
                        result.state = trimDoubleQuotes(state);
                    }

                    return result;
                })
        }

        function search(q){
            var url = 'https://api.opencorporates.com/v0.4/companies/search?q='+q+'&callback=JSON_CALLBACK&order=score';
            return $http
                .jsonp(url)
                .then(function(resp){
                    var results = resp.data && resp.data.results || {};
                    var companies = (results.companies || []).map(function(item){
                        var company = item.company;
                        return company;
                    });
                    
                    if(!companies.length){
                        return $q.reject();
                    }

                    return companies;

                })
        }
    }

})()
