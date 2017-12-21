import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from "../../../services/product-service/product.service";
import { Product } from "../../../models/product";
import { ErrorHandlerService } from "../../../services/error-handler.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products = Array<Product>();

  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.productService.getPorductByCategoryId(params.id).then((data) => {
        this.products = data;
      }).catch((err) => {

      });

    });


  }

}
