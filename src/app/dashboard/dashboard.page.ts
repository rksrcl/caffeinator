// import { DatePipe } from '@angular/common';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticationService } from "../../../shared/authentication-service";
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  caffeineData: any[] = [];
  userName: string;
  userInput: string = '';
  userInputs: any[] = [];
  showPastEntries: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private db: AngularFireDatabase,
    private cdr: ChangeDetectorRef

  ) { 
    this.userInputs = [];
  
  }
  goToAddDrinkPage() {
    this.router.navigate(['/add-drink']);
  }
  ionViewDidEnter() {
    this.retrieveCaffeineData();
  }


  retrieveCaffeineData() {
    this.db
      .list('drinks', (ref) => ref.orderByChild('timestamp'))
      .valueChanges()
      .subscribe((data: any[]) => {
        this.caffeineData = data;
      });
  }

  


/*
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
*/
ngOnInit() {
  if (this.authService.userData) {
    this.authService.getUserData(this.authService.userData.uid).subscribe(userData => {
      console.log('Fetched user data:', userData);
      if (userData) {
        this.userName = userData.displayName; // Update the user's name
        this.cdr.detectChanges(); // Manually trigger change detection
      } else {
        // Redirect user to login page if not logged in
        this.router.navigate(['/login']); 
      }
    });
  } else {
    // Redirect user to login page if not logged in
    this.router.navigate(['/login']); 
  }
}

  

  updateUserName() {
    this.authService.getUserData(this.authService.userData.uid).pipe(take(1)).subscribe(userData => {
      if (userData) {
        this.userName = userData.displayName;
      }
    });
  }

  
}


