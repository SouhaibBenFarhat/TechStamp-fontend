import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand-service/brand.service';
import { WishListService } from "../../services/wish-list-service/wish-list.service";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Brand } from "../../models/brand";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  brands: Array<Brand>;
  wishListNumber: Number = 0;
  loading = false;

  constructor(private brandService: BrandService, private errorHandlerService: ErrorHandlerService, private wishListService: WishListService) { }

  ngOnInit() {

    this.loading = true;
    this.wishListService.wishListNumber.subscribe((data) => {
      this.wishListNumber = data;
    })

    this.wishListService.getAllWishList().then((data) => {
      this.wishListNumber = data.length;
      this.loading = false;
    }).catch((err) => {
      this.wishListNumber = 0;
      this.loading = false;
    })


    this.brandService.getTopBrands().then((data) => {
      this.brands = data;
    }).catch((err) => {
      console.log(err);
      this.errorHandlerService.handelError(err);
    });

  }

}
