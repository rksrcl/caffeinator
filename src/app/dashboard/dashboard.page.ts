import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../shared/authentication-service";
// import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string;
  userInput: string = '';
  userInputs: string[] = [];

  addEntry() {
    if (this.userInput.trim() !== '') {
      // const now = new Date();
      // const formattedDate = this.datePipe.transform(now, 'medium');
      // this.userInputs.unshift(`${formattedDate}: ${this.userInput}`);
      this.userInputs.unshift(this.userInput);
      this.userInput = ''; // Clear the input after adding
      
    }
  }
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getUserData(this.authService.userData.uid).subscribe(userData => {
      if (userData) {
        this.userName = userData.displayName; // Update the user's name
      }
    });
  }
}





