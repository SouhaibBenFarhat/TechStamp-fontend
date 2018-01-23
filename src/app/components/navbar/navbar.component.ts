import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../../utils/global';
import { CategoryService } from "../../services/category-service/category.service";
import { Category } from "../../models/category";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Observable } from 'rxjs/Rx';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('800ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  categories: Array<Category>;
  navClicked: string = '';
  showMessage = false;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private global: Globals, private categoryService: CategoryService, private errorHandler: ErrorHandlerService) {

  }



  ngOnInit() {

    this.authService.onUserLoggedIn.subscribe(() => {
      if (this.authService.currentUser.firstTime) {
        this.showMessage = true;
      }
    });
    this.authService.onUserLogout.subscribe(() => {
      this.showMessage = false;
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });

    this.authService.onUserLoggedIn.subscribe(() => {
      this.getCategories();
    });
    this.getCategories();

  }


  onLogoutClicked() {
    this.isLoggedIn = false;
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }
  getCategories() {
    this.categoryService.getNavbarCategories().then((data: Array<Category>) => {
      if (data) {
        this.categories = data;
      }
    });
  }

}
