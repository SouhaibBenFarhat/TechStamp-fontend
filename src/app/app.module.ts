import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//My Custom imports
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { LottieAnimationViewModule } from 'ng-lottie';
import { ImageZoomModule } from 'angular2-image-zoom';
import { NgxGalleryModule } from 'ngx-gallery';





//My Service imports
import { AuthService } from './services/auth-service/auth.service';
import { ProductService } from './services/product-service/product.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Globals } from './utils/global';
import { HeaderComponent } from './components/header/header.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { AuthGuard } from './guard/auth.guard';
import { BrandService } from './services/brand-service/brand.service';
import { CategoryService } from './services/category-service/category.service';
import { CategoryComponent } from './components/category/category/category.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RelatedProductComponentComponent } from './components/related-product-component/related-product-component.component';
import { ProductItemComponentComponent } from './components/product-item-component/product-item-component.component';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';
import { ContactComponent } from './components/contact/contact.component';
import { BrandItemComponent } from './components/brand-item/brand-item.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { NewsService } from './services/news-service/news.service';
import { WishListService } from "./services/wish-list-service/wish-list.service";
import { WishListComponent } from './components/wish-list/wish-list.component';
import { WishListItemComponent } from './components/wish-list-item/wish-list-item.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { PersonalDetailComponent } from './components/personal-detail/personal-detail.component';
import { ProfilService } from "./services/profile-service/profil.service";
import { MapComponent } from './components/map/map.component';
import { ImageThumbnailsComponent } from './components/image-thumbnails/image-thumbnails/image-thumbnails.component';
import { AfterRegistrationComponent } from './components/after-registration/after-registration/after-registration.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ConfirmationErrorComponent } from './components/confirmation-error/confirmation-error.component';
import { RegisterGuard } from './guard/register.guard';
import { ActivatedRouteSnapshot } from "@angular/router";
import { SellerRegistrationComponent } from './components/seller-registration/seller-registration.component';





//Routes Configuration
const appRoutes: Routes = [

  //Public
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'seller-registration', component: SellerRegistrationComponent },

  // Secure
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'brand/:id', component: BrandDetailComponent, canActivate: [AuthGuard] },
  { path: 'wish-list', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'after-registration/:token', component: AfterRegistrationComponent, canActivate: [RegisterGuard] },
  { path: 'confirmation-error/:token', component: ConfirmationErrorComponent, canActivate: [RegisterGuard] },
  { path: 'after-registration/email-verification/:token', component: EmailVerificationComponent, canActivate: [RegisterGuard] }


]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HighlightComponent,
    CategoryComponent,
    ProductDetailComponent,
    RelatedProductComponentComponent,
    ProductItemComponentComponent,
    ResetPasswordComponent,
    ContactComponent,
    BrandItemComponent,
    BrandsComponent,
    BrandDetailComponent,
    RightSidebarComponent,
    WishListComponent,
    WishListItemComponent,
    CompleteProfileComponent,
    AddressesComponent,
    PersonalDetailComponent,
    MapComponent,
    ImageThumbnailsComponent,
    AfterRegistrationComponent,
    EmailVerificationComponent,
    ConfirmationErrorComponent,
    SellerRegistrationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    FormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCf6mr6BXZbl3PDW9STLMDzR8U3cAfWEhI',
      libraries: ["places"]
    }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule,
    Ng2ImgMaxModule,
    LottieAnimationViewModule.forRoot(),
    ImageZoomModule,
    NgxGalleryModule
  ],
  providers: [
    FlashMessagesService,
    AuthService,
    Globals,
    ErrorHandlerService,
    AuthGuard,
    ProductService,
    BrandService,
    CategoryService,
    NewsService,
    WishListService,
    ProfilService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
