import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleTeamPage } from './multiple-team.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleTeamPageRoutingModule {}
