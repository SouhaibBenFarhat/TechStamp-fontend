import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth-service/auth.service";
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-after-registration',
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
  templateUrl: './after-registration.component.html',
  styleUrls: ['./after-registration.component.css']
})
export class AfterRegistrationComponent implements OnInit {

  private loading: boolean = false;
  private token: string = "";
  private showConfirmation = false;



  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.token = params.token;
      this.sendEmailVerification();
    }, (err) => {
      console.log(err);
    });
  }


  sendEmailVerification() {
    if (!this.loading) {
      this.showConfirmation = false;
      this.loading = true;
      this.authService.sendEmailVerification(this.token).then(() => {
        this.loading = false;
        this.showConfirmation = true;
      }).catch((err) => {
        this.loading = false;
        this.showConfirmation = false;
      });
    }
  }

}
