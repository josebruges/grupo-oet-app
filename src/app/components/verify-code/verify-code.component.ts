import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service'
import { ToastService } from '../../services/toast/toast.service'
import { UserInterface, VerifyCodeUserInterface } from '../../interfaces/Interfaces';
import { Router } from '@angular/router';

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
    private router: Router,
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
            Validators.minLength(5),
            Validators.maxLength(6),
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
        const resp : UserInterface | null = await this.userService.verifyCode(data);
        if(resp !== null){
          this.modalCtrl.dismiss(null, 'cancel');

          this.userService.setUserCurrent(resp)
          this.router.navigate(['/vehicle'], { replaceUrl: true });
        }
      } catch (error) {
        await this.toast.showError('Por favor verifica la información', 'top')
      }
    }
  }

  async resentCode(){
    try {
      const resp : UserInterface | null = await this.userService.resentCode(this.correo);
      console.debug('>>>>> { resp }: ', resp)
      /* if(resp !== null){
        this.modalCtrl.dismiss(null, 'cancel');

        this.userService.setUserCurrent(resp)
        this.router.navigate(['/vehicle'], { replaceUrl: true });
      } */
    } catch (error) {
      await this.toast.showError('Por favor verifica la información', 'top')
    }
  }

}
