import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController
  ) {}

  async showMessage(
    message: string,
    durationSeconds?: number,
    position?: 'top' | 'bottom' | 'middle' | undefined
  ) {
    let toastPosition: 'top' | 'bottom' | 'middle' = 'bottom';
    let toastDuration = 4000;
    if (position !== undefined) toastPosition = position;
    if (durationSeconds !== undefined) toastDuration = durationSeconds * 1000;

    const toast = await this.toastCtrl.create({
      message: message,
      duration: toastDuration,
      position: toastPosition,
      cssClass: 'custom-toast',
    });
    toast.present();
  }

  async showError(
    message: string,
    position?: 'top' | 'bottom' | 'middle' | undefined
  ) {
    let toastPosition: 'top' | 'bottom' | 'middle' = 'bottom';
    if (position !== undefined) toastPosition = position;
    const toast = await this.toastCtrl.create({
      message: message,
      position: toastPosition,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
      cssClass: 'custom-toast',
    });
    toast.present();
  }
}
