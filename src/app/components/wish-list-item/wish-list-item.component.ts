import { Component, OnInit, Input } from '@angular/core';
import { WishList } from "../../models/wishList";
import { Product } from '../../models/product';
import { ProductService } from "../../services/product-service/product.service";
import { WishListService } from "../../services/wish-list-service/wish-list.service";


@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {

  @Input() wish: WishList;
  product: Product = new Product();

  constructor(private productService: ProductService, private wishListService: WishListService) { }

  ngOnInit() {
    this.productService.getProductById(this.wish.productId).then((data) => {
      this.product = data;
    })
  }

  removeFromWishList() {
    this.wishListService.deleteFromWishList(this.product.id, this.wish.id).then(() => {
      this.wishListService.onWishListChange.emit(0);
    }).catch((err) => {
      console.log(err);
    })
  }

}
