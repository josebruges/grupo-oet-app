import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserInterface } from '../../interfaces/Interfaces';
import { ToastService } from '../../services/toast/toast.service'
import { LoaderService } from '../../services/loader/loader.service'
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-id-authenticator',
  templateUrl: './id-authenticator.component.html',
  styleUrls: ['./id-authenticator.component.scss'],
})
export class IdAuthenticatorComponent  implements OnInit {
  documentIdFrontDefault: string = '../../assets/id-card-solid.svg';
  documentIdBackDefault: string = '../../assets/credit-card-solid.svg';
  documentIdFront: string = '';
  documentIdBack: string = '';
  btnEnable: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private loading: LoaderService,
    private toast: ToastService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    console.debug('IdAuthenticatorComponent');
    const data: UserInterface = this.userService.getUserCurrent();
    if(data?.cedula_front && data?.cedula_later){
      this.documentIdFront = data?.cedula_front;
      this.documentIdBack = data?.cedula_later;
      this.btnEnable = false;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  async takePicture(card: string = 'front') {
    const imageOptions = {
      quality: 25,
      resultType: CameraResultType.Base64,
      format: 'jpeg',
      source: CameraSource.Camera,
    };
    const image = await Camera.getPhoto(imageOptions);
    const imageUrl = image.base64String;

    if(imageUrl){
      if(card === 'front'){
        this.documentIdFront = `data:image/png;base64,${imageUrl}`;
      }else{
        this.documentIdBack = `data:image/png;base64,${imageUrl}`;
      }
    }
  };

  async saveImgs() {
    this.loading.show('Enviando información...')
    let data: UserInterface = this.userService.getUserCurrent();

    data = {
      ...data,
      cedula_front: this.documentIdFront,
      cedula_later: this.documentIdBack,
    }

    this.userService.setUserCurrent(data);

    try {
      await this.userService.update(data);
      this.modalCtrl.dismiss(null, 'cancel');
    } catch (error) {
      await this.toast.showError('Por favor verifica la información', 'top')
    }
    this.loading.hide(0.5).then(() => {})
  }

}
