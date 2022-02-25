import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateComponent } from './Components/create/create.component';
import { SharedModule } from '../shared/shared.module';
import { BtnTextPipe } from './pipes/btn-text.pipe';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    CreateComponent,
    BtnTextPipe
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModule
  ]
})
export class VendorModule { }
