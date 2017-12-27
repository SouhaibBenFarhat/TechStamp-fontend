import { Component, OnInit, Input } from '@angular/core';
import { WishListService } from "../../services/wish-list-service/wish-list.service";
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item-component',
  templateUrl: './product-item-component.component.html',
  styleUrls: ['./product-item-component.component.css']
})
export class ProductItemComponentComponent implements OnInit {

  @Input() product: Product;
  constructor(private wishListService: WishListService) { }

  ngOnInit() {
  }

  addToWishList() {
    this.wishListService.addToWishList(this.product.id).then((data) => {

    });
  }

}
