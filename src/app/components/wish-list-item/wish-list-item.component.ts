import { Component, OnInit, Input } from '@angular/core';
import { WishList } from "../../models/wishList";
import { Product } from '../../models/product';
import { ProductService } from "../../services/product-service/product.service";


@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {

  @Input() wish: WishList;
  product: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductById(this.wish.productId).then((data) => {
      this.product = data;
    })
  }

}
