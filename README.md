# CSR Helper

***CSR Helper*** is a simple application based on [AngularJS Material](http://material.angularjs.org/) and [PKIjs](https://pkijs.org) that aims to make it easy for users to generate certificate requests (PKCS#10s) for requesting SSL certificates.

You can find this project hosted here: https://csrhelp.peculiarventures.com

### What does it look like?

Below is a snapshot of ***CSR Helper***. It is responsive and works well on mobile and tablet devices.

<br/>

![image](https://cloud.githubusercontent.com/assets/1619279/11449695/55ec4b9e-9534-11e5-9c89-c299ab0e65f5.png)

<br/>

The ***CSR Helper*** application helps users generate a certificate requests for :

*  OpenSSL
*  Exchange (2007 and 2010)
*  Java Keytool
*  F5 Big-IP
*  IIS


It supports both ECC and RSA certificate requests and will use use [WebCrypto](http://www.w3.org/TR/WebCryptoAPI/) and [PKIjs](https://pkijs.org) to directly generate keys and certificate requests if the browser supports it.

## Getting Started

To get you started you can simply clone `master` branch from the
[CSR Help](https://github.com/PeculiarVentures/csrhelp.git) repository and install the dependencies:

Clone the csrhelp repository using git:

```
git clone https://github.com/PeculiarVentures/csrhelp.git
cd csrhelp
```

#### Install Dependencies

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  


## Directory Layout

```
app/                    --> all of the source files for the application
  assets/app.css        --> default stylesheet
  src/           --> all app specific modules
     users/              --> package for user features
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Updating dependencies

You can update the tool dependencies by running:

```
npm update
bower update
```

## Suitability

We believe this is ready for use but it has not undergone third-party review.

## Bug Reporting

Please report bugs either as pull requests or as issues in the issue tracker. Graphene has a full disclosure vulnerability policy. Please do NOT attempt to report any security vulnerability in this code privately to anybody.

## Related

- [angular](http://angularjs.org/)
- [angular material](https://material.angularjs.org/)
- [pkijs](https://pkijs.org)
- [git](http://git-scm.com/)
- [bower](http://bower.io)
- [npm](https://www.npmjs.org/)

