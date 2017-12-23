import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponentComponent } from './product-item-component.component';

describe('ProductItemComponentComponent', () => {
  let component: ProductItemComponentComponent;
  let fixture: ComponentFixture<ProductItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
