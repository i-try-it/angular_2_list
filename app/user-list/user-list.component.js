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
var filter_by_service_1 = require("../shared/filter-by.service");
var user_list_service_1 = require("./user-list.service");
var XyzUserListComponent = (function () {
    function XyzUserListComponent(xyzUserListService, xyzFilterByService) {
        this.xyzUserListService = xyzUserListService;
        this.xyzFilterByService = xyzFilterByService;
        this.storageKey = 'filter';
    }
    XyzUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var storageValue = window.localStorage.getItem(this.storageKey);
        this.filter = storageValue ? JSON.parse(storageValue) : '';
        this.xyzUserListService.get().then(function (users) {
            if (_this.filter && _this.filter.length) {
                _this.users = _this.xyzFilterByService.get({ data: users, filter: _this.filter });
            }
            else {
                _this.users = users;
            }
            return _this.users;
        });
    };
    XyzUserListComponent.prototype.onFilter = function (filter) {
        var _this = this;
        this.filter = filter;
        var storageValue = JSON.stringify(filter);
        window.localStorage.setItem(this.storageKey, storageValue);
        this.xyzUserListService.get().then(function (users) {
            _this.users = _this.xyzFilterByService.get({ data: users, filter: filter });
        });
    };
    XyzUserListComponent.prototype.onClear = function () {
        var _this = this;
        window.localStorage.removeItem(this.storageKey);
        this.xyzUserListService.get().then(function (users) { return _this.users = users; });
        this.filter = '';
    };
    return XyzUserListComponent;
}());
XyzUserListComponent = __decorate([
    core_1.Component({
        selector: 'xyz-user-list',
        providers: [filter_by_service_1.XyzFilterByService, user_list_service_1.XyzUserListService],
        templateUrl: 'app/user-list/user-list.component.html'
    }),
    __metadata("design:paramtypes", [user_list_service_1.XyzUserListService,
        filter_by_service_1.XyzFilterByService])
], XyzUserListComponent);
exports.XyzUserListComponent = XyzUserListComponent;
//# sourceMappingURL=user-list.component.js.map