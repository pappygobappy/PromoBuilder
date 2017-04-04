import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarUserComponent } from './appbar-user.component';

describe('AppbarUserComponent', () => {
  let component: AppbarUserComponent;
  let fixture: ComponentFixture<AppbarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppbarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
