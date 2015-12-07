  angular
       .module('csrhelps')
       .controller('CsrhelpController', [
          'csrhelpService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope',
          CsrhelpController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CsrhelpController( csrhelpService, $mdSidenav, $mdBottomSheet, $log, $q, $scope) {

	    if (window.crypto && !window.crypto.subtle && window.crypto.webkitSubtle) {
	        window.crypto.subtle = window.crypto.webkitSubtle;
	    }
	    if (!window.crypto || !window.crypto.subtle)
	         $scope.bWebcrypto=false;
	    else
	         $scope.bWebcrypto=true;

	   	$scope.messages = [{
	      type: 'OpenSSL',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	      type: 'Exchange 2007',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	      type: 'Exchange 2010',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	      type: 'Java Keytool',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	      type: 'F5 Big-IP',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	      type: 'IIS',
	      content: '',
	      download: false,
	      status: 'Copy'
	    },{
	    	type:'Any',
	    	content: ' ',
	    	download: true,
	    	status: 'Copy'
	    }];
	    
	    $scope.algorithms = ["RSA", "ECC"];
	    $scope.keysizes = [{key:2048, value:2048}, {key:4096, value:4096}];
	    $scope.countries = [{name: 'Afghanistan', code: 'AF'}, {name: 'Aland Islands', code: 'AX'}, {name: 'Albania', code: 'AL'}, {name: 'Algeria', code: 'DZ'}, {name: 'American Samoa', code: 'AS'}, {name: 'AndorrA', code: 'AD'}, {name: 'Angola', code: 'AO'}, {name: 'Anguilla', code: 'AI'}, {name: 'Antarctica', code: 'AQ'}, {name: 'Antigua and Barbuda', code: 'AG'}, {name: 'Argentina', code: 'AR'}, {name: 'Armenia', code: 'AM'}, {name: 'Aruba', code: 'AW'}, {name: 'Australia', code: 'AU'}, {name: 'Austria', code: 'AT'}, {name: 'Azerbaijan', code: 'AZ'}, {name: 'Bahamas', code: 'BS'}, {name: 'Bahrain', code: 'BH'}, {name: 'Bangladesh', code: 'BD'}, {name: 'Barbados', code: 'BB'}, {name: 'Belarus', code: 'BY'}, {name: 'Belgium', code: 'BE'}, {name: 'Belize', code: 'BZ'}, {name: 'Benin', code: 'BJ'}, {name: 'Bermuda', code: 'BM'}, {name: 'Bhutan', code: 'BT'}, {name: 'Bolivia', code: 'BO'}, {name: 'Bosnia and Herzegovina', code: 'BA'}, {name: 'Botswana', code: 'BW'}, {name: 'Bouvet Island', code: 'BV'}, {name: 'Brazil', code: 'BR'}, {name: 'British Indian Ocean Territory', code: 'IO'}, {name: 'Brunei Darussalam', code: 'BN'}, {name: 'Bulgaria', code: 'BG'}, {name: 'Burkina Faso', code: 'BF'}, {name: 'Burundi', code: 'BI'}, {name: 'Cambodia', code: 'KH'}, {name: 'Cameroon', code: 'CM'}, {name: 'Canada', code: 'CA'}, {name: 'Cape Verde', code: 'CV'}, {name: 'Cayman Islands', code: 'KY'}, {name: 'Central African Republic', code: 'CF'}, {name: 'Chad', code: 'TD'}, {name: 'Chile', code: 'CL'}, {name: 'China', code: 'CN'}, {name: 'Christmas Island', code: 'CX'}, {name: 'Cocos (Keeling) Islands', code: 'CC'}, {name: 'Colombia', code: 'CO'}, {name: 'Comoros', code: 'KM'}, {name: 'Congo', code: 'CG'}, {name: 'Congo, The Democratic Republic of the', code: 'CD'}, {name: 'Cook Islands', code: 'CK'}, {name: 'Costa Rica', code: 'CR'}, {name: 'Cote D\'Ivoire', code: 'CI'}, {name: 'Croatia', code: 'HR'}, {name: 'Cuba', code: 'CU'}, {name: 'Cyprus', code: 'CY'}, {name: 'Czech Republic', code: 'CZ'}, {name: 'Denmark', code: 'DK'}, {name: 'Djibouti', code: 'DJ'}, {name: 'Dominica', code: 'DM'}, {name: 'Dominican Republic', code: 'DO'}, {name: 'Ecuador', code: 'EC'}, {name: 'Egypt', code: 'EG'}, {name: 'El Salvador', code: 'SV'}, {name: 'Equatorial Guinea', code: 'GQ'}, 												  {name: 'Eritrea', code: 'ER'}, 												  {name: 'Estonia', code: 'EE'}, 												  {name: 'Ethiopia', code: 'ET'}, 												  {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 												  {name: 'Faroe Islands', code: 'FO'}, 												  {name: 'Fiji', code: 'FJ'}, 												  {name: 'Finland', code: 'FI'}, 												  {name: 'France', code: 'FR'}, 												  {name: 'French Guiana', code: 'GF'}, 												  {name: 'French Polynesia', code: 'PF'}, 												  {name: 'French Southern Territories', code: 'TF'}, 												  {name: 'Gabon', code: 'GA'}, 												  {name: 'Gambia', code: 'GM'}, 												  {name: 'Georgia', code: 'GE'}, 												  {name: 'Germany', code: 'DE'}, 												  {name: 'Ghana', code: 'GH'}, 												  {name: 'Gibraltar', code: 'GI'}, 												  {name: 'Greece', code: 'GR'}, 												  {name: 'Greenland', code: 'GL'}, 												  {name: 'Grenada', code: 'GD'}, 												  {name: 'Guadeloupe', code: 'GP'}, 												  {name: 'Guam', code: 'GU'}, 												  {name: 'Guatemala', code: 'GT'}, 												  {name: 'Guernsey', code: 'GG'}, 												  {name: 'Guinea', code: 'GN'}, 												  {name: 'Guinea-Bissau', code: 'GW'}, 												  {name: 'Guyana', code: 'GY'}, 												  {name: 'Haiti', code: 'HT'}, 												  {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 												  {name: 'Holy See (Vatican City State)', code: 'VA'}, 												  {name: 'Honduras', code: 'HN'}, 												  {name: 'Hong Kong', code: 'HK'}, 												  {name: 'Hungary', code: 'HU'}, 												  {name: 'Iceland', code: 'IS'}, 												  {name: 'India', code: 'IN'}, 												  {name: 'Indonesia', code: 'ID'}, 												  {name: 'Iran, Islamic Republic Of', code: 'IR'}, 												  {name: 'Iraq', code: 'IQ'}, 												  {name: 'Ireland', code: 'IE'}, 												  {name: 'Isle of Man', code: 'IM'}, 												  {name: 'Israel', code: 'IL'}, 												  {name: 'Italy', code: 'IT'}, 												  {name: 'Jamaica', code: 'JM'}, 												  {name: 'Japan', code: 'JP'}, 												  {name: 'Jersey', code: 'JE'}, 												  {name: 'Jordan', code: 'JO'}, 												  {name: 'Kazakhstan', code: 'KZ'}, 												  {name: 'Kenya', code: 'KE'}, 												  {name: 'Kiribati', code: 'KI'}, 												  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 												  {name: 'Korea, Republic of', code: 'KR'}, 												  {name: 'Kuwait', code: 'KW'}, 												  {name: 'Kyrgyzstan', code: 'KG'}, 												  {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 												  {name: 'Latvia', code: 'LV'}, 												  {name: 'Lebanon', code: 'LB'}, 												  {name: 'Lesotho', code: 'LS'}, 												  {name: 'Liberia', code: 'LR'}, 												  {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 												  {name: 'Liechtenstein', code: 'LI'}, 												  {name: 'Lithuania', code: 'LT'}, 												  {name: 'Luxembourg', code: 'LU'}, 												  {name: 'Macao', code: 'MO'}, 												  {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 												  {name: 'Madagascar', code: 'MG'}, 												  {name: 'Malawi', code: 'MW'}, 												  {name: 'Malaysia', code: 'MY'}, 												  {name: 'Maldives', code: 'MV'}, 												  {name: 'Mali', code: 'ML'}, 												  {name: 'Malta', code: 'MT'}, 												  {name: 'Marshall Islands', code: 'MH'}, 												  {name: 'Martinique', code: 'MQ'}, 												  {name: 'Mauritania', code: 'MR'}, 												  {name: 'Mauritius', code: 'MU'}, 												  {name: 'Mayotte', code: 'YT'}, 												  {name: 'Mexico', code: 'MX'}, 												  {name: 'Micronesia, Federated States of', code: 'FM'}, 												  {name: 'Moldova, Republic of', code: 'MD'}, 												  {name: 'Monaco', code: 'MC'}, 												  {name: 'Mongolia', code: 'MN'}, 												  {name: 'Montserrat', code: 'MS'}, 												  {name: 'Morocco', code: 'MA'}, 												  {name: 'Mozambique', code: 'MZ'}, 												  {name: 'Myanmar', code: 'MM'}, 												  {name: 'Namibia', code: 'NA'}, 												  {name: 'Nauru', code: 'NR'}, 												  {name: 'Nepal', code: 'NP'}, 												  {name: 'Netherlands', code: 'NL'}, 												  {name: 'Netherlands Antilles', code: 'AN'}, 												  {name: 'New Caledonia', code: 'NC'}, 												  {name: 'New Zealand', code: 'NZ'}, 												  {name: 'Nicaragua', code: 'NI'}, 												  {name: 'Niger', code: 'NE'}, 												  {name: 'Nigeria', code: 'NG'}, 												  {name: 'Niue', code: 'NU'}, 												  {name: 'Norfolk Island', code: 'NF'}, 												  {name: 'Northern Mariana Islands', code: 'MP'}, 												  {name: 'Norway', code: 'NO'}, 												  {name: 'Oman', code: 'OM'}, 												  {name: 'Pakistan', code: 'PK'}, 												  {name: 'Palau', code: 'PW'}, 												  {name: 'Palestinian Territory, Occupied', code: 'PS'}, 												  {name: 'Panama', code: 'PA'}, 												  {name: 'Papua New Guinea', code: 'PG'}, 												  {name: 'Paraguay', code: 'PY'}, 												  {name: 'Peru', code: 'PE'}, 												  {name: 'Philippines', code: 'PH'}, 												  {name: 'Pitcairn', code: 'PN'}, 												  {name: 'Poland', code: 'PL'}, 												  {name: 'Portugal', code: 'PT'}, 												  {name: 'Puerto Rico', code: 'PR'}, 												  {name: 'Qatar', code: 'QA'}, 												  {name: 'Reunion', code: 'RE'}, 												  {name: 'Romania', code: 'RO'}, 												  {name: 'Russian Federation', code: 'RU'}, 												  {name: 'RWANDA', code: 'RW'}, 												  {name: 'Saint Helena', code: 'SH'}, 												  {name: 'Saint Kitts and Nevis', code: 'KN'}, 												  {name: 'Saint Lucia', code: 'LC'}, 												  {name: 'Saint Pierre and Miquelon', code: 'PM'}, 												  {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 												  {name: 'Samoa', code: 'WS'}, 												  {name: 'San Marino', code: 'SM'}, 												  {name: 'Sao Tome and Principe', code: 'ST'}, 												  {name: 'Saudi Arabia', code: 'SA'}, 												  {name: 'Senegal', code: 'SN'}, 												  {name: 'Serbia and Montenegro', code: 'CS'}, 												  {name: 'Seychelles', code: 'SC'}, 												  {name: 'Sierra Leone', code: 'SL'}, 												  {name: 'Singapore', code: 'SG'}, 												  {name: 'Slovakia', code: 'SK'}, 												  {name: 'Slovenia', code: 'SI'}, 												  {name: 'Solomon Islands', code: 'SB'}, 												  {name: 'Somalia', code: 'SO'}, 												  {name: 'South Africa', code: 'ZA'}, 												  {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 												  {name: 'Spain', code: 'ES'}, 												  {name: 'Sri Lanka', code: 'LK'}, 												  {name: 'Sudan', code: 'SD'}, 												  {name: 'Suriname', code: 'SR'}, 												  {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 												  {name: 'Swaziland', code: 'SZ'}, 												  {name: 'Sweden', code: 'SE'}, 												  {name: 'Switzerland', code: 'CH'}, 												  {name: 'Syrian Arab Republic', code: 'SY'}, 												  {name: 'Taiwan, Province of China', code: 'TW'}, 												  {name: 'Tajikistan', code: 'TJ'}, 												  {name: 'Tanzania, United Republic of', code: 'TZ'}, 											  {name: 'Thailand', code: 'TH'}, 												  {name: 'Timor-Leste', code: 'TL'}, 												  {name: 'Togo', code: 'TG'}, 												  {name: 'Tokelau', code: 'TK'}, 												  {name: 'Tonga', code: 'TO'}, 												  {name: 'Trinidad and Tobago', code: 'TT'}, 												  {name: 'Tunisia', code: 'TN'}, 												  {name: 'Turkey', code: 'TR'}, 												  {name: 'Turkmenistan', code: 'TM'}, 												  {name: 'Turks and Caicos Islands', code: 'TC'}, 												  {name: 'Tuvalu', code: 'TV'}, 												  {name: 'Uganda', code: 'UG'}, 												  {name: 'Ukraine', code: 'UA'}, 												  {name: 'United Arab Emirates', code: 'AE'}, 												  {name: 'United Kingdom', code: 'GB'}, 												  {name: 'United States', code: 'US'}, 												  {name: 'United States Minor Outlying Islands', code: 'UM'}, 												  {name: 'Uruguay', code: 'UY'}, 												  {name: 'Uzbekistan', code: 'UZ'}, 												  {name: 'Vanuatu', code: 'VU'}, 											  {name: 'Venezuela', code: 'VE'}, 												  {name: 'Viet Nam', code: 'VN'}, 												  {name: 'Virgin Islands, British', code: 'VG'}, 												  {name: 'Virgin Islands, U.S.', code: 'VI'}, 												  {name: 'Wallis and Futuna', code: 'WF'}, 												  {name: 'Western Sahara', code: 'EH'}, 												  {name: 'Yemen', code: 'YE'}, 												  {name: 'Zambia', code: 'ZM'}, 											  {name: 'Zimbabwe', code: 'ZW'}];
	    
	    $scope.certificate = {
	    		common_name:"",
	    		filehostname: "",
	    		organization:"",
	    		organization_unit:"",
	    		city:"",
	    		state:"",
	    		country:"",
	    		algorithm:"RSA",
	    		keysize:"2048"
	    };
	    
	    $scope.checkToGenerate = function() {
	    		if($scope.certificate.algorithm =="ECC") {
	    			$scope.keysizes = [{key:256, value:"secp256r1"}, {key:384, value:"secp384r1"}, {key:521, value:"secp521r1"}];
	    			if($scope.certificate.keysize != "secp256r1" && $scope.certificate.keysize != "secp384r1" && $scope.certificate.keysize != "secp521r1")
	    				$scope.certificate.keysize = "secp256r1";
	    		} else {
	    			$scope.keysizes = [{key:2048, value:2048}, {key:4096, value:4096}];
	    			if($scope.certificate.keysize != 2048 && $scope.certificate.keysize != 4096)
	    				$scope.certificate.keysize = 2048;	    			
	    		}
	    		
	    		if($scope.certificate.common_name && $scope.certificate.algorithm && $scope.certificate.keysize) {
	    				$scope.generateCertificate();
	    		}
	    }
	    
	    $scope.generateCertificate = function() {
	    		$scope.certificate.common_name = $scope.certificate.common_name.toLowerCase();	    		
	    		for(var i = 1; i < 7; i++)
		    		$scope.messages[i].content="";
	    		
	    		if($scope.certificate.algorithm == "ECC") {
	    			$scope.make_openssl();
				$scope.make_keytool();
				if($scope.certificate.keysize != "secp521r1")
	    				$scope.make_bigip();
	    			$scope.make_iis();
	    			$scope.make_any();
		    	} else {
		    		$scope.make_openssl();
				$scope.make_exchange2007();
				$scope.make_exchange2010();
				$scope.make_keytool();
				$scope.make_bigip();
				$scope.make_iis();
				$scope.make_any();
			}
			
			setTimeout(function() {
				for(var i = 0; i < $("md-list-item").length-1; i++) {
					if($($("md-list-item")[i]).find("pre").html())
						$($("md-list-item")[i]).show();
					else
						$($("md-list-item")[i]).hide();
				}
			}, 50);

	    }
	    
	    $scope.make_openssl = function() {
	    		var openssl='openssl req -new -newkey rsa:'+ $scope.certificate.keysize +' -sha256 -nodes -out '+$scope.getFilename($scope.certificate.common_name)+'.csr -keyout '+$scope.getFilename($scope.certificate.common_name)+'.key -subj "';
			if($scope.certificate.country)
				openssl+='/C='+$scope.certificate.country;
			if($scope.certificate.state)				
				openssl+='/ST='+$scope.certificate.state;
			if($scope.certificate.city)
				openssl+='/L='+$scope.certificate.city;
			if($scope.certificate.organization)
				openssl+='/O='+$scope.certificate.organization;
			if($scope.certificate.organization_unit)
				openssl+='/OU='+$scope.certificate.organization_unit
	
			openssl+='/CN='+$scope.certificate.common_name+'"';
			
			if($scope.certificate.algorithm == "ECC") {
				openssl='openssl ecparam -name '+$scope.certificate.keysize+' -genkey -noout -out '+$scope.getFilename($scope.certificate.common_name)+'.key && openssl req -new -out '+$scope.getFilename($scope.certificate.common_name)+'.csr -key '+$scope.getFilename($scope.certificate.common_name)+'.key -subj "';
				if($scope.certificate.country)
					openssl+='/C='+$scope.certificate.country;
				if($scope.certificate.state)				
					openssl+='/ST='+$scope.certificate.state;
				if($scope.certificate.city)
					openssl+='/L='+$scope.certificate.city;
				if($scope.certificate.organization)
					openssl+='/O='+$scope.certificate.organization;
				if($scope.certificate.organization_unit)
					openssl+='/OU='+$scope.certificate.organization_unit;
		
				openssl+='/CN='+$scope.certificate.common_name+'"';
				
			}
			
			$scope.messages[0].content = openssl;
	    }
	    
	    $scope.make_exchange2007 = function() {	    	
	    		var exchange='New-ExchangeCertificate -GenerateRequest -Path .\\'+$scope.getFilename($scope.certificate.common_name)+'.csr -KeySize '+$scope.certificate.keysize+' -SubjectName "';
			var temp=false;
			
			if($scope.certificate.country) {
				exchange+='c='+$scope.certificate.country;
				temp=true;
			}
				
			if($scope.certificate.state && temp)
				exchange+=',st='+$scope.certificate.state;
			else if($scope.certificate.state && !temp) {
				exchange+='st='+$scope.certificate.state;
				temp=true;
			}
				
			if($scope.certificate.city && temp)
				exchange+=',l='+$scope.certificate.city;
			else if($scope.certificate.city && !temp) {
				exchange+='l='+$scope.certificate.city;
				temp=true;
			}
				
			if($scope.certificate.organization && temp)
				exchange+=',o='+$scope.certificate.organization;
			else if($scope.certificate.organization && !temp){
				exchange+='o='+$scope.certificate.organization;
				temp=true;
			}
				
			if($scope.certificate.organization_unit && temp)
				exchange+=',ou='+$scope.certificate.organization_unit;
			else if($scope.certificate.organization_unit && !temp) {
				exchange+='ou='+$scope.certificate.organization_unit;
				temp=true;
			}
				
			if(temp)
				exchange+=',cn='+$scope.certificate.common_name+'" -PrivateKeyExportable $True';
			else
				exchange+='cn='+$scope.certificate.common_name+'" -PrivateKeyExportable $True';
			
			$scope.messages[1].content=exchange;
	    }
	    
	    $scope.make_exchange2010 = function() {
	    		var exchange='Set-Content -path ".\\'+$scope.getFilename($scope.certificate.common_name)+'.csr" -Value (New-ExchangeCertificate -GenerateRequest -KeySize '+$scope.certificate.keysize+' -SubjectName "';		
			var temp=false;
			
			if($scope.certificate.country) {
				exchange+='c='+$scope.certificate.country;
				temp=true;
			}
				
			if($scope.certificate.state && temp)
				exchange+=',st='+$scope.certificate.state;
			else if($scope.certificate.state && !temp) {
				exchange+='st='+$scope.certificate.state;
				temp=true;
			}
				
			if($scope.certificate.city && temp)
				exchange+=',l='+$scope.certificate.city;
			else if($scope.certificate.city && !temp) {
				exchange+='l='+$scope.certificate.city;
				temp=true;
			}
				
			if($scope.certificate.organization && temp)
				exchange+=',o='+$scope.certificate.organization;
			else if($scope.certificate.organization && !temp){
				exchange+='o='+$scope.certificate.organization;
				temp=true;
			}
				
			if($scope.certificate.organization_unit && temp)
				exchange+=',ou='+$scope.certificate.organization_unit;
			else if($scope.certificate.organization_unit && !temp) {
				exchange+='ou='+$scope.certificate.organization_unit;
				temp=true;
			}
				
			if(temp)
				exchange+=',cn='+$scope.certificate.common_name+'" -PrivateKeyExportable $True';
			else
				exchange+='cn='+$scope.certificate.common_name+'" -PrivateKeyExportable $True';
			
			$scope.messages[2].content=exchange;	
	    }
	    
	    $scope.make_keytool = function() {
	    		var keytool='keytool -genkey -alias server -keyalg '+$scope.certificate.algorithm+' -sigalg SHA256withRSA -keysize '+$scope.certificate.keysize+' -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks -dname "';	    		
	    		if($scope.certificate.algorithm == "ECC")
	    			keytool='keytool -genkeypair -keyalg EC -sigalg SHA256withECDSA -keysize '+$scope.getECCKeysize('keytool',$scope.certificate.keysize)+' -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks -dname "';
			var temp=false;
			
			if($scope.certificate.country) {
				keytool+='C='+$scope.certificate.country;
				temp=true;
			}
				
			if($scope.certificate.state && temp)
				keytool+=',ST='+$scope.certificate.state;
			else if($scope.certificate.state && !temp) {
				keytool+='ST='+$scope.certificate.state;
				temp=true;
			}
				
			if($scope.certificate.city && temp)
				keytool+=',L='+$scope.certificate.city;
			else if($scope.certificate.city && !temp) {
				keytool+='L='+$scope.certificate.city;
				temp=true;
			}
				
			if($scope.certificate.organization && temp)
				keytool+=',O='+$scope.certificate.organization;
			else if($scope.certificate.organization && !temp) {
				keytool+='O='+$scope.certificate.organization;
				temp=true;
			}
				
			if($scope.certificate.organization_unit && temp)
				keytool+=',OU='+$scope.certificate.organization_unit;
			else if($scope.certificate.organization_unit && temp) {
				keytool+='OU='+$scope.certificate.organization_unit;
				temp=true;
			}

			if(temp) {
				if($scope.certificate.algorithm == "ECC")
					keytool+=',CN='+$scope.certificate.common_name+'" -alias server && keytool -certreq -alias server -file '+$scope.getFilename($scope.certificate.common_name)+'.csr -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks';
				else
					keytool+=',CN='+$scope.certificate.common_name+'" && keytool -certreq -alias server -file '+$scope.getFilename($scope.certificate.common_name)+'.csr -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks';
			}
			else {
				if($scope.certificate.algorithm == "ECC")
					keytool+='CN='+$scope.certificate.common_name+'" -alias server && keytool -certreq -alias server -file '+$scope.getFilename($scope.certificate.common_name)+'.csr -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks';
				else
					keytool+='CN='+$scope.certificate.common_name+'" && keytool -certreq -alias server -file '+$scope.getFilename($scope.certificate.common_name)+'.csr -keystore '+$scope.getFilename($scope.certificate.common_name)+'.jks';
			}
			$scope.messages[3].content=keytool;
	    }
	    
	    $scope.make_bigip = function() {
	    		var bigip='create sys crypto key '+$scope.certificate.common_name+' key-size '+$scope.certificate.keysize+' gen-csr';
		
			if($scope.certificate.country)
				bigip+=' country "'+$scope.certificate.country + '"';
			if($scope.certificate.state)				
				bigip+=' state "'+$scope.certificate.state + '"';
			if($scope.certificate.city)
				bigip+=' city "'+$scope.certificate.city + '"';
			if($scope.certificate.organization)
				bigip+=' organization "'+$scope.certificate.organization + '"';
			if($scope.certificate.organization_unit)
				bigip+=' ou "'+$scope.certificate.organization_unit + '"';
	
			bigip+=' common-name "'+$scope.certificate.common_name+ '"';
			if($scope.certificate.algorithm == "ECC") {
				var bigip='create key '+$scope.getFilename($scope.certificate.common_name)+' key-type ec-private curve-name '+$scope.getECCKeysize('bigip', $scope.certificate.keysize)+' gen-csr';
		
				if($scope.certificate.country)
					bigip+=' country "'+$scope.certificate.country + '"';
				if($scope.certificate.state)				
					bigip+=' state "'+$scope.certificate.state + '"';
				if($scope.certificate.city)
					bigip+=' city "'+$scope.certificate.city + '"';
				if($scope.certificate.organization)
					bigip+=' organization "'+$scope.certificate.organization + '"';
				if($scope.certificate.organization_unit)
					bigip+=' ou "'+$scope.certificate.organization_unit + '"';
		
				bigip+=' common-name "'+$scope.certificate.common_name+ '"';
			}
			$scope.messages[4].content=bigip;	
	    }
	    
	    $scope.make_iis = function() {
	    		var iis='echo [NewRequest] >csrparams.inf\r\necho Subject="';
			var temp=false;
			
			if($scope.certificate.country) {
				iis+='C='+$scope.certificate.country;
				temp=true;
			}
				
			if($scope.certificate.state && temp)
				iis+=',ST='+$scope.certificate.state;
			else if($scope.certificate.state && !temp) {
				iis+='ST='+$scope.certificate.state;
				temp=true;
			}
				
			if($scope.certificate.city && temp)
				iis+=',L='+$scope.certificate.city;
			else if($scope.certificate.city && !temp) {
				iis+='L='+$scope.certificate.city;
				temp=true;
			}
				
			if($scope.certificate.organization && temp)
				iis+=',O='+$scope.certificate.organization;
			else if($scope.certificate.organization && !temp) {
				iis+='O='+$scope.certificate.organization;
				temp=true;
			}
				
			if($scope.certificate.organization_unit && temp)
				iis+=',OU='+$scope.certificate.organization_unit;
			else if($scope.certificate.organization_unit && temp) {
				iis+='OU='+$scope.certificate.organization_unit;
				temp=true;
			}
			if(temp) {
				if($scope.certificate.algorithm =="ECC")
					iis+=',CN='+$scope.certificate.common_name+'">>csrparams.inf\r\necho KeyAlgorithm="'+$scope.getECCKeysize("iis", $scope.certificate.keysize)+'" >>csrparams.inf\r\necho HashAlgorithm="SHA256" >>csrparams.inf\r\necho KeyLength='+$scope.getECCKeysize("keytool", $scope.certificate.keysize)+' >>csrparams.inf\r\necho KeyUsage=0x08 >>csrparams.inf\r\necho MachineKeySet=TRUE >>csrparams.inf\r\necho Exportable=TRUE >>csrparams.inf\r\necho ProviderName="Microsoft Software Key Storage Provider" >>csrparams.inf\r\necho RequestType=PKCS10 >>csrparams.inf\r\necho Silent=TRUE >>csrparams.inf\r\necho [EnhancedKeyUsageExtension] >>csrparams.inf \r\necho OID=1.3.6.1.5.5.7.3.1 >>csrparams.inf\r\ncertreq -new csrparams.inf '+$scope.getFilename($scope.certificate.common_name)+'.csr';
				else
					iis+=',CN='+$scope.certificate.common_name+'">>csrparams.inf\r\necho KeySpec=1 >>csrparams.inf\r\necho HashAlgorithm="SHA256 >>csrparams.inf\r\necho KeyLength='+$scope.certificate.keysize+' >>csrparams.inf\r\necho Exportable=TRUE >>csrparams.inf\r\necho MachineKeySet=TRUE >>csrparams.inf\r\necho SMIME=False >>csrparams.inf\r\necho PrivateKeyArchive=FALSE >>csrparams.inf\r\necho UserProtected=FALSE >>csrparams.inf\r\necho UseExistingKeySet=FALSE >>csrparams.inf\r\necho ProviderName="Microsoft RSA SChannel Cryptographic Provider" >>csrparams.inf\r\necho ProviderType=12 >>csrparams.inf\r\necho RequestType=PKCS10 >>csrparams.inf\r\necho KeyUsage=0xa0 >>csrparams.inf\r\necho Silent=TRUE >>csrparams.inf\r\necho [EnhancedKeyUsageExtension] >>csrparams.inf \r\necho OID=1.3.6.1.5.5.7.3.1 >>csrparams.inf\r\ncertreq -new csrparams.inf '+$scope.getFilename($scope.certificate.common_name)+'.csr';					
			}
			else {
				if($scope.certificate.algorithm =="ECC")
					iis+='CN='+$scope.certificate.common_name+'">>csrparams.inf\r\necho KeyAlgorithm="'+$scope.getECCKeysize("iis", $scope.certificate.keysize)+'" >>csrparams.inf\r\necho HashAlgorithm="SHA256" >>csrparams.inf\r\necho KeyLength='+$scope.getECCKeysize("keytool", $scope.certificate.keysize)+' >>csrparams.inf\r\necho KeyUsage=0x08 >>csrparams.inf\r\necho MachineKeySet=TRUE >>csrparams.inf\r\necho Exportable=TRUE >>csrparams.inf\r\necho ProviderName="Microsoft Software Key Storage Provider" >>csrparams.inf\r\necho RequestType=PKCS10 >>csrparams.inf\r\necho Silent=TRUE >>csrparams.inf\r\necho [EnhancedKeyUsageExtension] >>csrparams.inf \r\necho OID=1.3.6.1.5.5.7.3.1 >>csrparams.inf\r\ncertreq -new csrparams.inf '+$scope.getFilename($scope.certificate.common_name)+'.csr';
				else
					iis+='CN='+$scope.certificate.common_name+'">>csrparams.inf\r\necho KeySpec=1 >>csrparams.inf\r\necho HashAlgorithm="SHA256 >>csrparams.inf\r\necho KeyLength='+$scope.certificate.keysize+' >>csrparams.inf\r\necho Exportable=TRUE >>csrparams.inf\r\necho MachineKeySet=TRUE >>csrparams.inf\r\necho SMIME=False >>csrparams.inf\r\necho PrivateKeyArchive=FALSE >>csrparams.inf\r\necho UserProtected=FALSE >>csrparams.inf\r\necho UseExistingKeySet=FALSE >>csrparams.inf\r\necho ProviderName="Microsoft RSA SChannel Cryptographic Provider" >>csrparams.inf\r\necho ProviderType=12 >>csrparams.inf\r\necho RequestType=PKCS10 >>csrparams.inf\r\necho KeyUsage=0xa0 >>csrparams.inf\r\necho Silent=TRUE >>csrparams.inf\r\necho [EnhancedKeyUsageExtension] >>csrparams.inf \r\necho OID=1.3.6.1.5.5.7.3.1 >>csrparams.inf\r\ncertreq -new csrparams.inf '+$scope.getFilename($scope.certificate.common_name)+'.csr';
			}
			$scope.messages[5].content=iis;
	    }
	    
	    $scope.make_any = function() {
	    	    var sequence = Promise.resolve();

	            var pkcs10_simpl = new org.pkijs.simpl.PKCS10();
	
	            var publicKey;
	            var privateKey;
	
	            var hash_algorithm;
                    hash_algorithm = "sha-256";

	            var signature_algorithm_name, keylength;
	            switch($scope.certificate.algorithm)
	            {
	                case "RSA":
	                    signature_algorithm_name = "RSASSA-PKCS1-V1_5";
	                    keylength = parseInt($scope.certificate.keysize);
	                    break;
	                case "ECC":
	                    signature_algorithm_name = "ECDSA";
	                    switch($scope.certificate.keysize) {
	                    	case 'secp256r1':
					keylength = "P-256";
					break;
				case 'secp384r1':
					keylength = "P-384";
					break;
				case 'secp521r1':
				 	keylength = "P-521";
				 	break;
	                    }
	                    break;
	                default:;
	            }

	            var crypto = org.pkijs.getCrypto();
 
	            pkcs10_simpl.version = 0;

	            pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.3", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.common_name }) }));
	            if($scope.certificate.country)
	            	pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.6", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.country }) }));
	            if($scope.certificate.organization_unit )
	            	pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.10", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.organization_unit }) }));
	            if($scope.certificate.organization )
	            	pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.11", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.organization }) }));
	            if($scope.certificate.city )
	            	pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.7", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.city }) }));
	            if($scope.certificate.state)
	            	pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({ type: "2.5.4.8", value: new org.pkijs.asn1.UTF8STRING({ value: $scope.certificate.state}) }));
	
	            pkcs10_simpl.attributes = new Array();

	            sequence = sequence.then(
	                function()
	                {
 
				var algorithm = org.pkijs.getAlgorithmParameters(signature_algorithm_name, "generatekey");
                    		if("hash" in algorithm.algorithm)
                        		algorithm.algorithm.hash.name = hash_algorithm;
				
				algorithm.algorithm.modulusLength = keylength;
				
	                    return crypto.generateKey(algorithm.algorithm, true, algorithm.usages);
	                }
	                );

	            sequence = sequence.then(
	                function(keyPair)
	                {
	                    publicKey = keyPair.publicKey;
	                    privateKey = keyPair.privateKey;
	                },
	                function(error)
	                {
	                	$scope.messages[6].content='';
	                }
	                );

	            sequence = sequence.then(
	                function()
	                {
	                    return pkcs10_simpl.subjectPublicKeyInfo.importKey(publicKey);
	                }
	                );

	            sequence = sequence.then(
	                function(result)
	                {
	                    return crypto.digest({ name: "SHA-1" }, pkcs10_simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
	                }
	                ).then(
	                function(result)
	                {
	                    pkcs10_simpl.attributes.push(new org.pkijs.simpl.ATTRIBUTE({
	                        type: "1.2.840.113549.1.9.14", // pkcs-9-at-extensionRequest
	                        values: [(new org.pkijs.simpl.EXTENSIONS({
	                            extensions_array: [
	                                new org.pkijs.simpl.EXTENSION({
	                                    extnID: "2.5.29.14",
	                                    critical: false,
	                                    extnValue: (new org.pkijs.asn1.OCTETSTRING({ value_hex: result })).toBER(false)
	                                })
	                            ]
	                        })).toSchema()]
	                    }));
	                }
	                );

	            sequence = sequence.then(
	                function()
	                {
	                	$scope.messages[6].privateKey = pkcs10_simpl.sign(privateKey, hash_algorithm);
	                    return pkcs10_simpl.sign(privateKey, hash_algorithm);
	                },
	                function(error)
	                {
	                	$scope.messages[6].content = '';

	                }
	                );
	
	            sequence.then(
	                function(result)
	                {
	                    var pkcs10_schema = pkcs10_simpl.toSchema();
	                    var pkcs10_encoded = pkcs10_schema.toBER(false);
	
	                    var result_string = "-----BEGIN CERTIFICATE REQUEST-----\r\n";
	                    result_string = result_string + $scope.formatPEM(window.btoa($scope.arrayBufferToString(pkcs10_encoded)));
	                    result_string = result_string + "\r\n-----END CERTIFICATE REQUEST-----\r\n";
				
				$scope.messages[6].content = result_string;
				$($("md-list-item")[6]).find("pre").html(result_string);
				$("md-progress-linear").hide();
	                },
	                function(error)
	                {
	                	$scope.messages[6].content = '';

	                }
            	            
	           );
	           sequence = sequence.then(
	                function()
	                {
	                    return crypto.exportKey("pkcs8", privateKey);
	                }
	                );

	           sequence.then(
	                function(result)
	                {
	                    var private_key_string = String.fromCharCode.apply(null, new Uint8Array(result));
	
	                    var result_string = "\r\n-----BEGIN PRIVATE KEY-----\r\n";
	                    result_string = result_string + $scope.formatPEM(window.btoa(private_key_string));
	                    result_string = result_string + "\r\n-----END PRIVATE KEY-----";
				
	                    $scope.messages[6].privateKey= result_string;
	                },
	                function(error)
	                {

	                }
	                );
	    }
	    
	    $scope.formatPEM = function(pem_string) {
	    	var string_length = pem_string.length;
	            var result_string = "";
	
	            for(var i = 0, count = 0; i < string_length; i++, count++)
	            {
	                if(count > 63)
	                {
	                    result_string = result_string + "\r\n";
	                    count = 0;
	                }
	
	                result_string = result_string + pem_string[i];
	            }
	
	            return result_string;
	    }
	    
	    $scope.arrayBufferToString = function(buffer)
	        {
	            /// <summary>Create a string from ArrayBuffer</summary>
	            /// <param name="buffer" type="ArrayBuffer">ArrayBuffer to create a string from</param>
	
	            var result_string = "";
	            var view = new Uint8Array(buffer);
	
	            for(var i = 0; i < view.length; i++)
	                result_string = result_string + String.fromCharCode(view[i]);
	
	            return result_string;
	        }
	        //*********************************************************************************
	        $scope.stringToArrayBuffer = function(str)
	        {
	            /// <summary>Create an ArrayBuffer from string</summary>
	            /// <param name="str" type="String">String to create ArrayBuffer from</param>
	
	            var stringLength = str.length;
	
	            var resultBuffer = new ArrayBuffer(stringLength);
	            var resultView = new Uint8Array(resultBuffer);
	
	            for(var i = 0; i < stringLength; i++)
	                resultView[i] = str.charCodeAt(i);
	
	            return resultBuffer;
	        }
	        
	    $scope.getFilename = function(str) {
				if(!str) return '';
				var temp1=str.replace("/","_");		
				var temp2=temp1.replace("\\","_");		
				var temp3=temp2.replace(":","_");
				var temp4=temp3.replace("?","_");		
				var temp5=temp4.replace("<","_");		
				var temp6=temp5.replace(">","_");		
				var temp7=temp6.replace("|","_").replace("*","star");				
				
				return temp7;
		}
		
		$scope.selectToClipboard = function($event, item) {
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
		$scope.copyToClipboard = function($event, item) {
			for(var i = 0; i < 7; i++)
	    			$scope.messages[i].status="Copy";
			item.status="Copied";				
		}
		$scope.download = function($event, item) {
			if($scope.certificate.common_name=="*.example.com")
	    			$scope.certificate.filehostname = "star.example.com";
	    		else
	    			$scope.certificate.filehostname = $scope.certificate.common_name;

			$($event.currentTarget).attr('href','data:application/pkcs8;charset=utf-8;base64,'+encodeURIComponent($scope.messages[6].privateKey)).attr('download', $scope.certificate.filehostname+'.key');
			console.log('data:application/pkcs8;charset=utf-8;base64,'+encodeURIComponent($scope.messages[6].privateKey))

		}
		$scope.hostname_change = function($event) {

			$scope.checkToGenerate();
		}
		$scope.getECCKeysize = function(type, keysize) {
			switch(type) {
				case 'iis':
					switch(keysize) {
						case 'secp256r1':
							return "ECDH_P256";
						case 'secp384r1':
							return "ECDH_P384";
						case 'secp521r1':
						 	return "ECDH_P521";
					}
					return;
				case 'keytool':
					switch(keysize) {
						case 'secp256r1':
							return "256";
						case 'secp384r1':
							return "384";
						case 'secp521r1':
						 	return "521";
					}
					return;
				case 'bigip':
					switch(keysize) {
						case 'secp256r1':
							return "prime256v1";
						case 'secp384r1':
							return "secp384r1";
					}
					return;
			}
		}

		
	}
