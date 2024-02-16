import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';
import { ApiServiceService } from '../api-service/api-service.service';
import {
  UserInterface,
  VerifyCodeUserInterface
} from '../../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    'Content-Type': 'application/json',
  };

  constructor(
    private router: Router,
    private loading: LoaderService,
    private toast: ToastService,
    private apiService: ApiServiceService,
  ) {}

  async verifyCode(data: VerifyCodeUserInterface){
    try {
      return this.apiService.post('/verify-code', { data }, { headers: this.headers });
    } catch (error) {
      return error;
    }
  }
  async resentCode(email: string = ''){
    try {
      return this.apiService.post('/resent-code', { email }, { headers: this.headers });
    } catch (error) {
      return error;
    }
  }
  async create(data: UserInterface){
    try {
      return this.apiService.post('/users', data, { headers: this.headers });
    } catch (error) {
      return error;
    }
  }
}
