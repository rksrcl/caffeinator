import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QandaPage } from './qanda.page';

const routes: Routes = [
  {
    path: '',
    component: QandaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QandaPageRoutingModule {}
