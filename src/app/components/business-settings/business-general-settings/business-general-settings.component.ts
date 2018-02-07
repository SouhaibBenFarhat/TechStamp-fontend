import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Business } from "../../../models/business";
import { BusinessType } from "../../../models/businessType";
import { BusinessTypeService } from "../../../services/business-type-service/business-type-service";
import { BusinessService } from "../../../services/business-service/business-service.service";
import { Messages } from "../../../utils/errorMessages";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-business-general-settings',
  templateUrl: './business-general-settings.component.html',
  styleUrls: ['./business-general-settings.component.css']
})
export class BusinessGeneralSettingsComponent implements OnInit, AfterViewInit {

  @Input() business: Business;
  @ViewChild('form') form;
  editing: boolean = false;
  private businessTypes = Array<BusinessType>();
  loadingBusinessType: boolean = false;
  loadingUpdate: boolean = false;


  constructor(private businessTypeService: BusinessTypeService, private businessService: BusinessService, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {


    this.businessTypeService.getAllBusinessType().then((data) => {
      this.businessTypes = data;
    }).catch((err) => {
      console.log(err);
    })

  }
  ngAfterViewInit() {

  }



  businessTypeChange(event) {
    if (event.target.value != null && event.target.value != undefined) {
      let id = event.target.value;
      this.loadingBusinessType = true;
      this.businessTypeService.getBusinessTypeById(id).then((data) => {
        if (data) {
          this.business.businessType = data;
        }
      })

    }
  }

  onUpdateSubmitted({ value, valid }: { value: Business, valid: boolean }) {
    if (valid) {
      this.loadingUpdate = true;
      this.businessService.updateBusiness(this.business).then((data) => {
        this.business = data;
        this.editing = false;
        this.loadingUpdate = false;
        this.toastr.success("Successfully updated", 'Success!');

      }).catch((err) => {
        this.loadingUpdate = false;
        this.handelErrors(err);
      })
    }
  }

  handelErrors(error) {
    if (error.status == 400) {
      this.toastr.error(error.error.errors, 'Oops!');
    } else {
      this.toastr.error(Messages.CONNECTION_REFUSED, 'Oops!');
    }
  }

}
