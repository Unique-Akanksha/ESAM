import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsProjectPageRoutingModule } from './details-project-routing.module';

import { DetailsProjectPage } from './details-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsProjectPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsProjectPage]
})
export class DetailsProjectPageModule {}
