import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';

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
    "hotshortflatwhite": 130,
    "hottallflatwhite": 130,
    "hotgrandeflatwhite": 195,
    "hotventiflatwhite": 195,
    "hotshortamericano": 75,
    "hottallamericano": 150,
    "hotgrandeamericano": 225,
    "hotventiamericano": 300,
    "hotshortbrewedpike": 155,
    "hottallbrewedpike": 235,
    "hotgrandebrewedpike": 310,
    "hotventibrewedpike": 410,
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
  };
  

  constructor(private db: AngularFireDatabase) {}

  addDrink() {
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
        
      });

      // Reset form fields
      this.drinkName = '';
      this.drinkTemperature = '';
      this.drinkSize = null;
    } else {
      // Handle invalid input
      console.error('Invalid input. Please try again.');
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
