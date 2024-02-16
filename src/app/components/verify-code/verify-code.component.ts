import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service'
import { ToastService } from '../../services/toast/toast.service'
import { VerifyCodeUserInterface } from '../../interfaces/Interfaces';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent  implements OnInit {
  @Input()
  correo: string | undefined;
  verifyCodeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService,
    private toast: ToastService,
  ) {
    this.verifyCodeForm = this.formBuilder.group(
      {
        correo: [
          '',
          Validators.compose([]),
        ],
        code: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[0-9]+$/),
          ]),
        ],
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    console.debug('VerifyCodeComponent');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  async submit() {
    if(this.correo){
      const data: VerifyCodeUserInterface = {
        correo: this.correo,
        code: this.verifyCodeForm.value.code,
      }
      try {
        await this.userService.verifyCode(data);
      } catch (error) {
        await this.toast.showError('Por favor verifica la información', 'top')
      }
    }
  }

}
