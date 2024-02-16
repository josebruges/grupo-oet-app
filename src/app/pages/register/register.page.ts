import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoaderService } from '../../services/loader/loader.service';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';

import {
  UserInterface,
} from '../../interfaces/Interfaces';

import { VerifyCodeComponent } from '../../components/verify-code/verify-code.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private loading: LoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private modalCtrl: ModalController,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        nombres: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z]+$/),
          ]),
        ],
        apellidos: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z]+$/),
          ]),
        ],
        cedula: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z0-9-]+$/),
          ]),
        ],
        telefono: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
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
    console.debug('RegisterPage')
  }

  async register() {
    this.loading.show('Cargando..');
    const data: UserInterface = {
      ...this.registerForm.value,
      password: 'secret'
    }
    try {
      const resp = await this.userService.create(data);
      await this.openModal();
    } catch (error) {
      const message = error + '' || 'Por favor, verifique la información ingresada.';
      await this.toast.showError(message, 'top');
    }
    this.loading.hide();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: VerifyCodeComponent,
      componentProps: {
        correo: this.registerForm.value.correo,
        flagResentCode: false,
      },
    });
    modal.present();
  }

}
