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
    "hotshortpike": 95,
    "dark": 30,
    "Cola": 40,
    // Add more drinks and caffeine content as needed
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
        timestamp: timestamp,
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
