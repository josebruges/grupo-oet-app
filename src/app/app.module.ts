import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { VerifyCodeComponent } from '../app/components/verify-code/verify-code.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { IdAuthenticatorComponent } from '../app/components/id-authenticator/id-authenticator.component';
import { AddressComponent } from '../app/components/address/address.component';
import { AddVehicleComponent } from '../app/components/add-vehicle/add-vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    VerifyCodeComponent,
    ProfileComponent,
    IdAuthenticatorComponent,
    AddressComponent,
    AddVehicleComponent,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
