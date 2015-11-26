# CSR Helper

***CSR Helper*** is a simple application based on [AngularJS Material](http://material.angularjs.org/) and [PKIjs](https://pkijs.org) that aims to make it easy for users to generate certificate requests (PKCS#10s) for requesting SSL certificates.

### What does it look like?

Below is a snapshot of the CSR Help page, the page is responsive and works well on mobile and tablet devices.

<br/>

-> Insert picture when complete <-

<br/>

The ***CSR Helper*** application helps users generate a certificate requests for :

*  OpenSSL
*  Exchange (2007 and 2010)
*  Java Keytool
*  F5 Big-IP
*  IIS

It also uses [PKIjs](https://pkijs.org) to directly generate keys and certificate requests using [WebCrypto](http://www.w3.org/TR/WebCryptoAPI/).


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


## Related

[angular](http://angularjs.org/)
[angular material](https://material.angularjs.org/)
[pkijs](https://pkijs.org)
[git](http://git-scm.com/)
[bower](http://bower.io)
[npm](https://www.npmjs.org/)

