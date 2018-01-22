import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControlDirective } from '@angular/forms';
import { CategoryService } from "../../services/category-service/category.service";
import { Category } from "../../models/category";
import { User } from "../../models/user";
import { Business } from "../../models/business";
import { DummyDataProvider } from "../../utils/dummyData";
import { BusinessType } from "../../models/businessType";
import { AuthService } from "../../services/auth-service/auth.service";
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent implements OnInit {


  private latitude: number;
  private longitude: number;
  private searchControl: FormControl;
  private zoom: number;
  private loadingMap: boolean = false;
  private advancedAddress: boolean = false;
  private categories: Array<any> = new Array<any>();
  private selected
  private user: User = new User();
  private business: Business = new Business();
  private badPhoneNumber: boolean = false;
  private businessTypes = Array<BusinessType>();


  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private categoriesService: CategoryService,
    private ngZone: NgZone, private authService: AuthService, private router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;



    this.businessTypes = new DummyDataProvider().getDummyBusinessType();

    this.categoriesService.getAllCategories().then((data) => {
      this.categories = data;
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i].selected = false;
      }
      console.log(this.categories);
    })


    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      this.loadingMap = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //Set default lat and lng
        this.business.position.latitude = position.coords.latitude;
        this.business.position.langitude = position.coords.longitude;
        this.zoom = 12;
        this.loadingMap = false;
      });
    }
  }
  onLatLangChange(value) {
    if (value.name == "businessLat") {
      this.latitude = parseInt(value.value);
    } else {
      this.longitude = parseInt(value.value);
    }
  }
  phoneNumberValidator() {
    if (this.business.phoneNumber == null) {
      this.badPhoneNumber = false;
      return;
    }
    setTimeout(() => {
      if (new String(this.business.phoneNumber).length < 8 && new String(this.business.phoneNumber).length > 0) {
        this.badPhoneNumber = true;
      }
      else {
        this.badPhoneNumber = false;
      }
    }, 2000);
  }
  selectCompanyType() {
    this.businessTypes.forEach(bt => {
      bt.selected = false;
    })
  }
  onLoginSubmitted({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.categories.forEach(c => { if (c.selected) { this.business.categories.push(c.id); } });
      this.businessTypes.forEach(bt => { if (bt.selected) { this.business.businessType = bt; } });

      this.authService.registerAsBusiness(this.user, this.business).then((data: User) => {
        this.authService.setTemporaryToken(data.temporaryToken);
        this.router.navigate(['/after-registration/' + data.temporaryToken]).then(() => {
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.toastr.error('Please make sure that you put all required fields', 'Oops!');
    }
  }
}


