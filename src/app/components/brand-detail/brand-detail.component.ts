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

  products = Array<Product>();

  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.productService.getProductByBrandId(params.id).then((data) => {
        this.products = data;
        console.log(data);
      }).catch((err) => {

      });

    });


  }

}
