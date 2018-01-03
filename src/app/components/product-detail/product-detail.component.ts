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
  visibleImages = new Array<string>();
  invisibleImages = new Array<string>();

  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.productService.getProductById(params.id).then((data) => {
        this.product = data;
        if (this.product.images.length > 0) {
          for (let i = 0; i < this.product.images.length; i++) {
            if (i < 4) {
              this.visibleImages.push(this.product.images[i]);
            } else {
              this.invisibleImages.push(this.product.images[i]);

            }
          }
        }

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

  enter(){
    console.log('enter');
  }
  leave(){
    console.log('leave');
  }



}
