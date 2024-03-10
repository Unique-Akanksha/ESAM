import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsProjectPage } from './details-project.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsProjectPageRoutingModule {}
