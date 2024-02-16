import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IdAuthenticatorComponent } from '../id-authenticator/id-authenticator.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.debug('ProfileComponent')
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

  async toId() {
    const modal = await this.modalCtrl.create({
      component: IdAuthenticatorComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }

  async toAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }

}
