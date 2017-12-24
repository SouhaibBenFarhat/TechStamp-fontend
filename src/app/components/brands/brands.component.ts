import { Component, OnInit } from '@angular/core';
import { BrandService } from "../../services/brand-service/brand.service";
import { Brand } from "../../models/brand";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands = new Array<Brand>();


  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.brandService.getAllBrands().then((data) => {
      this.brands = data;
    })
  }

}
