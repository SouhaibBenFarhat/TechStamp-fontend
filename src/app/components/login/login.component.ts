import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../utils/global';
import { ErrorHandlerService } from '../../services/error-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  error: boolean = false;
  errorText: string = "";
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private global: Globals, private errorHandlerService: ErrorHandlerService) {

  }

  ngOnInit() {

    localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
    localStorage.removeItem(this.global.TOKEN_KEY);

  }



  onLoginSubmitted({ value, valid }: { value: User, valid: boolean }) {
    this.error = false;
    if (valid) {
      this.loading = true;
      this.authService.login(this.user).then((data) => {
        this.router.navigate(['']);
      }).catch((err) => {
        this.handelErrors(err);
      });
    } else {
      this.loading = false;
    }


  }

  handelErrors(error) {

    if (error.status == 401) {
      this.authService.setTemporaryToken(error.error.data);
      this.router.navigate(['/confirmation-error/' + error.error.data]);
    }
    else if (error.status == 404) {
      this.loading = false;
      this.error = true;
      this.errorText = error.error.message;
    } else {
      this.loading = false;
      this.error = true;
      this.errorText = "Connection refused";
    }
  }

}
