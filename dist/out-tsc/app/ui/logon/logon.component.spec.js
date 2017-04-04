/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { LogonComponent } from './logon.component';
describe('LogonComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LogonComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LogonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/ui/logon/logon.component.spec.js.map