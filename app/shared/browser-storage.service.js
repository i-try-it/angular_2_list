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
var XyzBrowserStorageService = (function () {
    function XyzBrowserStorageService() {
    }
    XyzBrowserStorageService.prototype.getSession = function (key) {
        var data = window.sessionStorage.getItem(key);
        return JSON.parse(data);
    };
    XyzBrowserStorageService.prototype.setSession = function (key, value) {
        var data = JSON.stringify(value);
        window.sessionStorage.setItem(key, data);
        return { key: key, value: value };
    };
    XyzBrowserStorageService.prototype.removeSession = function (key) {
        window.sessionStorage.removeItem(key);
        return key;
    };
    XyzBrowserStorageService.prototype.getLocal = function (key) {
        var data = window.localStorage.getItem(key);
        return JSON.parse(data);
    };
    XyzBrowserStorageService.prototype.setLocal = function (key, value) {
        var data = JSON.stringify(value);
        window.localStorage.setItem(key, data);
        return { key: key, value: value };
    };
    XyzBrowserStorageService.prototype.removeLocal = function (key) {
        window.localStorage.removeItem(key);
        return key;
    };
    return XyzBrowserStorageService;
}());
XyzBrowserStorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], XyzBrowserStorageService);
exports.XyzBrowserStorageService = XyzBrowserStorageService;
//# sourceMappingURL=browser-storage.service.js.map