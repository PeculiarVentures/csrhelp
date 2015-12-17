(function() {
    'use strict';

    angular
        .module('csrhelps')
        .factory('csrhelpService', ['$q', '$timeout', CsrhelpService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function CsrhelpService($q) {
        // Promise-based API

        return {
            make_openssl: make_openssl,
            make_exchange2007: make_exchange2007,
            make_exchange2010: make_exchange2010,
            make_keytool: make_keytool,
            make_bigip: make_bigip,
            make_iis: make_iis,
            make_any: make_any
        };

        function make_openssl(certf, context) {
            var openssl = 'openssl req -new -newkey rsa:' + certf.keysize +
                ' -sha256 -nodes -out ' + getFilename(certf.hostname) +
                '.csr -keyout ' + getFilename(certf.hostname) +
                '.key -subj "';

            if (certf.algorithm == "ECC")
                openssl = 'openssl ecparam -name ' +
                certf.keysize + ' -genkey -noout -out ' +
                getFilename(certf.hostname) +
                '.key && openssl req -new -out ' +
                getFilename(certf.hostname) + '.csr -key ' +
                getFilename(certf.hostname) + '.key -sha256 -subj "';

            if (certf.country)
                openssl += '/C=' + certf.country;

            if (certf.state)
                openssl += '/ST=' + certf.state;

            if (certf.city)
                openssl += '/L=' + certf.city;

            if (certf.organization)
                openssl += '/O=' + certf.organization;

            if (certf.organization_unit)
                openssl += '/OU=' + certf.organization_unit

            openssl += '/CN=' + certf.hostname + '"';

            //$scope.messages[0].content = openssl;
            context.content = openssl;
            return context;
            //return $q.when(openssl);
        }

        function make_exchange2007(certf, context) {
            var exchange = 'New-ExchangeCertificate -GenerateRequest -Path .\\' + getFilename(certf.hostname) +
                '.csr -KeySize ' + certf.keysize + ' -SubjectName "';
            var temp = false;

            if (certf.country) {
                exchange += 'c=' + certf.country;
                temp = true;
            }

            if (certf.state && temp)
                exchange += ',st=' + certf.state;
            else if (certf.state && !temp) {
                exchange += 'st=' + certf.state;
                temp = true;
            }

            if (certf.city && temp)
                exchange += ',l=' + certf.city;
            else if (certf.city && !temp) {
                exchange += 'l=' + certf.city;
                temp = true;
            }

            if (certf.organization && temp)
                exchange += ',o=' + certf.organization;
            else if (certf.organization && !temp) {
                exchange += 'o=' + certf.organization;
                temp = true;
            }

            if (certf.organization_unit && temp)
                exchange += ',ou=' + certf.organization_unit;
            else if (certf.organization_unit && !temp) {
                exchange += 'ou=' + certf.organization_unit;
                temp = true;
            }

            if (temp)
                exchange += ',cn=' + certf.hostname + '" ';
            else
                exchange += 'cn=' + certf.hostname + '" ';

            exchange += '-PrivateKeyExportable $True';

            context.content = exchange;
            return true;
            //return $q.when(exchange);
        }

        function make_exchange2010(certf, context) {
            var exchange = 'Set-Content -path ".\\' + getFilename(certf.hostname) +
                '.csr" -Value (New-ExchangeCertificate -GenerateRequest -KeySize ' + certf.keysize +
                ' -SubjectName "';
            var temp = false;

            if (certf.country) {
                exchange += 'c=' + certf.country;
                temp = true;
            }

            if (certf.state && temp)
                exchange += ',st=' + certf.state;
            else if (certf.state && !temp) {
                exchange += 'st=' + certf.state;
                temp = true;
            }

            if (certf.city && temp)
                exchange += ',l=' + certf.city;
            else if (certf.city && !temp) {
                exchange += 'l=' + certf.city;
                temp = true;
            }

            if (certf.organization && temp)
                exchange += ',o=' + certf.organization;
            else if (certf.organization && !temp) {
                exchange += 'o=' + certf.organization;
                temp = true;
            }

            if (certf.organization_unit && temp)
                exchange += ',ou=' + certf.organization_unit;
            else if (certf.organization_unit && !temp) {
                exchange += 'ou=' + certf.organization_unit;
                temp = true;
            }

            if (temp)
                exchange += ',cn=' + certf.hostname + '" ';
            else
                exchange += 'cn=' + certf.hostname + '" ';

            exchange += '-PrivateKeyExportable $True';

            //$scope.messages[2].content=exchange;
            context.content = exchange;
            return context;
            //return $q.when(exchange);
        }

        function make_keytool(certf, context) {
            var keytool = 'keytool -genkeypair -alias server -keyalg ' + certf.algorithm +
                ' -sigalg SHA256withRSA -keysize ' + certf.keysize +
                ' -keystore ' + getFilename(certf.hostname) + '.jks -dname "';
            var temp = false;

            if (certf.algorithm == "ECC")
                keytool = 'keytool -genkeypair -alias server -keyalg ' + certf.algorithm +
                ' -sigalg SHA256withECDSA -keysize ' + getECCKeysize('keytool', certf.keysize) +
                ' -keystore ' + getFilename(certf.hostname) + '.jks -dname "';

            if (certf.country) {
                keytool += 'C=' + certf.country;
                temp = true;
            }

            if (certf.state && temp)
                keytool += ',ST=' + certf.state;
            else if (certf.state && !temp) {
                keytool += 'ST=' + certf.state;
                temp = true;
            }

            if (certf.city && temp)
                keytool += ',L=' + certf.city;
            else if (certf.city && !temp) {
                keytool += 'L=' + certf.city;
                temp = true;
            }

            if (certf.organization && temp)
                keytool += ',O=' + certf.organization;
            else if (certf.organization && !temp) {
                keytool += 'O=' + certf.organization;
                temp = true;
            }

            if (certf.organization_unit && temp)
                keytool += ',OU=' + certf.organization_unit;
            else if (certf.organization_unit && !temp) {
                keytool += 'OU=' + certf.organization_unit;
                temp = true;
            }

            if (temp)
                keytool += ',CN=' + certf.hostname + '" ';
            else
                keytool += 'CN=' + certf.hostname + '" ';

            keytool += '&& keytool -certreq -alias server ' +
                '-file ' + getFilename(certf.hostname) + '.csr ' +
                '-keystore ' + getFilename(certf.hostname) + '.jks';

            context.content = keytool;
            return context;
        }

        function make_bigip(certf, context) {
            var bigip = 'create sys crypto key ' + certf.hostname + ' key-size ' + certf.keysize + ' gen-csr';

            if (certf.algorithm == "ECC" && certf.keysize == "secp521r1")
                return $q.when(false);

            if (certf.algorithm == "ECC")
                bigip = 'create sys crypto key ' + getFilename(certf.hostname) +
                ' key-type ec-private curve-name ' + getECCKeysize('bigip', certf.keysize) +
                ' gen-csr';

            if (certf.country)
                bigip += ' country "' + certf.country + '"';

            if (certf.state)
                bigip += ' state "' + certf.state + '"';

            if (certf.city)
                bigip += ' city "' + certf.city + '"';

            if (certf.organization)
                bigip += ' organization "' + certf.organization + '"';

            if (certf.organization_unit)
                bigip += ' ou "' + certf.organization_unit + '"';

            bigip += ' common-name "' + certf.hostname + '"';

            context.content = bigip;
            return context;
        }

        function make_iis(certf, context) {
            var iis = 'echo [NewRequest] >csrparams.inf\r\necho Subject="';
            var temp = false;

            if (certf.country) {
                iis += 'C=' + certf.country;
                temp = true;
            }

            if (certf.state && temp)
                iis += ',ST=' + certf.state;
            else if (certf.state && !temp) {
                iis += 'ST=' + certf.state;
                temp = true;
            }

            if (certf.city && temp)
                iis += ',L=' + certf.city;
            else if (certf.city && !temp) {
                iis += 'L=' + certf.city;
                temp = true;
            }

            if (certf.organization && temp)
                iis += ',O=' + certf.organization;
            else if (certf.organization && !temp) {
                iis += 'O=' + certf.organization;
                temp = true;
            }

            if (certf.organization_unit && temp)
                iis += ',OU=' + certf.organization_unit;
            else if (certf.organization_unit && !temp) {
                iis += 'OU=' + certf.organization_unit;
                temp = true;
            }

            if (temp)
                iis += ',CN=' + certf.hostname + '">>csrparams.inf\r\n';
            else
                iis += 'CN=' + certf.hostname + '">>csrparams.inf\r\n';

            if (certf.algorithm == "ECC")
                iis += 'echo KeyAlgorithm="' + getECCKeysize("iis", certf.keysize) + '" >>csrparams.inf\r\n' +
                    'echo KeyLength=' + getECCKeysize("keytool", certf.keysize) + ' >>csrparams.inf\r\n';
            else
                iis += 'echo KeySpec=1 >>csrparams.inf\r\n' +
                    'echo KeyLength=' + certf.keysize + ' >>csrparams.inf\r\n';

            iis += 'echo HashAlgorithm="SHA256" >>csrparams.inf\r\n' +
                'echo Exportable=TRUE >>csrparams.inf\r\n' +
                'echo MachineKeySet=TRUE >>csrparams.inf\r\n' +
                'echo Silent=TRUE >>csrparams.inf\r\n';

            if (certf.algorithm == "ECC")
                iis += 'echo KeyUsage=0x08 >>csrparams.inf\r\n' +
                'echo ProviderName="Microsoft Software Key Storage Provider" >>csrparams.inf\r\n';
            else
                iis += 'echo KeyUsage=0xa0 >>csrparams.inf\r\n' +
                'echo SMIME=False >>csrparams.inf\r\n' +
                'echo PrivateKeyArchive=FALSE >>csrparams.inf\r\n' +
                'echo UserProtected=FALSE >>csrparams.inf\r\n' +
                'echo UseExistingKeySet=FALSE >>csrparams.inf\r\n' +
                'echo ProviderName="Microsoft RSA SChannel Cryptographic Provider" >>csrparams.inf\r\n' +
                'echo ProviderType=12 >>csrparams.inf\r\n';

            iis += 'echo RequestType=PKCS10 >>csrparams.inf\r\n' +
                'echo [EnhancedKeyUsageExtension] >>csrparams.inf \r\n' +
                'echo OID=1.3.6.1.5.5.7.3.1 >>csrparams.inf\r\n' +
                'certreq -new csrparams.inf ' + getFilename(certf.hostname) + '.csr';

            context.content = iis;
            return context;
        }

        function make_any(certf, context) {
            var deferred = $q.defer();

            // #region Get a "crypto" extension
            var crypto = org.pkijs.getCrypto();
            if (typeof crypto == "undefined") {
                $scope.bWebcrypto = false;
                context.content = '';
                $timeout(function() {
                    deferred.reject('No WebCrypto extension found');
                }, 0);
                return deferred.promise;
            }
            // #endregion

            // #region Prepare P10
            context = context || {};
            var sequence = Promise.resolve();
            var pkcs10_simpl = new org.pkijs.simpl.PKCS10();
            var publicKey;
            var privateKey;
            var hash_algorithm;
            hash_algorithm = "sha-256";

            var signature_algorithm_name, keylength;
            switch (certf.algorithm) {
                case "RSA":
                    signature_algorithm_name = "RSASSA-PKCS1-V1_5";
                    keylength = parseInt(certf.keysize);
                    break;
                case "ECC":
                    signature_algorithm_name = "ECDSA";
                    switch (certf.keysize) {
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
                default:
                    ;
            }
            // #endregion

            // #region Put a static values
            pkcs10_simpl.version = 0;

            if (certf.country)
                pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                    type: "2.5.4.6",
                    value: new org.pkijs.asn1.PRINTABLESTRING({
                        value: certf.country
                    })
                }));

            if (certf.state)
                pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                    type: "2.5.4.8",
                    value: new org.pkijs.asn1.UTF8STRING({
                        value: certf.state
                    })
                }));

            if (certf.city)
                pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                    type: "2.5.4.7",
                    value: new org.pkijs.asn1.UTF8STRING({
                        value: certf.city
                    })
                }));

            if (certf.organization)
                pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                    type: "2.5.4.11",
                    value: new org.pkijs.asn1.UTF8STRING({
                        value: certf.organization
                    })
                }));

            if (certf.organization_unit)
                pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                    type: "2.5.4.10",
                    value: new org.pkijs.asn1.UTF8STRING({
                        value: certf.organization_unit
                    })
                }));

            pkcs10_simpl.subject.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
                type: "2.5.4.3",
                value: new org.pkijs.asn1.UTF8STRING({
                    value: certf.hostname
                })
            }));

            pkcs10_simpl.attributes = [];
            // #endregion

            // #region Create a new key pair
            sequence = sequence.then(function() {
                // Set hash algorithm
                var algorithm = org.pkijs.getAlgorithmParameters(signature_algorithm_name, "generatekey");
                if ("hash" in algorithm.algorithm)
                    algorithm.algorithm.hash.name = hash_algorithm;
                // #endregion

                // Set key length
                switch (certf.algorithm) {
                    case "RSA":
                        algorithm.algorithm.modulusLength = keylength;
                        break;
                    case "ECC":
                        algorithm.algorithm.namedCurve = keylength;
                        break;
                }

                return crypto.generateKey(algorithm.algorithm, true, algorithm.usages);
            });
            // #endregion

            // #region Store new key in an interim variables
            sequence = sequence.then(function(keyPair) {
                publicKey = keyPair.publicKey;
                privateKey = keyPair.privateKey;
            }, function(error) {
                context.content = '';
                //alert("Error during key generation: " + error);
                deferred.reject("Error during key generation: " + error);
            });
            // #endregion

            // #region Exporting public key into "subjectPublicKeyInfo" value of PKCS#10
            sequence = sequence.then(function() {
                return pkcs10_simpl.subjectPublicKeyInfo.importKey(publicKey);
            });
            // #endregion

            // #region SubjectKeyIdentifier
            sequence = sequence.then(function(result) {
                return crypto.digest({
                    name: "SHA-1"
                }, pkcs10_simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
            }).then(function(result) {
                pkcs10_simpl.attributes.push(new org.pkijs.simpl.ATTRIBUTE({
                    type: "1.2.840.113549.1.9.14", // pkcs-9-at-extensionRequest
                    values: [(new org.pkijs.simpl.EXTENSIONS({
                        extensions_array: [
                            new org.pkijs.simpl.EXTENSION({
                                extnID: "2.5.29.14",
                                critical: false,
                                extnValue: (new org.pkijs.asn1.OCTETSTRING({
                                    value_hex: result
                                })).toBER(false)
                            })
                        ]
                    })).toSchema()]
                }));
            });
            // #endregion

            // #region Signing final PKCS#10 request
            sequence = sequence.then(function() {
                context.privateKey = pkcs10_simpl.sign(privateKey, hash_algorithm);
                return pkcs10_simpl.sign(privateKey, hash_algorithm);
            }, function(error) {
                context.content = '';
                //alert("Error during exporting public key: " + error);
                deferred.reject("Error during exporting public key: " + error);
            });
            // #endregion

            sequence.then(function(result) {
                var pkcs10_schema = pkcs10_simpl.toSchema();
                var pkcs10_encoded = pkcs10_schema.toBER(false);

                var result_string = "-----BEGIN CERTIFICATE REQUEST-----\r\n";
                result_string = result_string + formatPEM(window.btoa(arrayBufferToString(pkcs10_encoded)));
                result_string = result_string + "\r\n-----END CERTIFICATE REQUEST-----\r\n";
                context.content = result_string;
                $($("md-list-item")[6]).find("pre").html(result_string);
                $("md-progress-linear").hide();
                //document.getElementById("pem-text-block").value = result_string;
            }, function(error) {
                context.content = '';
                //alert("Error signing PKCS#10: " + error);
                deferred.reject("Error signing PKCS#10: " + error);
            });
            // #region Exporting pri'vate key
            sequence = sequence.then(function() {
                return crypto.exportKey("pkcs8", privateKey);
            });
            // #endregion
            sequence.then(function(result) {
                var private_key_string = String.fromCharCode.apply(null, new Uint8Array(result));
                var result_string = "\r\n-----BEGIN PRIVATE KEY-----\r\n";
                result_string = result_string + formatPEM(window.btoa(private_key_string));
                result_string = result_string + "\r\n-----END PRIVATE KEY-----";
                context.privateKey = result_string;
                deferred.resolve(context.content);
            }, function(error) {
                //alert("Error during exporting of private key: " + error);
                context.content = '';
                deferred.reject("Error during exporting of private key: " + error);
                context.support = false;
            });

            return deferred.promise;
        }

        function formatPEM(pem_string) {
            var string_length = pem_string.length;
            var result_string = "";

            for (var i = 0, count = 0; i < string_length; i++, count++) {
                if (count > 63) {
                    result_string = result_string + "\r\n";
                    count = 0;
                }

                result_string = result_string + pem_string[i];
            }

            return result_string;
        }

        function arrayBufferToString(buffer) {
            /// <summary>Create a string from ArrayBuffer</summary>
            /// <param name="buffer" type="ArrayBuffer">ArrayBuffer to create a string from</param>

            var result_string = "";
            var view = new Uint8Array(buffer);

            for (var i = 0; i < view.length; i++) {
                result_string = result_string + String.fromCharCode(view[i]);
            }

            return result_string;
        }

        function stringToArrayBuffer(str) {
            /// <summary>Create an ArrayBuffer from string</summary>
            /// <param name="str" type="String">String to create ArrayBuffer from</param>

            var stringLength = str.length;

            var resultBuffer = new ArrayBuffer(stringLength);
            var resultView = new Uint8Array(resultBuffer);

            for (var i = 0; i < stringLength; i++)
                resultView[i] = str.charCodeAt(i);

            return resultBuffer;
        }

        function getFilename(str) {
            if (!str) return '';
            var temp1 = str.replace("/", "_");
            var temp2 = temp1.replace("\\", "_");
            var temp3 = temp2.replace(":", "_");
            var temp4 = temp3.replace("?", "_");
            var temp5 = temp4.replace("<", "_");
            var temp6 = temp5.replace(">", "_");
            var temp7 = temp6.replace("|", "_").replace("*", "star");

            return temp7;
        }

        function getECCKeysize(type, keysize) {
            switch (type) {
                case 'iis':
                    switch (keysize) {
                        case 'secp256r1':
                            return "ECDH_P256";
                        case 'secp384r1':
                            return "ECDH_P384";
                        case 'secp521r1':
                            return "ECDH_P521";
                    }
                    return;
                case 'keytool':
                    switch (keysize) {
                        case 'secp256r1':
                            return "256";
                        case 'secp384r1':
                            return "384";
                        case 'secp521r1':
                            return "521";
                    }
                    return;
                case 'bigip':
                    switch (keysize) {
                        case 'secp256r1':
                            return "prime256v1";
                        case 'secp384r1':
                            return "secp384r1";
                    }
                    return;
            }
        }

    }

})();
