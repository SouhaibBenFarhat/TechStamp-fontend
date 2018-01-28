import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGeneralSettingsComponent } from './business-general-settings.component';

describe('BusinessGeneralSettingsComponent', () => {
  let component: BusinessGeneralSettingsComponent;
  let fixture: ComponentFixture<BusinessGeneralSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessGeneralSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessGeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
