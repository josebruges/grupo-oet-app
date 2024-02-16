import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';
import { ApiServiceService } from '../api-service/api-service.service';
import {
  UserInterface,
  VerifyCodeUserInterface,
  UserVerifyCodeResponseInterface,
  UserCurrentInterface,
} from '../../interfaces/Interfaces';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    'Content-Type': 'application/json',
    'Authorization': ''
  };

  constructor(
    private router: Router,
    private loading: LoaderService,
    private toast: ToastService,
    private apiService: ApiServiceService,
  ) {}

  async verifyCode(data: VerifyCodeUserInterface): Promise<UserInterface | null> {
    try {
      const resp: any = await this.apiService.post('/validate/cuenta', data, { headers: this.headers });
      try {
        const decodedToken: UserInterface | null = this.decodeJwtToken(resp?.verificado);
        return decodedToken;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("Error al verificar el código");
      }
    }
  }
  
  async resentCode(email: string = ''){
    try {
      return await this.apiService.post('/resent-code', { email }, { headers: this.headers });
    } catch (error) {
      return error;
    }
  }
  async create(data: UserInterface){
    try {
      return await this.apiService.post('/users', data, { headers: this.headers });
    } catch (error) {
      return error;
    }
  }
  async update(data: UserInterface){
    const user = this.getUserCurrent();
    this.headers.Authorization = `Bearer ${user?.token || ''}`
    try {
      return await this.apiService.put(`/users/${user?.id}`, data, { headers: this.headers });
    } catch (error) {
      throw new Error(`No fue posible actualizar los datos de tu usuario.`);
    }
  }

  setUserCurrent(data: UserInterface){
    localStorage.setItem('currentUser', JSON.stringify(data))
  }
  getUserCurrent(): UserCurrentInterface{
    return JSON.parse(localStorage.getItem('currentUser') || '');
  }

  decodeJwtToken(jwtToken: string): UserInterface | null {
    try {
      const decodedToken: UserInterface = jwt_decode(jwtToken);
      return {
        ...decodedToken,
        token: jwtToken,
      };
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new Error(`Por favor, verifique la información ingresada.`);
    }
  }

  getToke() {
    const user = this.getUserCurrent();
    return user?.token || '';
  }
}
