import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from "../../models/product";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { BrandService } from "../../services/brand-service/brand.service";
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {

  loading: boolean = false;
  products = Array<Product>();
  brandId: string;
  brand: any;

  constructor(private brandService: BrandService, private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.products = [];
      this.brandId = params.id;

      this.brandService.getBrandById(this.brandId).then((data) => {
        this.brand = data;
      });
      this.productService.getProductByBrandId(params.id).then((data) => {
        this.products = data;
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
      });

    });


  }

}
