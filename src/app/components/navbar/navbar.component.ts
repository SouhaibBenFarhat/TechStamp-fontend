import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../../utils/global';
import { CategoryService } from "../../services/category-service/category.service";
import { Category } from "../../models/category";
import { ErrorHandlerService } from "../../services/error-handler.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  categories: Array<Category>;
  navClicked: string = 'home';

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private global: Globals, private categoryService: CategoryService, private errorHandler: ErrorHandlerService) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });

    this.categoryService.getNavbarCategories().then((data: Array<Category>) => {
      if (data) {
        this.categories = data;
      }
    }).catch((err) => {
      this.errorHandler.handelError(err);
    })


  }


  onLogoutClicked() {
    this.isLoggedIn = false;
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
