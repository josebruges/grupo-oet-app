import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';
import { ApiServiceService } from '../api-service/api-service.service';
import {
  Listoption,
  Vehicle,
  VehicleData,
} from '../../interfaces/Interfaces';
import { UserService } from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  headers = {
    'Content-Type': 'application/json',
    'Authorization': ''
  };

  constructor(
    private userService: UserService,
    private apiService: ApiServiceService,
  ) {}

  async getOptions(): Promise<Listoption>{
    try {
      return await this.apiService.get(`/list/options`, {});
    } catch (error) {
      throw new Error(`No fue posible actualizar los datos de tu usuario.`);
    }
  }

  async create(data: Vehicle){
    try {
      return await this.apiService.post('/create/vehicle', data, { headers: this.headers });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getVehicles(userId:number = 0): Promise<VehicleData>{
    const user = this.userService.getUserCurrent();
    this.headers.Authorization = `Bearer ${user?.token || ''}`
    try {
      return await this.apiService.get(`/list/vehicles/${userId}`, { headers: this.headers });
    } catch (error) {
      throw new Error(`No fue posible actualizar los datos de tu usuario.`);
    }
  }
}
