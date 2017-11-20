var express = require('express');
var router = express.Router();
var TokenClientController = require('./tokenClientController');
var rp = require('request-promise');
var fs = require('fs');
var path = require('path');
var Uuid = require('uuid/v4');

var PxServiceController = class extends TokenClientController {
    constructor(uaauri, credentials, svcuri, svczone) {
        super(uaauri, credentials);

        this.svcUri = svcuri;
        this.svcZone = svczone;
    }

    read(req, res, next) { // <-- ...(1)
        var _self = this;
        var path = req.query.path || '';
        return _self.getRequest(_self.svcUri + path, _self.svcZone); // <-- ...then the method 'getRequest' is invoked on the
                                                                     //     token controller (2 cont)
    }

    create(req, res, path) {
        var _self = this;
        var _path = path || ''; 
        var data = (Array.isArray(req.body)) ? req.body : [req.body];
        return _self.postRequest(_self.svcUri + _path, data, _self.svcZone);
    }

    update(req, res, path) {
        var _self = this;
        var _path = path || ''; 
        var data = (Array.isArray(req.body)) ? req.body : [req.body];
        return _self.putRequest(_self.svcUri + _path, data, _self.svcZone);
    }

    delete(req, res, path) {
        var _self = this;
        var _path = path || ''; 
        return _self.deleteRequest(_self.svcUri + _path, null, _self.svcZone);
    }

    uuid(req, res, next) {
        var _self = this;
        res.json(Models.PxaResults.ok(Uuid()));
    }
};

module.exports = PxServiceController;
