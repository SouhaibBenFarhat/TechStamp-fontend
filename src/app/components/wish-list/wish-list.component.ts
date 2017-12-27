import { Component, OnInit } from '@angular/core';
import { WishListService } from "../../services/wish-list-service/wish-list.service";
import { WishList } from "../../models/wishList";
import { ErrorHandlerService } from "../../services/error-handler.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishLists: Array<WishList> = new Array<WishList>();

  constructor(private wishListService: WishListService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.wishListService.getAllWishList().then((data) => {
      this.wishLists = data;
    }).catch((err) => {
      this.errorHandler.handelError(err);
    });
  }

}
