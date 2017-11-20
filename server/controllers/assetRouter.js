var express = require('express');
var router = express.Router();
var PxServiceController = require('./pxServiceController');
var rp = require('request-promise');
var fs = require('fs');
var path = require('path');

var AssetController = class extends PxServiceController {
    constructor(service, config) {
        super(config.uaa.uri, config.asset.credentials, config.asset.uri, config.asset.zoneId);
    }

    get(req, res, next) {
        var _self = this;
        req.query.path = '/asset';
        _self.read(req, res, next).then(rtn => { 
            res.json(Models.PxaResults.ok(rtn));
        }).catch(err => {
            res.status(err.statusCode).json(err.results);
        });
    }

    write(req, res) {
        var _self = this;
        var path = req.baseUrl || '/asset';
        path += (req.url.length > 1) ? req.url : '';
        var data = req.body;

        if (req.url.length > 1) {
            _self.update(req, res, path).then(rtn => {
                res.status(200).json(Models.PxaResults.ok(rtn));
            }).catch(err => {
                res.status(err.statusCode).json(err.results);
            });;
        }
        else {
            _self.create(req, res, path).then(rtn => {
                res.status(200).json(Models.PxaResults.ok(rtn));
            }).catch(err => {
                res.status(err.statusCode).json(err.results);
            });
        }
    }
};

var routerMain = function (obj) {
    var controller = new AssetController(null, obj);

    router.route('/')
        .get(controller.get.bind(controller));

    router.route('/')
        .post(controller.write.bind(controller));


    return router;
};

module.exports = routerMain;
