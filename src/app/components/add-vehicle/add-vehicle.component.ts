import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Listoption, UserInterface, Vehicle } from '../../interfaces/Interfaces';
import { ToastService } from '../../services/toast/toast.service'
import { LoaderService } from '../../services/loader/loader.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service'
import { VehicleService } from '../../services/vehicle/vehicle.service'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent  implements OnInit {

  user: UserInterface | undefined;
  documentIdFrontDefault: string = '../../assets/car-side-solid.svg';
  genericForm: FormGroup;
  documentIdFront: string = '';
  listoption: Listoption = {
    configuracion: [],
    carroceria: [],
  }

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loading: LoaderService,
    private toast: ToastService,
    private userService: UserService,
    private vehicleService: VehicleService,
  ) {
    this.genericForm = this.formBuilder.group(
      {
        plate: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            Validators.pattern(/^.*$/),
          ]),
        ],
        model: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            Validators.pattern(/^.*$/),
          ]),
        ],
        setting_id: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
            Validators.pattern(/^.*$/),
          ]),
        ],
        bodywork_id: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
            Validators.pattern(/^.*$/),
          ]),
        ],
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    console.debug('AddVehicleComponent')
    this.user = this.userService.getUserCurrent();
    this.initOption();
  }
  async initOption() {
    const resp: Listoption = await this.vehicleService.getOptions();
    if(resp) {
      this.listoption = {
        configuracion: resp?.configuracion,
        carroceria: resp?.carroceria,
      };
    }
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

  async takePicture() {
    const imageOptions = {
      quality: 25,
      resultType: CameraResultType.Base64,
      format: 'jpeg',
      source: CameraSource.Camera,
    };
    const image = await Camera.getPhoto(imageOptions);
    const imageUrl = image.base64String;

    if(imageUrl){
      this.documentIdFront = `data:image/png;base64,${imageUrl}`;
    }
  };

  async submit() {
    this.loading.show('Creeando vehículo...');
    const data: Vehicle = {
      plate: this.genericForm.value.plate,
      model: this.genericForm.value.model,
      setting_id: this.genericForm.value.setting_id,
      bodywork_id: this.genericForm.value.bodywork_id,
      user_id: parseInt('' + this.user?.id),
      picture: this.documentIdFront,
    }

    try {
      await this.vehicleService.create(data);
      this.toast.showMessage('Vehículo creado...')
      this.loading.hide(0.5);
      this.modalCtrl.dismiss(data, 'cancel');
    } catch (error) {
      this.loading.hide(0.5);
      await this.toast.showError('Por favor verifica la información', 'top')
    }

  }

}
