var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var AppbarUserComponent = (function () {
    function AppbarUserComponent() {
        this.loggedIn = false;
    }
    AppbarUserComponent.prototype.ngOnInit = function () {
    };
    AppbarUserComponent.prototype.loginDialog = function () {
        this.loggedIn = true;
    };
    AppbarUserComponent.prototype.logout = function () {
        this.loggedIn = false;
    };
    return AppbarUserComponent;
}());
AppbarUserComponent = __decorate([
    Component({
        selector: 'app-appbar-user',
        templateUrl: './appbar-user.component.html',
        styleUrls: ['./appbar-user.component.css']
    }),
    __metadata("design:paramtypes", [])
], AppbarUserComponent);
export { AppbarUserComponent };
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/ui/appbar-user/appbar-user.component.js.map