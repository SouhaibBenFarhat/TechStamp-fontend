import { Component, OnInit, Input } from '@angular/core';
import { PersonalDetail } from "../../models/user";
import { ProfilService } from "../../services/profile-service/profil.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {

  @Input() personalDetail: PersonalDetail

  days: Array<number> = new Array<number>();
  months: Array<number> = new Array<number>();
  years: Array<number> = new Array<number>();



  constructor(private profileService: ProfilService) { }

  ngOnInit() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    var d = new Date();
    var n = d.getFullYear();

    for (let i = 1900; i <= n - 5; i++) {
      this.years.unshift(i);
    }


  }

  onSubmit({ value, valid }: { value: PersonalDetail, valid: boolean }) {

    console.log(value);



    if (valid) {
      this.profileService.addPersonalDetail(value).then(() => {

      })
    }

  }

}
