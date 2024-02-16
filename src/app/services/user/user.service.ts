import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';
import { ApiServiceService } from '../api-service/api-service.service';
import {
  UserInterface,
} from '../../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    'Access-Source': 'APP_MOVIL',
    autorization: '',
  };

  constructor(
    private router: Router,
    private loading: LoaderService,
    private toast: ToastService,
    private apiService: ApiServiceService,
  ) {}

  async create(data: UserInterface){
    return this.apiService.post('/usuarios/logout', {}, { headers: this.headers });

  }
}
