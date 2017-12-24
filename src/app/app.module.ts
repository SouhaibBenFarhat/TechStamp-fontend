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



//My Service imports
import { AuthService } from './services/auth-service/auth.service';
import { ProductService } from './services/product-service/product.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Globals } from './utils/global';
import { HeaderComponent } from './components/header/header.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { Converters } from './utils/converters';
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




//Routes Configuration
const appRoutes: Routes = [

  //Public
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'contact', component: ContactComponent },

  // Secure
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'brand/:id', component: BrandDetailComponent, canActivate: [AuthGuard] }

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
    RightSidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    FlashMessagesService,
    AuthService,
    Globals,
    Converters,
    ErrorHandlerService,
    AuthGuard,
    ProductService,
    BrandService,
    CategoryService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
