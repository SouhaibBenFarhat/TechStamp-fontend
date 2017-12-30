import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BrandService } from '../../services/brand-service/brand.service';
import { WishListService } from "../../services/wish-list-service/wish-list.service";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Brand } from "../../models/brand";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  brands: Array<Brand>;
  wishListNumber: Number = 0;
  loading = false;

  constructor(private router: Router, private authService: AuthService, private brandService: BrandService, private errorHandlerService: ErrorHandlerService, private wishListService: WishListService) { }

  ngOnInit() {

    if (this.authService.currentUser) {
      this.getAllWishList();
      this.getTopBrand();
    } else {
      this.authService.getCurrentUser().then(() => {
        this.getAllWishList();
        this.getTopBrand();
      });
    }


    this.wishListService.wishListNumber.subscribe((data) => {
      this.wishListNumber = data;
    });

    this.authService.onUserLoggedIn.subscribe(() => {
      console.log('bababababa');
      this.getAllWishList();
      this.getTopBrand();
    });

    this.authService.onUserLogout.subscribe(() => {
      this.loading = false;
      this.wishListNumber = 0;
      this.brands = null;
    });
  }

  getAllWishList() {
    this.loading = true;
    this.wishListService.getAllWishList().then((data) => {
      this.wishListNumber = data.length;
      this.loading = false;
    }).catch((err) => {
      this.wishListNumber = 0;
      this.loading = false;
    })
  }

  getTopBrand() {

    this.brandService.getTopBrands().then((data) => {
      this.brands = data;
    }).catch((err) => {
    });
  }

}
