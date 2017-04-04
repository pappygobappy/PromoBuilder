import { async, TestBed } from '@angular/core/testing';
import { AppbarUserComponent } from './appbar-user.component';
describe('AppbarUserComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AppbarUserComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AppbarUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/ui/appbar-user/appbar-user.component.spec.js.map