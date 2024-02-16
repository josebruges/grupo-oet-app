import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { ProfileComponent } from '../../components/profile/profile.component';
import { AddVehicleComponent } from '../../components/add-vehicle/add-vehicle.component';

import { ToastService } from '../../services/toast/toast.service'
import { LoaderService } from '../../services/loader/loader.service'
import { UserService } from '../../services/user/user.service'
import { VehicleService } from '../../services/vehicle/vehicle.service'
import { UserInterface, Vehicle } from '../../interfaces/Interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  user: UserInterface | undefined;
  vehicles: Vehicle[] = []

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private loading: LoaderService,
    private toast: ToastService,
    private userService: UserService,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    console.debug('VehiclePage')
    this.user = this.userService.getUserCurrent();
    this.init();
  }

  openMenu(){
    this.menuCtrl.toggle('first-menu');
  }

  openModal(option: string = '') {
    if(option === 'exit'){
      this.userService.logout();
      this.router.navigate(['/']);
    }else{
      this.openModalAction(option);
    }
    this.menuCtrl.toggle('first-menu');
  }

  async openModalAction(option: string = ''){
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
          modal.onWillDismiss().then(data => {
            this.init();
          })
        });
        break

      default:
        this.modalCtrl.create({
          component: AddVehicleComponent,
        }).then(modal => {
          modal.present();
          modal.onWillDismiss().then(data => {
            this.init();
          })
        });
        break
    }
  }

  async init(){
    this.loading.show('Cargando información...');
    try {
      const resp = await this.vehicleService.getVehicles(this.user?.id);
      if(resp?.data){
        this.vehicles = resp?.data;
      }
      this.loading.hide(0.5).then(() => {});
    } catch (error) {
      this.loading.hide(0.5).then(() => {});
      await this.toast.showError('No fue posible cargar el listado de vehículos', 'top')
    }
  }
}
