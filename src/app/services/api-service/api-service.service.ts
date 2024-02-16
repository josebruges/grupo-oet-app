import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast/toast.service';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl: string;
  private axiosInstance;

  constructor(
    private router: Router,
    private loading: LoaderService,
    private toast: ToastService,
  ) {
    this.baseUrl = environment.API_ROOT;
    this.axiosInstance = axios.create({
      timeout: 180000,
    });
    axiosRetry(this.axiosInstance, { retries: 3 });
  }


  private async request<T>(
    config: AxiosRequestConfig,
    customThrow?: boolean
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>(
        config
      );
      return response.data;
    } catch (error: any) {
      if (customThrow) {
        throw error;
      }

      let isErrorMessage = false;
      let status = null;
      let errorMessage = 'Ha ocurrido un problema.';
      this.loading.hide(0.5);

      if (error.response) {
        status = error.response.status;
        console.error('status: ', status);

        if (error.response.data.errors) {
          errorMessage = this.handleErrors(error.response.data.errors);
          console.error('errorMessage: ', errorMessage);
          isErrorMessage = true;
        }
      }
      throw errorMessage;
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const fullUrl = this.baseUrl + url;
    return this.request<T>({ ...config, url: fullUrl, method: 'get' });
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = this.baseUrl + url;
    return this.request<T>({
      ...config,
      url: fullUrl,
      method: 'post',
      data,
    });
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = this.baseUrl + url;
    return this.request<T>({
      ...config,
      url: fullUrl,
      method: 'put',
      data,
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const fullUrl = this.baseUrl + url;
    return this.request<T>({ ...config, url: fullUrl, method: 'delete' });
  }

  handleErrors(errors: any) {
    // Verifica si hay errores y si es un objeto
    if (errors && typeof errors === 'object') {
      // Recorre las claves del objeto de errores
      for (const key of Object.keys(errors)) {
        const messages = errors[key];

        // Verifica si hay mensajes de error para la clave actual
        if (messages && messages.length > 0) {
          // Muestra un toast por cada mensaje de error
          for (const message of messages) {
            return message;
          }
        }
      }
    }
  }
}
