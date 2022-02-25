import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule

  ],
  exports: [HeaderComponent]
})
export class ToShareModule { }
