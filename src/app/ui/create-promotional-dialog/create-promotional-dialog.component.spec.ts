import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromotionalDialogComponent } from './create-promotional-dialog.component';

describe('CreatePromotionalDialogComponent', () => {
  let component: CreatePromotionalDialogComponent;
  let fixture: ComponentFixture<CreatePromotionalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePromotionalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePromotionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
