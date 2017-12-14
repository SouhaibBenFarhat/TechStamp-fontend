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



//Routes Configuration
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
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
    HighlightComponent
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
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
