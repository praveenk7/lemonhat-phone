"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TwilioService = /** @class */ (function () {
    function TwilioService(http) {
        this.http = http;
        this.baseURL = "http://192.168.2.48:8080";
        this.obj = {};
    }
    TwilioService.prototype.getToken = function (identity, endpointId) {
        //request('/getToken?identity=' + identity + '&endpointId=' + endpointId, function(err, res) {
        //return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        return this.http.get(this.baseURL + '/getToken?identity=' + identity + '&endpointId=' + endpointId).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.getPhoneVerificationToken = function (phoneNumber, countryCode) {
        var postObj = { "phone": phoneNumber, "countryCode": countryCode };
        return this.http.post(this.baseURL + '/phoneVerification', postObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.verifyPhoneToken = function (otp, userObj) {
        var postObj = { "verificationToken": otp, "phone": userObj.phone, "countryCode": userObj.countryCode };
        return this.http.post(this.baseURL + '/verifyOTP', postObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.setTwilioClient = function (clientObj) {
        this.client = clientObj;
    };
    TwilioService.prototype.getTwilioClient = function () {
        return this.client;
    };
    TwilioService.prototype.getUserDetails = function (ids) {
        var requestObj = { "ids": ids };
        return this.http.post(this.baseURL + '/user', requestObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.updateUserDetails = function (user) {
        //this.obj["id"] = user.id;
        //this.obj.userName = user.others.userName;
        //this.obj.email = user.others.email;
        //this.obj.phone = user.others.phone;
        //this.obj.countryCode = user.others.countryCode;
        return this.http.post(this.baseURL + '/updateUser', user).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.createItemsList = function (listName, uid) {
        var requestObj = { "uid": uid, "listName": listName, "channelType": "private" };
        return this.http.post(this.baseURL + '/createItemsList', requestObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.getitemslist = function (uid) {
        return this.http.post(this.baseURL + '/itemslist', { "uid": uid }).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.getitems = function (itemsList) {
        return this.http.post(this.baseURL + '/items', { "itemsList": itemsList }).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.createItem = function (itemsList, uid, itemName) {
        var requestObj = { "uid": uid, "itemName": itemName, itemsList: itemsList, "imageUrl": "" };
        return this.http.post(this.baseURL + '/createItem', requestObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.getAllUser = function () {
        return this.http.get(this.baseURL + '/allUsers').map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.shareListtoUsers = function (itemsList, sharedUsers, tChannelId) {
        var requestObj = { "itemsList": itemsList, "sharedUsers": sharedUsers, "tChannelId": tChannelId };
        return this.http.post(this.baseURL + '/shareList', requestObj).map(function (response) {
            return response;
        });
    };
    TwilioService.prototype.sendMessagetoChannel = function () {
        return this.http.post(this.baseURL + '/sendMessage', {}).map(function (response) {
            return response;
        });
    };
    TwilioService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TwilioService);
    return TwilioService;
}());
exports.TwilioService = TwilioService;
//# sourceMappingURL=twilio.service.js.map