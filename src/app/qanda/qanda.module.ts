import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QandaPageRoutingModule } from './qanda-routing.module';

import { QandaPage } from './qanda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QandaPageRoutingModule
  ],
  declarations: [QandaPage]
})
export class QandaPageModule {}
