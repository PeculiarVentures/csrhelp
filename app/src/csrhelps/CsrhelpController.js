(function(){
    'use strict';
    
  angular
       .module('csrhelps')
       .controller('CsrhelpController', [
          'csrhelpService', '$mdSidenav', '$mdBottomSheet', '$mdUtil',
          '$log', '$q', '$scope', '$timeout',
          CsrhelpController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CsrhelpController(
    csrhelpService, $mdSidenav, $mdBottomSheet, $mdUtil,
    $log, $q, $scope, $timeout) {
 
        if (window.crypto && 
            !window.crypto.subtle && 
            window.crypto.webkitSubtle) {
                window.crypto.subtle = window.crypto.webkitSubtle;
        }
        if (!window.crypto || 
            !window.crypto.subtle){
                $scope.bWebcrypto=false;
        } else {
            $scope.bWebcrypto=true;
        }
        var master = {};
        master.messages = [
        {
            type: 'OpenSSL',
            method: 'make_openssl',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type: 'Exchange 2007',
            method: 'make_exchange2007',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type: 'Exchange 2010',
            method: 'make_exchange2010',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type: 'Java Keytool',
            method: 'make_keytool',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type: 'F5 Big-IP',
            method: 'make_bigip',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type: 'IIS',
            method: 'make_iis',
            content: '',
            download: false,
            status: 'Copy'
        },{
            type:'Any',
            method: 'make_any',
            content: '',
            download: true,
            status: 'Copy'
        }];
 
        var RSAKeySizes = [{key:2048, value:"2048"}, {key:3072, value:"3072"}, {key:4096, value:"4096"}, {key:6144, value:"6144"}, {key:8192, value:"8192"}];
        var ECCKeySizes = [{key:256, value:"secp256r1"}, {key:384, value:"secp384r1"}, {key:521, value:"secp521r1"}];
        
        var dbounceFn = $mdUtil.debounce(generateReport, 1500);
        $scope.algorithms = ["RSA", "ECC"];
        $scope.keysizes = [{key:2048, value:"2048"}, {key:3072, value:"3072"}, {key:4096, value:"4096"}, {key:6144, value:"6144"}, {key:8192, value:"8192"}];
        $scope.countries = [{name: 'Afghanistan', code: 'AF'}, {name: 'Aland Islands', code: 'AX'}, {name: 'Albania', code: 'AL'}, {name: 'Algeria', code: 'DZ'}, {name: 'American Samoa', code: 'AS'}, {name: 'AndorrA', code: 'AD'}, {name: 'Angola', code: 'AO'}, {name: 'Anguilla', code: 'AI'}, {name: 'Antarctica', code: 'AQ'}, {name: 'Antigua and Barbuda', code: 'AG'}, {name: 'Argentina', code: 'AR'}, {name: 'Armenia', code: 'AM'}, {name: 'Aruba', code: 'AW'}, {name: 'Australia', code: 'AU'}, {name: 'Austria', code: 'AT'}, {name: 'Azerbaijan', code: 'AZ'}, {name: 'Bahamas', code: 'BS'}, {name: 'Bahrain', code: 'BH'}, {name: 'Bangladesh', code: 'BD'}, {name: 'Barbados', code: 'BB'}, {name: 'Belarus', code: 'BY'}, {name: 'Belgium', code: 'BE'}, {name: 'Belize', code: 'BZ'}, {name: 'Benin', code: 'BJ'}, {name: 'Bermuda', code: 'BM'}, {name: 'Bhutan', code: 'BT'}, {name: 'Bolivia', code: 'BO'}, {name: 'Bosnia and Herzegovina', code: 'BA'}, {name: 'Botswana', code: 'BW'}, {name: 'Bouvet Island', code: 'BV'}, {name: 'Brazil', code: 'BR'}, {name: 'British Indian Ocean Territory', code: 'IO'}, {name: 'Brunei Darussalam', code: 'BN'}, {name: 'Bulgaria', code: 'BG'}, {name: 'Burkina Faso', code: 'BF'}, {name: 'Burundi', code: 'BI'}, {name: 'Cambodia', code: 'KH'}, {name: 'Cameroon', code: 'CM'}, {name: 'Canada', code: 'CA'}, {name: 'Cape Verde', code: 'CV'}, {name: 'Cayman Islands', code: 'KY'}, {name: 'Central African Republic', code: 'CF'}, {name: 'Chad', code: 'TD'}, {name: 'Chile', code: 'CL'}, {name: 'China', code: 'CN'}, {name: 'Christmas Island', code: 'CX'}, {name: 'Cocos (Keeling) Islands', code: 'CC'}, {name: 'Colombia', code: 'CO'}, {name: 'Comoros', code: 'KM'}, {name: 'Congo', code: 'CG'}, {name: 'Congo, The Democratic Republic of the', code: 'CD'}, {name: 'Cook Islands', code: 'CK'}, {name: 'Costa Rica', code: 'CR'}, {name: 'Cote D\'Ivoire', code: 'CI'}, {name: 'Croatia', code: 'HR'}, {name: 'Cuba', code: 'CU'}, {name: 'Cyprus', code: 'CY'}, {name: 'Czech Republic', code: 'CZ'}, {name: 'Denmark', code: 'DK'}, {name: 'Djibouti', code: 'DJ'}, {name: 'Dominica', code: 'DM'}, {name: 'Dominican Republic', code: 'DO'}, {name: 'Ecuador', code: 'EC'}, {name: 'Egypt', code: 'EG'}, {name: 'El Salvador', code: 'SV'}, {name: 'Equatorial Guinea', code: 'GQ'},                                                  {name: 'Eritrea', code: 'ER'},                                                  {name: 'Estonia', code: 'EE'},                                                  {name: 'Ethiopia', code: 'ET'},                                                 {name: 'Falkland Islands (Malvinas)', code: 'FK'},                                                  {name: 'Faroe Islands', code: 'FO'},                                                {name: 'Fiji', code: 'FJ'},                                                 {name: 'Finland', code: 'FI'},                                                  {name: 'France', code: 'FR'},                                                   {name: 'French Guiana', code: 'GF'},                                                {name: 'French Polynesia', code: 'PF'},                                                 {name: 'French Southern Territories', code: 'TF'},                                                  {name: 'Gabon', code: 'GA'},                                                {name: 'Gambia', code: 'GM'},                                                   {name: 'Georgia', code: 'GE'},                                                  {name: 'Germany', code: 'DE'},                                                  {name: 'Ghana', code: 'GH'},                                                {name: 'Gibraltar', code: 'GI'},                                                {name: 'Greece', code: 'GR'},                                                   {name: 'Greenland', code: 'GL'},                                                {name: 'Grenada', code: 'GD'},                                                  {name: 'Guadeloupe', code: 'GP'},                                                   {name: 'Guam', code: 'GU'},                                                 {name: 'Guatemala', code: 'GT'},                                                {name: 'Guernsey', code: 'GG'},                                                 {name: 'Guinea', code: 'GN'},                                                   {name: 'Guinea-Bissau', code: 'GW'},                                                {name: 'Guyana', code: 'GY'},                                                   {name: 'Haiti', code: 'HT'},                                                {name: 'Heard Island and Mcdonald Islands', code: 'HM'},                                                {name: 'Holy See (Vatican City State)', code: 'VA'},                                                {name: 'Honduras', code: 'HN'},                                                 {name: 'Hong Kong', code: 'HK'},                                                {name: 'Hungary', code: 'HU'},                                                  {name: 'Iceland', code: 'IS'},                                                  {name: 'India', code: 'IN'},                                                {name: 'Indonesia', code: 'ID'},                                                {name: 'Iran, Islamic Republic Of', code: 'IR'},                                                {name: 'Iraq', code: 'IQ'},                                                 {name: 'Ireland', code: 'IE'},                                                  {name: 'Isle of Man', code: 'IM'},                                                  {name: 'Israel', code: 'IL'},                                                   {name: 'Italy', code: 'IT'},                                                {name: 'Jamaica', code: 'JM'},                                                  {name: 'Japan', code: 'JP'},                                                {name: 'Jersey', code: 'JE'},                                                   {name: 'Jordan', code: 'JO'},                                                   {name: 'Kazakhstan', code: 'KZ'},                                                   {name: 'Kenya', code: 'KE'},                                                {name: 'Kiribati', code: 'KI'},                                                 {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},                                                  {name: 'Korea, Republic of', code: 'KR'},                                                   {name: 'Kuwait', code: 'KW'},                                                   {name: 'Kyrgyzstan', code: 'KG'},                                                   {name: 'Lao People\'S Democratic Republic', code: 'LA'},                                                {name: 'Latvia', code: 'LV'},                                                   {name: 'Lebanon', code: 'LB'},                                                  {name: 'Lesotho', code: 'LS'},                                                  {name: 'Liberia', code: 'LR'},                                                  {name: 'Libyan Arab Jamahiriya', code: 'LY'},                                                   {name: 'Liechtenstein', code: 'LI'},                                                {name: 'Lithuania', code: 'LT'},                                                {name: 'Luxembourg', code: 'LU'},                                                   {name: 'Macao', code: 'MO'},                                                {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},                                                   {name: 'Madagascar', code: 'MG'},                                                   {name: 'Malawi', code: 'MW'},                                                   {name: 'Malaysia', code: 'MY'},                                                 {name: 'Maldives', code: 'MV'},                                                 {name: 'Mali', code: 'ML'},                                                 {name: 'Malta', code: 'MT'},                                                {name: 'Marshall Islands', code: 'MH'},                                                 {name: 'Martinique', code: 'MQ'},                                                   {name: 'Mauritania', code: 'MR'},                                                   {name: 'Mauritius', code: 'MU'},                                                {name: 'Mayotte', code: 'YT'},                                                  {name: 'Mexico', code: 'MX'},                                                   {name: 'Micronesia, Federated States of', code: 'FM'},                                                  {name: 'Moldova, Republic of', code: 'MD'},                                                 {name: 'Monaco', code: 'MC'},                                                   {name: 'Mongolia', code: 'MN'},                                                 {name: 'Montserrat', code: 'MS'},                                                   {name: 'Morocco', code: 'MA'},                                                  {name: 'Mozambique', code: 'MZ'},                                                   {name: 'Myanmar', code: 'MM'},                                                  {name: 'Namibia', code: 'NA'},                                                  {name: 'Nauru', code: 'NR'},                                                {name: 'Nepal', code: 'NP'},                                                {name: 'Netherlands', code: 'NL'},                                                  {name: 'Netherlands Antilles', code: 'AN'},                                                 {name: 'New Caledonia', code: 'NC'},                                                {name: 'New Zealand', code: 'NZ'},                                                  {name: 'Nicaragua', code: 'NI'},                                                {name: 'Niger', code: 'NE'},                                                {name: 'Nigeria', code: 'NG'},                                                  {name: 'Niue', code: 'NU'},                                                 {name: 'Norfolk Island', code: 'NF'},                                                   {name: 'Northern Mariana Islands', code: 'MP'},                                                 {name: 'Norway', code: 'NO'},                                                   {name: 'Oman', code: 'OM'},                                                 {name: 'Pakistan', code: 'PK'},                                                 {name: 'Palau', code: 'PW'},                                                {name: 'Palestinian Territory, Occupied', code: 'PS'},                                                  {name: 'Panama', code: 'PA'},                                                   {name: 'Papua New Guinea', code: 'PG'},                                                 {name: 'Paraguay', code: 'PY'},                                                 {name: 'Peru', code: 'PE'},                                                 {name: 'Philippines', code: 'PH'},                                                  {name: 'Pitcairn', code: 'PN'},                                                 {name: 'Poland', code: 'PL'},                                                   {name: 'Portugal', code: 'PT'},                                                 {name: 'Puerto Rico', code: 'PR'},                                                  {name: 'Qatar', code: 'QA'},                                                {name: 'Reunion', code: 'RE'},                                                  {name: 'Romania', code: 'RO'},                                                  {name: 'Russian Federation', code: 'RU'},                                                   {name: 'RWANDA', code: 'RW'},                                                   {name: 'Saint Helena', code: 'SH'},                                                 {name: 'Saint Kitts and Nevis', code: 'KN'},                                                {name: 'Saint Lucia', code: 'LC'},                                                  {name: 'Saint Pierre and Miquelon', code: 'PM'},                                                {name: 'Saint Vincent and the Grenadines', code: 'VC'},                                                 {name: 'Samoa', code: 'WS'},                                                {name: 'San Marino', code: 'SM'},                                                   {name: 'Sao Tome and Principe', code: 'ST'},                                                {name: 'Saudi Arabia', code: 'SA'},                                                 {name: 'Senegal', code: 'SN'},                                                  {name: 'Serbia and Montenegro', code: 'CS'},                                                {name: 'Seychelles', code: 'SC'},                                                   {name: 'Sierra Leone', code: 'SL'},                                                 {name: 'Singapore', code: 'SG'},                                                {name: 'Slovakia', code: 'SK'},                                                 {name: 'Slovenia', code: 'SI'},                                                 {name: 'Solomon Islands', code: 'SB'},                                                  {name: 'Somalia', code: 'SO'},                                                  {name: 'South Africa', code: 'ZA'},                                                 {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},                                                 {name: 'Spain', code: 'ES'},                                                {name: 'Sri Lanka', code: 'LK'},                                                {name: 'Sudan', code: 'SD'},                                                {name: 'Suriname', code: 'SR'},                                                 {name: 'Svalbard and Jan Mayen', code: 'SJ'},                                                   {name: 'Swaziland', code: 'SZ'},                                                {name: 'Sweden', code: 'SE'},                                                   {name: 'Switzerland', code: 'CH'},                                                  {name: 'Syrian Arab Republic', code: 'SY'},                                                 {name: 'Taiwan, Province of China', code: 'TW'},                                                {name: 'Tajikistan', code: 'TJ'},                                                   {name: 'Tanzania, United Republic of', code: 'TZ'},                                             {name: 'Thailand', code: 'TH'},                                                 {name: 'Timor-Leste', code: 'TL'},                                                  {name: 'Togo', code: 'TG'},                                                 {name: 'Tokelau', code: 'TK'},                                                  {name: 'Tonga', code: 'TO'},                                                {name: 'Trinidad and Tobago', code: 'TT'},                                                  {name: 'Tunisia', code: 'TN'},                                                  {name: 'Turkey', code: 'TR'},                                                   {name: 'Turkmenistan', code: 'TM'},                                                 {name: 'Turks and Caicos Islands', code: 'TC'},                                                 {name: 'Tuvalu', code: 'TV'},                                                   {name: 'Uganda', code: 'UG'},                                                   {name: 'Ukraine', code: 'UA'},                                                  {name: 'United Arab Emirates', code: 'AE'},                                                 {name: 'United Kingdom', code: 'GB'},                                                   {name: 'United States', code: 'US'},                                                {name: 'United States Minor Outlying Islands', code: 'UM'},                                                 {name: 'Uruguay', code: 'UY'},                                                  {name: 'Uzbekistan', code: 'UZ'},                                                   {name: 'Vanuatu', code: 'VU'},                                              {name: 'Venezuela', code: 'VE'},                                                {name: 'Viet Nam', code: 'VN'},                                                 {name: 'Virgin Islands, British', code: 'VG'},                                                  {name: 'Virgin Islands, U.S.', code: 'VI'},                                                 {name: 'Wallis and Futuna', code: 'WF'},                                                {name: 'Western Sahara', code: 'EH'},                                                   {name: 'Yemen', code: 'YE'},                                                {name: 'Zambia', code: 'ZM'},                                               {name: 'Zimbabwe', code: 'ZW'}];
        $scope.messages = [];
        $scope.generating = false;
        $scope.certificate = {
                hostname:"",
                filehostname: "",
                organization:"",
                organization_unit:"",
                city:"",
                state:"",
                country:"",
                algorithm:"RSA",
                keysize:"2048"
        };
        
        $scope.onChangeAlgorithmKey = function(){
            if($scope.certificate.algorithm =="ECC") {
                $scope.keysizes = [{key:256, value:"secp256r1"}, {key:384, value:"secp384r1"}, {key:521, value:"secp521r1"}];
                $scope.certificate.keysize = "secp256r1";
            } else {
                $scope.keysizes = [{key:2048, value:"2048"}, {key:3072, value:"3072"}, {key:4096, value:"4096"}, {key:6144, value:"6144"}, {key:8192, value:"8192"}];
                $scope.certificate.keysize = "2048";                    
            }
        }

        $scope.hideResult = function(){
            $scope.showResult = false;
            if($scope.certificateForm.$valid){
                $scope.showSpinner = true;
            }
            
        }
 
        $scope.onBlurOrChange = function(){
            dbounceFn();
        }
 
        $scope.copyToClipboard = function($event, item) {
            execCommandCopy($event, item, function(err){
                if(err){
                    console.log('err', err);
                    return;
                };
                for(var i = 0; i < 7; i++){
                    $scope.messages[i].status="Copy";
                }
                item.status="Copied";
            });             
        }
 
        $scope.download = function($event, item) {
            if($scope.certificate.hostname=="*.example.com"){
                $scope.certificate.filehostname = "star.example.com";
            }
            else{
                $scope.certificate.filehostname = $scope.certificate.hostname;
            }
            $($event.currentTarget)
                .attr('href','data:application/pkcs8,'+encodeURIComponent($scope.messages[6].privateKey))
                .attr('download', $scope.certificate.filehostname+'.key');
        }
 
        function generateReport(){
            if($scope.certificateForm.$valid){
                if($scope.generating){
                    $scope.showResult = false;
                    return;
                }
                $scope.generating = true;
                $scope.showSpinner = false;
                $scope.showResult = true;
                var certf = angular.copy($scope.certificate);
                var md5Key = btoa(JSON.stringify(certf));
                master.cachedMessages = master.cachedMessages || {};
                if(master.cachedMessages[md5Key]){
                    $scope.messages = angular.copy(master.cachedMessages[md5Key]);
                    $scope.generating = false;
                } else {
                    $scope.messages = (master.messages).map(function(message){
                        return angular.copy(message);
                    });
                    $scope.generating = false;
                    var promises = [];
                    ($scope.messages).forEach(function(message){
                        var context = (csrhelpService[message.method]).call(null, certf, message);
                        if(context && context.then){
                            promises.push(context);
                        }
                    })
                    $q.all(promises)
                        .catch(function(err){
                            console.log('ERR!: ', err);
                            $scope.errorMessage = err;
                        })
                        .finally(function(){
                            master.cachedMessages[md5Key] = angular.copy($scope.messages);
                        }); 
                }
            }
        }
 
        function selectToClipboard ($event, item) {
            if (window.getSelection && document.createRange) {
                // IE 9 and non-IE
                var range = document.createRange();
                range.selectNode(document.getElementById(item.type));
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.body.createTextRange) {
                // IE < 9
                var textRange = document.body.createTextRange();
                textRange.moveToElementText($($event.currentTarget));
                textRange.select();
            }
            
        }

        function execCommandCopy($event, item, cb){
            var supported = document.queryCommandSupported("copy");
            var copied = false;
            if (supported) {
              // Check that the browser isn't Firefox pre-41
              try {
                selectToClipboard($event, item);
                document.execCommand("copy");
                copied = true;
                cb();
              } catch (e) {
                supported = false;
              }
            }
            if (!supported) {
              // Fall back to an alternate approach like ZeroClipboard
              var el = $event.target;
              var clip = new ZeroClipboard(el);
              $(el).attr('data-clipboard-text', item.content);
              clip.on('ready', function(){
                this.on('aftercopy', function(event){
                    cb();
                })
              })
              clip.on('error', function(event){
                cb('error[name="' + event.name + '"]: ' + event.message);
                ZeroClipboard.destroy();
              })
            }
            
        }
        
    }

})();