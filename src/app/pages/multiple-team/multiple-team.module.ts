import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleTeamPageRoutingModule } from './multiple-team-routing.module';

import { MultipleTeamPage } from './multiple-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleTeamPageRoutingModule
  ],
  declarations: [MultipleTeamPage]
})
export class MultipleTeamPageModule {}
