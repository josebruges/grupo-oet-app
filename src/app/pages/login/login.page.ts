import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerifyCodeComponent } from '../../components/verify-code/verify-code.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginAuth: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.loginAuth = this.formBuilder.group(
      {
        correo: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
          ]),
        ],
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    console.debug('login.page');
  }

  async submit() {
    const modal = await this.modalCtrl.create({
      component: VerifyCodeComponent,
      componentProps: {
        correo: this.loginAuth.value.correo,
      },
    });
    modal.present();
  }

}
