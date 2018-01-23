import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessItemComponent } from './business-item.component';

describe('BusinessItemComponent', () => {
  let component: BusinessItemComponent;
  let fixture: ComponentFixture<BusinessItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
