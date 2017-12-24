import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from '../../models/product';
import { ErrorHandlerService } from "../../services/error-handler.service";

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent implements OnInit {

  topProducts: Array<Product>;

  constructor(private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.productService.getTopproducts("10").then((data) => {
      this.topProducts = data;
    }).catch((err) => {
      this.errorHandler.handelError(err);
    })


  }

}
