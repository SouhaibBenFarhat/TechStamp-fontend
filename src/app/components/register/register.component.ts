import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Globals } from '../../utils/global';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('1000ms', style({ transform: 'translateX(0%)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  error: boolean = false;
  errorText: string = "";
  loading: boolean = false;
  showSellerAccountPanel = false;

  constructor(private authService: AuthService, private router: Router, private global: Globals, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    localStorage.setItem(this.global.IS_LOGGED_IN, 'false');

  }

  onRegisterSubmitted({ value, valid }: { value: User, valid: boolean }) {
    this.error = false;
    this.loading = valid;
    if (valid) {
      this.authService.register(this.user).then((data: User) => {
        this.authService.setTemporaryToken(data.temporaryToken);
        this.router.navigate(['/after-registration/' + data.temporaryToken]).then(() => {
          this.loading = false;
        });

      }).catch((err) => {
        this.loading = false;
        this.error = true;
        this.errorText = this.errorHandlerService.handelError(err);
      });
    } else {
      this.loading = false;
      this.error = true;
      this.errorText = "Please put a valid data";
    }
  }

}
