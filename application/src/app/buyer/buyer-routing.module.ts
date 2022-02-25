import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path:"",
    component: MainComponent,
    children: [
      {path: "", component: SearchComponent},
      {path: "details/:id", component: DetailsComponent},
    ]
  

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
