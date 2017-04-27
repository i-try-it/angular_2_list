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
var router_1 = require("@angular/router");
var XyzUrlService = (function () {
    function XyzUrlService(router, activatedRoute) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.activatedRoute.url.subscribe(function (url) { return _this.path = url[0].path; });
    }
    XyzUrlService.prototype.get = function (type) {
        return this.activatedRoute[type];
    };
    XyzUrlService.prototype.set = function (type, value) {
        if ('params' === type) {
            return this.router.navigate([this.path, value]);
        }
        if ('queryParams' === type) {
            return this.router.navigate([this.path], { queryParams: value });
        }
        if ('fragment' === type) {
            return this.router.navigate([this.path], { fragment: value });
        }
        return;
    };
    return XyzUrlService;
}());
XyzUrlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute])
], XyzUrlService);
exports.XyzUrlService = XyzUrlService;
//# sourceMappingURL=url.service.js.map