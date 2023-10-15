import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-drink',
  templateUrl: 'add-drink.page.html',
  styleUrls: ['add-drink.page.scss'],
})
export class AddDrinkPage {
  drinkName: string;
  drinkTemperature: string;
  drinkSize: number;
  drinkDictionary: { [name: string]: number } = {
    "hotshortlatte": 75,
    "hottalllatte": 75,
    "hotgrandelatte": 150,
    "hotventilatte": 150,
    "hotshortflatwhite": 130,
    "hottallflatwhite": 130,
    "hotgrandeflatwhite": 195,
    "hotventiflatwhite": 195,
    "hotshortamericano": 75,
    "hottallamericano": 150,
    "hotgrandeamericano": 225,
    "hotventiamericano": 300,
    "hotshortpike": 155,
    "hottallpike": 235,
    "hotgrandepike": 310,
    "hotventipike": 410,
    "hotshortdark": 130,
    "hottalldark": 195,
    "hotgrandedark": 260,
    "hotventidark": 340,
    "hotshortchai": 50,
    "hottallchai": 70,
    "hotgrandechai": 95,
    "hotventichai": 120,
    "hotshortbrewedblacktea": 40,
    "hottallbrewedblacktea": 40,
    "hotgrandebrewedblacktea": 40,
    "hotventibrewedblacktea": 40,
    "hotshortbrewedgreentea": 25,
    "hottallbrewedgreentea": 25,
    "hotgrandebrewedgreentea": 25,
    "hotventibrewedgreentea": 25,
    "hotshortherbaltea": 0,
    "hottallherbaltea": 0,
    "hotgrandeherbaltea": 0,
    "hotventiherbaltea": 0,
    "icedtalllatte": 75,
    "icedgrandelatte": 150,
    "icedventilatte": 225,
    "icedtallflatwhite": 90,
    "icedgrandeflatwhite": 130,
    "icedventiflatwhite": 175,
    "icedtallcold brew": 155,
    "icedgrandecold brew": 205,
    "icedventicold brew": 310,
    "icedtrentacold brew": 360,
    "icedtallnitro cold brew": 215,
    "icedgrandenitro cold brew": 280,
    "icedtallamericano": 150,
    "icedgrandeamericano": 225,
    "icedventiamericano": 300,
    "icedtallshaken espresso": 170,
    "icedgrandeshaken espresso": 225,
    "icedventishaken espresso": 340,
    "icedtallbrewed coffee": 120,
    "icedgrandebrewed coffee": 165,
    "icedventicbrewed coffee": 235,
    "icedtrentabrewed coffee": 280,
    "icedtallblack tea": 25,
    "icedgrandeblack tea": 30,
    "icedventicblack tea": 45,
    "icedtrentablack tea": 55,
    "icedtallgreen tea": 25,
    "icedgrandegreen tea": 30,
    "icedventicgreen tea": 45,
    "icedtrentagreen tea": 55,
    "icedtallpassion tea": 0,
    "icedgrandepassion tea": 0,
    "icedventipassion tea": 0,
    "icedtrentapassion tea": 0,
    "icedtallrefresher": 40,
    "icedgranderefresher": 50,
    "icedventirefresher": 70,
    "icedtrentarefresher": 85,
    "icedtallcoffee-based frappuccino": 70,
    "icedgrandecoffee-based frappuccino": 100,
    "icedventicoffee-based frappuccino": 135,
    "icedtallcreme-based frappuccino": 0,
    "icedgrandecreme-based frappuccino": 0,
    "icedventicreme-based frappuccino": 0,
    
  };
  

  constructor(private db: AngularFireDatabase, private alertController: AlertController) {}

  async addDrink() {
    const timestamp = new Date().toISOString();
    const combinedInput = this.drinkTemperature + this.drinkSize + this.drinkName;
    if (this.drinkDictionary[combinedInput]) {
      const caffeineContent = this.drinkDictionary[combinedInput];

      // Store the drink data in Firebase
      this.db.list('drinks').push({
        name: this.drinkName,
        temperature: this.drinkTemperature,
        size: this.drinkSize,
        caffeine: caffeineContent,
        timestamp: timestamp,
        
      });
      this.drinkName = '';
      this.drinkTemperature = '';
      this.drinkSize = null;
    } else {
      // Handle invalid input
      console.error('Invalid input. Please try again.');
      const alert = await this.alertController.create({
        header: 'Invalid Input',
        message: 'Please enter a valid drink combination.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  isFormValid(): boolean {
    return (
      this.drinkName &&
      this.drinkTemperature &&
      (this.drinkSize > 0 && this.drinkSize <= 100)
    );
  }

  calculateCaffeineContent(): number {
    // Your caffeine content calculation logic here
    // You can use the drinkTemperature and drinkSize values
    return 0; // Replace with your calculation
  }
}
