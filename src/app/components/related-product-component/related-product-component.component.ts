import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-related-product-component',
  templateUrl: './related-product-component.component.html',
  styleUrls: ['./related-product-component.component.css']
})
export class RelatedProductComponentComponent implements OnInit {

  @Input() relatedProduct: Product;

  constructor() { }

  ngOnInit() {
  }

}
