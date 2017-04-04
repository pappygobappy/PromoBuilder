import { async, TestBed } from '@angular/core/testing';
import { AppbarComponent } from './appbar.component';
describe('AppbarComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AppbarComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AppbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/ui/appbar/appbar.component.spec.js.map