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
import { AngularFire } from 'angularfire2';
var LogonComponent = (function () {
    function LogonComponent(af) {
        var _this = this;
        this.af = af;
        this.loginEmail = "";
        this.loginPassword = "";
        this.errorMsg = "error";
        this.loggedIn = false;
        this.loading = true;
        this.af.auth.subscribe(function (user) {
            console.log(user);
            _this.loading = false;
            if (user) {
                _this.loggedIn = true;
                console.log(_this.loggedIn);
            }
        });
    }
    LogonComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        //console.log(this.af.auth.getAuth())
        this.af.auth.login()
            .then(function (success) {
            _this.loading = false;
        })
            .catch(function (err) {
            console.log(err);
            _this.errorMsg = err.message;
        });
    };
    LogonComponent.prototype.logout = function () {
        var _this = this;
        //console.log(this.af.auth.getAuth())
        this.af.auth.subscribe(function (auth) {
            console.log(auth);
            if (auth) {
                _this.loggedIn = true;
                console.log(_this.loggedIn);
            }
            else
                _this.loggedIn = false;
        });
        this.af.auth.logout();
    };
    LogonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.af.auth.subscribe(function (user) {
            console.log(user);
            if (user) {
                _this.loggedIn = true;
                console.log(_this.loggedIn);
            }
        });
    };
    return LogonComponent;
}());
LogonComponent = __decorate([
    Component({
        selector: 'app-login-component',
        templateUrl: './logon.component.html',
        styleUrls: ['./logon.component.css']
    }),
    __metadata("design:paramtypes", [AngularFire])
], LogonComponent);
export { LogonComponent };
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/ui/logon/logon.component.js.map