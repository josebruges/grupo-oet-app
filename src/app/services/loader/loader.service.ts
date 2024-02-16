import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: any = null;
  private timeOut: any = null;

  constructor(private loadCtrl: LoadingController) {}

  async show(message?: string, secondsToDismiss?: number) {
    try {
      this.dismissTimeOut();
      if (this.loading == null) {
        this.loading = await this.loadCtrl.create({
          spinner: 'crescent',
          message: message !== undefined ? message : '',
          cssClass: 'project-loading',
          backdropDismiss: false,
        });
  
        this.loading.present();
      } else {
        if(this.loading?.data?.messag){
          this.loading.data.message = message !== undefined ? message : '';
        }
      }
      if (secondsToDismiss !== undefined && secondsToDismiss > 0) {
        this.timeOut = setTimeout(() => {
          this.dismissLoading();
        }, secondsToDismiss * 1000);
      }
    } catch (error) {
      console.error('Loader Service | error ', error)
    }
  }

  async hide(secondsToDismiss?: number) {
    this.dismissTimeOut();
    if (this.loading !== null && secondsToDismiss === undefined) {
      this.dismissLoading();
    } else if (this.loading !== null && secondsToDismiss !== undefined) {
      this.timeOut = setTimeout(() => {
        this.dismissLoading();
      }, secondsToDismiss * 1000);
    }
    try {
      this.loading.dismiss();
    } catch (error) {}
  }

  private async dismissLoading() {
    let that = this;
    try {
      if (that.loading !== null && !that.loading._detached) {
        await that.loading.dismiss();
      }
    } catch (e) {
      console.error(e);
    }
    this.loading = null;
    try {
      await this.loading.dismiss();
    } catch (error) {}
    this.dismissTimeOut();
  }

  private async dismissTimeOut() {
    if (this.timeOut !== null) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }
}
