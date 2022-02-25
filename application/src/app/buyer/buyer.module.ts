import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { TrueFalsePipe } from './pipe/true-false.pipe';
import { LocationPipe } from './pipe/location.pipe';




@NgModule({
  declarations: [
    MainComponent,
    FilterComponent,
    TableComponent,
    SearchComponent,
    DetailsComponent,
    MapComponent,
    TrueFalsePipe,
    LocationPipe
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class BuyerModule { }
