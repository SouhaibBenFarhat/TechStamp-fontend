import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from '../../models/product';
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<Product> = new Array<Product>();
  loading: boolean = false;
  showLoadMoreButton = false;
  skip: number = 0;
  limit: number = 18;

  constructor(private productService: ProductService, private errorHandelr: ErrorHandlerService) { }

  ngOnInit() {
    this.loadProducts();

  }


  loadProducts() {
    this.loading = true;
    this.productService.getProductsWithPagination(this.skip, this.limit).then((data) => {
      this.skip = this.skip + 6;
      for (let i = 0; i < data.length; i++) {
        this.products.push(data[i]);
      }
      if (data.length === 0) {
        this.skip = 0;
        this.loadProducts();
      }

      console.log(data);
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      this.errorHandelr.handelError(err);
    });
  }





  loadMore() {
    if (!this.loading) {
      this.loadProducts();
    }
  }



}
