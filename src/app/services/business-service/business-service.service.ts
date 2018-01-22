import { Injectable } from '@angular/core';
import { Business } from "../../models/business";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class BusinessService {

  constructor() { }

}
