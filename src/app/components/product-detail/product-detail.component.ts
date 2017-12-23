import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from '../../models/product';
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  relatedProducts: Array<Product> = new Array<Product>();

  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.productService.getProductById(params.id).then((data) => {
        this.product = data;
        this.productService.getPorductByCategoryIdWithLimit(this.product.categoryId).then((data) => {
          this.relatedProducts = data;
          console.log(this.relatedProducts);
        }).catch((err) => {
          //Handle error
        })
      }).catch((err) => {
        //Handel Error
      });

    });
  }

}
