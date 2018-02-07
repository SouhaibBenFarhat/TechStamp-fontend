import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestComponentComponent } from './latest-component.component';

describe('LatestComponentComponent', () => {
  let component: LatestComponentComponent;
  let fixture: ComponentFixture<LatestComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
