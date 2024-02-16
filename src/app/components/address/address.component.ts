import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Position, UserInterface } from '../../interfaces/Interfaces';
import { ToastService } from '../../services/toast/toast.service'
import { LoaderService } from '../../services/loader/loader.service'
import { environment } from '../../../environments/environment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent  implements OnInit {

  user: UserInterface | undefined;
  genericForm: FormGroup;
  address: string = '';
  coordenates: Position | undefined;
  btnEnable: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private loading: LoaderService,
    private toast: ToastService,
    private userService: UserService,
  ) {
    this.genericForm = this.formBuilder.group(
      {
        address: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.pattern(/^.*$/),
          ]),
        ],
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    console.debug('AddressComponent');

    this.user = this.userService.getUserCurrent();
    console.debug('AddressComponent | this.user: ', this.user)
    console.debug('AddressComponent | this.user?.address: ', this.user?.address)
    console.debug('AddressComponent | this.user: ', this.user)

    if(this.user?.address && this.user?.address !== 'N/A'){
      this.address = this.user?.address || '';
      this.genericForm.controls['address'].setValue(this.address);
      this.btnEnable = false;
    }

    this.toast.showMessage('Recuerda mantener activo GPS.').then(() => {})

    Geolocation.getCurrentPosition().then((position: Position) => {
      this.coordenates = position;
    });
  }

  async gpsActive() {
    this.loading.show('Verificando GPS activo...')
    try {
      const position: Position = await Geolocation.getCurrentPosition();
      this.loading.hide(0.5).then(() => {})

      this.loading.show('Determinando dirección...')
      this.coordenates = position;
      const { latitude, longitude } = this.coordenates.coords;
      this.address = await this.getAddressFromCoordinates(latitude, longitude);

      this.genericForm.controls['address'].setValue(this.address);


      this.loading.hide(0.5).then(() => {})

    } catch (error) {
      this.toast.showError('No fue posible obtener información de tú GPS, por favor verificar.')
      console.error(error);
      this.loading.hide(0.5);
    }

  }
  async getAddressFromCoordinates(latitude: number, longitude: number) {
    const apiKey = environment.GoogleMapsApiKey;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
  
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      return address;
    } else {
      return 'Dirección no encontrada';
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  async submit() {
    let data: UserInterface = this.userService.getUserCurrent();
    data = {
      ...data,
      address: this.address,
    }
    this.userService.setUserCurrent(data);
    try {
      await this.userService.update(data);
      this.modalCtrl.dismiss(null, 'cancel');
    } catch (error) {
      await this.toast.showError('Por favor verifica la información', 'top')
    }
  }

}
