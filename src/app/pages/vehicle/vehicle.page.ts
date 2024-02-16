import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { ProfileComponent } from '../../components/profile/profile.component';
import { AddVehicleComponent } from '../../components/add-vehicle/add-vehicle.component';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  constructor(
    private loading: LoaderService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.debug('VehiclePage')
  }

  openMenu(){
    this.menuCtrl.toggle('first-menu');
  }

  openModal(option: string = '') {
    if(option === 'exit'){

    }else{
      this.openModalAction(option);
    }
    this.menuCtrl.toggle('first-menu');
  }

  async openModalAction(option: string = ''){
    let componentRedirect = ProfileComponent;
    switch(option){
      case 'profile':
        this.modalCtrl.create({
          component: ProfileComponent,
        }).then(modal => {
          modal.present();
        });
        break

      case 'add-vehicle':
        this.modalCtrl.create({
          component: AddVehicleComponent,
        }).then(modal => {
          modal.present();
        });
        break

      default:
        this.modalCtrl.create({
          component: AddVehicleComponent,
        }).then(modal => {
          modal.present();
        });
        break
    }
  }

}
