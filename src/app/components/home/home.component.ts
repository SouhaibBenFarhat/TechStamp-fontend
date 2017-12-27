import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from '../../models/product';
import { ErrorHandlerService } from "../../services/error-handler.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<Product>;
  loading : boolean = false;

  constructor(private productService: ProductService, private errorHandelr: ErrorHandlerService) { }

  ngOnInit() {
    this.loading = true;
    this.productService.getAllProducts().then((data) => {
      this.products = data;
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      this.errorHandelr.handelError(err);
    });


  }

}
