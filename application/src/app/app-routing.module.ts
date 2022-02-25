import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './Home/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "vendor", loadChildren: () => import("./Vendor/vendor.module").then(m=> m.VendorModule)},
  { path: "buyer", loadChildren: () => import("./buyer/buyer.module").then(m=> m.BuyerModule)},
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
