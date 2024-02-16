import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  ) {
    /*
    nombres
    apellidos
    identificacion
    telefono
    correo
    */
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
        identificacion: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z]+$/),
          ]),
        ],
        telefono: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z]+$/),
          ]),
        ],
        correo: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z]+$/),
          ]),
        ],
      },
      { updateOn: 'change' }
    );
  }

  async register() {
    console.debug('this.registerForm: ', this.registerForm)
  }

  ngOnInit() {
    console.debug('RegisterPage')
  }

}
