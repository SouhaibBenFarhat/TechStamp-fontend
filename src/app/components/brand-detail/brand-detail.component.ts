import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from "../../models/product";
import { ErrorHandlerService } from "../../services/error-handler.service";


@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {

  loading: boolean = false;
  products = Array<Product>();

  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.products = [];
      this.productService.getProductByBrandId(params.id).then((data) => {
        this.products = data;
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
      });

    });


  }

}
