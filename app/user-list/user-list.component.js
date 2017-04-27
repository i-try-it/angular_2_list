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
var rest_request_service_1 = require("../shared/rest-request.service");
var url_service_1 = require("../shared/url.service");
var user_list_service_1 = require("./user-list.service");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/forkJoin");
var XyzUserListComponent = (function () {
    function XyzUserListComponent(xyzUserListService, xyzFilterByService, xyzRestRequestService, xyzUrlService) {
        this.xyzUserListService = xyzUserListService;
        this.xyzFilterByService = xyzFilterByService;
        this.xyzRestRequestService = xyzRestRequestService;
        this.xyzUrlService = xyzUrlService;
        this.storageKey = 'filter';
        this.subject = new Subject_1.Subject();
    }
    XyzUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.xyzUrlService.set('fragment', 'foobarbaz').then(function (response) { return console.log('set ', response); });
        this.xyzUrlService.get('fragment').subscribe(function (response) {
            console.log('get ', response);
        });
        // updating the UI only after all our REST requests return data
        Observable_1.Observable.forkJoin(this.xyzRestRequestService.getSettings(), this.xyzRestRequestService.getLocations()).subscribe(function (response) {
            var settings = response[0].json();
            var locations = response[1].json();
            _this.regions = (locations.regions && locations.regions.length) ? locations.regions : [];
            _this.revision = settings._rev;
            _this.filter = (settings.filter && settings.filter.length) ? settings.filter : '';
            _this.xyzUserListService.get().then(function (users) {
                if (_this.filter && _this.filter.length) {
                    _this.users = _this.xyzFilterByService.get({ data: users, filter: _this.filter });
                }
                else {
                    _this.users = users;
                }
                return _this.users;
            });
        });
        this.subject
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(function (response) {
            _this.onFilter(response);
        });
    };
    XyzUserListComponent.prototype.onFilter = function (filter) {
        var _this = this;
        this.filter = filter;
        var filterParams = {};
        filterParams[this.storageKey] = this.filter;
        this.xyzRestRequestService.setSettings({
            _rev: this.revision,
            filter: this.filter
        }).subscribe(function (response) {
            var settings = response.json();
            _this.revision = settings.rev;
        });
        this.xyzUserListService.get().then(function (users) {
            _this.users = _this.xyzFilterByService.get({ data: users, filter: filter });
        });
    };
    XyzUserListComponent.prototype.onClear = function () {
        var _this = this;
        this.xyzUserListService.get().then(function (users) { return _this.users = users; });
        this.filter = '';
        this.xyzRestRequestService.setSettings({
            _rev: this.revision,
            filter: ''
        }).subscribe(function (response) {
            var settings = response.json();
            _this.revision = settings.rev;
        });
    };
    return XyzUserListComponent;
}());
XyzUserListComponent = __decorate([
    core_1.Component({
        selector: 'xyz-user-list',
        providers: [filter_by_service_1.XyzFilterByService, user_list_service_1.XyzUserListService, rest_request_service_1.XyzRestRequestService, url_service_1.XyzUrlService],
        templateUrl: 'app/user-list/user-list.component.html'
    }),
    __metadata("design:paramtypes", [user_list_service_1.XyzUserListService,
        filter_by_service_1.XyzFilterByService,
        rest_request_service_1.XyzRestRequestService,
        url_service_1.XyzUrlService])
], XyzUserListComponent);
exports.XyzUserListComponent = XyzUserListComponent;
//# sourceMappingURL=user-list.component.js.map