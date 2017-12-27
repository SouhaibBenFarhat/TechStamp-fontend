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
  canAddToWishList: boolean = true;
  constructor(private wishListService: WishListService) { }

  ngOnInit() {
    this.wishListService.onWishListChange.subscribe((data) => {
      if (data.event === "remove" && data.productId === this.product.id) {
        this.canAddToWishList = true;
      }
      if (data.event === "add" && data.productId === this.product.id) {
        this.canAddToWishList = false;
      }
      
    })

    if (this.wishListService.doesProductExistInWishList(this.product.id) === true) {
      this.canAddToWishList = false;
    }
  }

  addToWishList() {
    if (this.canAddToWishList) {
      this.wishListService.addToWishList(this.product.id).then((data) => {
      });
    }
  }

 

}

