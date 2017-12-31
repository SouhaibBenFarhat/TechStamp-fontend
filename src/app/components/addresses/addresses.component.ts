import { Component, OnInit } from '@angular/core';
import { ProfilService } from "../../services/profile-service/profil.service";
import { Address } from "../../models/user";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  address: Address = new Address();
  error = false;


  constructor(private profileService: ProfilService) {


  }
  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Address, valid: boolean }) {
    this.error = !valid;

    if (valid && Number.isInteger(value.code)) {
      value.default = false;
      this.profileService.addAddress(value).then(() => {
        this.address = new Address();
      }).catch((err) => {
        console.log(err);
        this.error = true;
      })

    } else {
      this.error = true;
    }
  }




}
