import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerifyCodeComponent } from '../../components/verify-code/verify-code.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.debug('login.page');
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: VerifyCodeComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }

}
