import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductComponentComponent } from './related-product-component.component';

describe('RelatedProductComponentComponent', () => {
  let component: RelatedProductComponentComponent;
  let fixture: ComponentFixture<RelatedProductComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedProductComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
