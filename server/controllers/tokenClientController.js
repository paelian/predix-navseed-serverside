var express = require('express');
var router = express.Router();
var BaseController = require('./baseController');
var rp = require('request-promise');

var TokenClientController = class extends BaseController {
    constructor(uaauri, credentials) {
        super();

        this.UAAUri = uaauri;
        this.Cred = credentials;
        this.lastToken = null;
    }

    refreshToken() {
        var _self = this;
        var options = {
            uri: this.UAAUri + '/oauth/token',
            qs: {
                grant_type: 'client_credentials'
            },
            headers: {
                "Authorization": "Basic " + _self.Cred
            },
            json: true
        };

        return new Promise((resolve, reject) => {
            if (_self.UAAUri.length === 0) {
                resolve('');
                return;
            }
            if (this.lastToken != null) {
                if (Date.now() < (this.lastToken.expires_in * 1000 + this.lastToken.retrieved_on.getTime())) {
                    resolve(this.lastToken.access_token);
                    return;
                }
            }

            var timestamp = new Date();
            rp(options).then(data => {
                this.lastToken = data;
                this.lastToken.retrieved_on = timestamp;
                resolve(this.lastToken.access_token);
            }).catch(err => {
                reject(err);
            });

        });

    }
    getRequest(url, zoneId) { // <-- ...(2). This method uses teh cf.json config to either request a new token via 'refreshToken',
                              //        or re-uses the last token if not expired. The method then constructs the primary GET
                              //        request and returns the async request via promise down the callstack (3 cont)
        return new Promise((resolve, reject) => {
            this.refreshToken().then(token => {
                var options = {
                    uri: url,
                    headers: {
                        "Content-Type": "application/json;;charSet=utf-8"
                    },
                    json: true
                };
                if (typeof zoneId === 'string') {
                    options.headers["Predix-Zone-Id"] = zoneId;
                }
                if (token !== '') {
                    options.headers.Authorization = "bearer " + token;
                }
                rp(options).then(rtn => {
                    resolve(rtn);
                })
                .catch(err => {
                    reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
                    // reject(err);
                });
            }).catch(err => {
                reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
            });
        });
    }

    postRequest(url, data, zoneId) {
        return new Promise((resolve, reject) => {
            this.refreshToken().then(token => {
                var options = {
                    method: 'POST',
                    uri: url,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: data,
                    json: true
                };
                if (typeof zoneId === 'string') {
                    options.headers["Predix-Zone-Id"] = zoneId;
                }
                if (token !== '') {
                    options.headers.Authorization = "bearer " + token;
                }
                rp(options).then(rtn => {
                    resolve(rtn);
                })
                .catch(err => {
                    reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
                    // reject(err);
                });
            }).catch(err => {
                reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
            });
        });
    }

    putRequest(url, data, zoneId) {
        return new Promise((resolve, reject) => {
            this.refreshToken().then(token => {
                var options = {
                    method: 'PUT',
                    uri: url,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: data,
                    json: true
                };
                if (typeof zoneId === 'string') {
                    options.headers["Predix-Zone-Id"] = zoneId;
                }
                if (token !== '') {
                    options.headers.Authorization = "bearer " + token;
                }
                rp(options).then(rtn => {
                    resolve(rtn);
                })
                .catch(err => {
                    reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
                    // reject(err);
                });
            }).catch(err => {
                reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
            });
        });
    }

    deleteRequest(url, data, zoneId) {
        return new Promise((resolve, reject) => {
            this.refreshToken().then(token => {
                var options = {
                    method: 'DELETE',
                    uri: url,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                };
                if (typeof zoneId === 'string') {
                    options.headers["Predix-Zone-Id"] = zoneId;
                }
                if (token !== '') {
                    options.headers.Authorization = "bearer " + token;
                }
                rp(options).then(rtn => {
                    resolve(rtn);
                })
                .catch(err => {
                    reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
                    // reject(err);
                });
            }).catch(err => {
                reject({ statusCode: err.statusCode, results: Models.PxaResults.err(err.error.error_description, err) });
            });
        });
    }


};

module.exports = TokenClientController;
