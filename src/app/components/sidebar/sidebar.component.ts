import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand-service/brand.service';
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Brand } from "../../models/brand";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  brands: Array<Brand>;

  constructor(private brandService: BrandService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.brandService.getTopBrands().then((data) => {
      this.brands = data;
    }).catch((err) => {
      console.log(err);
      this.errorHandlerService.handelError(err);
    });

  }

}
