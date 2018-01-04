import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../utils/global';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  error: boolean = false;
  errorText: string = "";
  loading: boolean = false;

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
