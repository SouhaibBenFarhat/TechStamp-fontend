import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from "../../services/business-service/business-service.service";
import { Business } from "../../models/business";
import { CategoryService } from "../../services/category-service/category.service";
import { Category } from "../../models/category";
import { Messages } from "../../utils/errorMessages";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.css']
})
export class BusinessSettingsComponent implements OnInit {

  business: Business = new Business();
  businessId: string;
  categories: Array<Category> = new Array<Category>();
  loadingCategories: boolean = false;
  allCategories: Array<Category> = new Array<Category>();


  constructor(private route: ActivatedRoute, private businessService: BusinessService, private categoryService: CategoryService, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.businessId = params.id;
      this.updateUI();
    }, (err) => {
      console.log(err);
    });
  }

  updateUI() {
    this.businessService.getBusinessById(this.businessId).then((data: Business) => {
      this.business = data;
      this.checkCategories();
      this.loadingCategories = true;
      this.categoryService.getGroupCategories(this.business.categories).then((data) => {
        this.categories = data;
        this.loadingCategories = false;
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
      this.loadingCategories = false;
    });
  }


  checkCategories() {
    this.categoryService.getAllCategories().then((data) => {
      this.allCategories = data;
      if (this.allCategories.length > 0) {
        this.allCategories.forEach((item) => {

          if (this.business.categories.includes(item.id)) {
            item.selected = true;
          }
        })
      }

    })
  }

  updateCategories() {
    this.business.categories = [];
    this.categories = [];
    this.allCategories.forEach(item => {
      if (item.selected) {
        this.business.categories.push(item.id);
        this.categories.push(item);
      }
    })
  }

  updateBusiness() {
    if (this.business.categories.length == 0) {
      this.toastr.warning(Messages.SR_EMPTY_CATEGORY, 'Oups');
      return;
    }

    this.businessService.updateBusiness(this.business).then((data) => {
      this.updateUI();
    }).catch((err) => {
      console.log(err);
      this.toastr.error(Messages.CONNECTION_REFUSED, 'Oups');

    })
  }

}


