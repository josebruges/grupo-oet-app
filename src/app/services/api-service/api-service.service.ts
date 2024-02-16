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
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
          console.error('errorMessage: ', errorMessage);
          isErrorMessage = true;

          /* if (errorMessage === 'Token no valido') {
            this.alert.errorHandler(this.alert.error.AUTH, () => {
              this.modalCtrl.dismiss();
              this.navCtrl.navigateRoot(['/']);
              this.sesionUsuario.removeUserData();
            });
          } else {
            this.alert.oneButton('Positiva', error.response.data.error, true);
          } */
        }
      }

      if (!error.status) {
        if (error.code === 'ERR_NETWORK' && error.message === 'Network Error') {
          /* this.alert.errorHandler(this.alert.error.INTERNET_CONMECTION, () => {
            if (this.sesionUsuario?.token) {
              this.modalCtrl.dismiss();
              const navigationExtrasMain: NavigationExtras = {
                queryParams: {
                  saveLogin: false,
                  renderRoot: true,
                  time: new Date().getTime(),
                },
              };
              this.navCtrl.navigateForward(['/main'], navigationExtrasMain);
            } else {
              this.router.navigate(['/']);
            }
          }); */
        } else {
          if (!isErrorMessage) {
            /* this.alert.errorHandler(this.alert.error.SERVER, () => {
              if (this.sesionUsuario?.token) {
                this.modalCtrl.dismiss();
                const navigationExtrasMain: NavigationExtras = {
                  queryParams: {
                    saveLogin: false,
                    renderRoot: true,
                    time: new Date().getTime(),
                  },
                };
                this.navCtrl.navigateForward(['/main'], navigationExtrasMain);
              } else {
                this.router.navigate(['/']);
              }
            }); */
          }
        }
      } else if (error.status >= 400 || error.httpResponseCode >= 400) {
        if (!isErrorMessage) {
          /* this.alert.errorHandler(this.alert.error.SERVER, () => {
            this.modalCtrl.dismiss();
            const navigationExtrasMain: NavigationExtras = {
              queryParams: {
                saveLogin: false,
                renderRoot: true,
                time: new Date().getTime(),
              },
            };
            this.navCtrl.navigateForward(['/main'], navigationExtrasMain);
          }); */
        }
        status = 400;
      } else if (error?.httpResponseCode === 401 || error?.status === 401) {
        // this.router.navigate(['/', { showMessage: true }]);
        status = 401;
      } else if (error.status == 0) {
        if (!isErrorMessage) {
          /* this.alert.errorHandler(this.alert.error.INTERNET_CONMECTION, () => {
            this.modalCtrl.dismiss();
            const navigationExtrasMain: NavigationExtras = {
              queryParams: {
                saveLogin: false,
                renderRoot: true,
                time: new Date().getTime(),
              },
            };
            this.navCtrl.navigateForward(['/main'], navigationExtrasMain);
          }); */
        }
        status = 0;
      } else {
        if (!isErrorMessage) {
          /* this.alert.errorHandler(this.alert.error.SERVER, () => {
            this.modalCtrl.dismiss();
            const navigationExtrasMain: NavigationExtras = {
              queryParams: {
                saveLogin: false,
                renderRoot: true,
                time: new Date().getTime(),
              },
            };
            this.navCtrl.navigateForward(['/main'], navigationExtrasMain);
          }); */
        }
      }

      console.error('throw errorMessage: ', errorMessage);
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
}
