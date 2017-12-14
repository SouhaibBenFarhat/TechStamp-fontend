import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-service/auth.service';
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

  constructor(private authService: AuthService, private productService: ProductService, private errorHandelr: ErrorHandlerService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((data: User) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });

    this.productService.getAllProducts().then((data) => {
      this.products = data;
    }).catch((err) => {
      this.errorHandelr.handelError(err);
    });


  }

}
