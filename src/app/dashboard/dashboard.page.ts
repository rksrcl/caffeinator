// import { DatePipe } from '@angular/common';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from "../../../shared/authentication-service";
import { DiaryService } from "../../../shared/diary-service"; // Import your DiaryService
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppointmentBookingComponent } from '../appointment-booking/appointment-booking.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string;
  userInput: string = '';
  userInputs: any[] = [];
  showPastEntries: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private diaryService: DiaryService, // Inject your DiaryService
    private router: Router,
    private cdr: ChangeDetectorRef

  ) { 
    this.userInputs = [];
  }

  ngOnInit() {
    this.authService.getUserData(this.authService.userData.uid).subscribe(userData => {
      if (userData) {
        this.userName = userData.displayName; // Update the user's name
        this.fetchPastEntries();
      } else {
        // Redirect user to login page if not logged in
        this.router.navigate(['/login']); 
      }
    });
  }

  async addEntry() {
    if (this.userInput.trim() !== '') {
      try {
        await this.addDiaryEntry(this.userInput);
        if (this.showPastEntries) {
          this.userInputs.unshift({
            entry: this.userInput,
            timestamp: new Date(), // You can use the current date as the timestamp
          });
        }
        this.userInput = ''; // Clear the input after adding
      } catch (error) {
        console.error('Error adding diary entry:', error);
      }
    }
  }
  

  async togglePastEntries() {
    if (this.showPastEntries) {
      this.showPastEntries = false;
      this.userInputs = []; // Clear the userInputs array
    } else {
      try {
        this.showPastEntries = true;
        this.fetchPastEntries(); // Fetch entries using the async method
      } catch (error) {
        console.error('Error fetching past entries:', error);
      }
    }
  }
  
  

  async addDiaryEntry(entry: string): Promise<void> {
    try {
      await this.diaryService.addDiaryEntry(entry); // Call your DiaryService method to add the entry
    } catch (error) {
      console.error('Error adding diary entry:', error);
      throw error;
    }
  }

  updateUserName() {
    this.authService.getUserData(this.authService.userData.uid).pipe(take(1)).subscribe(userData => {
      if (userData) {
        this.userName = userData.displayName;
      }
    });
  }

async fetchPastEntries() {
  this.userInputs = []; // Clear the userInputs array before fetching entries
  if (this.showPastEntries) {
    try {
      const entries = await this.diaryService.getDiaryEntries().toPromise(); // Fetch entries
      this.userInputs = entries.map(entry => ({
        entry: entry.entry,
        timestamp: entry.timestamp.toDate()
      }));
    } catch (error) {
      console.error('Error fetching past entries:', error);
    }
  } else {
    this.userInputs = []; // Clear the userInputs when not showing past entries
  }
}
  
}


