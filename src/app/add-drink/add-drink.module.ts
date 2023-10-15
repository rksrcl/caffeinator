import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDrinkPageRoutingModule } from './add-drink-routing.module';

import { AddDrinkPage } from './add-drink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDrinkPageRoutingModule
  ],
  declarations: [AddDrinkPage]
})
export class AddDrinkPageModule {}
