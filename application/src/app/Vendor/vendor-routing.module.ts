import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: RegisterComponent
  },
  {
    path:"options",
    loadChildren: () => import('./Protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
