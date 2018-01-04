import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";
import { trigger, style, animate, transition } from '@angular/animations';
import { Globals } from '../../utils/global';


@Component({
  selector: 'app-confirmation-error',
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
  templateUrl: './confirmation-error.component.html',
  styleUrls: ['./confirmation-error.component.css']
})
export class ConfirmationErrorComponent implements OnInit {

  private loading: boolean = false;
  private token: string = "";
  private showConfirmation = false;
  private showConfirmationError = false;



  constructor(private global:Globals,private router: Router, private activatedRouter: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.token = params.token;
    }, (err) => {
    });
  }


  sendEmailVerification() {
    if (!this.loading) {
      this.showConfirmation = false;
      this.showConfirmationError = false            
      this.loading = true;
      this.authService.sendEmailVerification(this.token).then(() => {
        this.loading = false;
        this.showConfirmation = true;
      }).catch((err) => {
        this.loading = false;
        this.showConfirmation = false;
        this.showConfirmationError = true
        
      });
    }
  }

}

