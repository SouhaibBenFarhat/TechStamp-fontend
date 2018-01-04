import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationErrorComponent } from './confirmation-error.component';

describe('ConfirmationErrorComponent', () => {
  let component: ConfirmationErrorComponent;
  let fixture: ComponentFixture<ConfirmationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
