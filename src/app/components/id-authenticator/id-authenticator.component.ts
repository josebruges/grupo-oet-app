import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.debug('IdAuthenticatorComponent');
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

}
