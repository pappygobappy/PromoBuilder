import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalViewComponent } from './promotional-view.component';

describe('PromotionalViewComponent', () => {
  let component: PromotionalViewComponent;
  let fixture: ComponentFixture<PromotionalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
