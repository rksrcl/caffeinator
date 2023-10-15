// import { DatePipe } from '@angular/common';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticationService } from "../../../shared/authentication-service";
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  showAllDrinks: boolean = false;
  caffeineData: any[] = [];
  userName: string;
  userInput: string = '';
  userInputs: any[] = [];

  currentDayCaffeine: number = 0;

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
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // Today's date (YYYY-MM-dd)

    this.db
      .list('drinks', (ref) =>
        ref
          .orderByChild('timestamp')
          .startAt(currentDate)
          .endAt(currentDate + '\uf8ff')
      )
      .valueChanges()
      .subscribe((data: any[]) => {
        console.log('Retrieved data:', data);
        this.caffeineData = data;
        this.calculateCurrentDayCaffeine();
      });

  }

  calculateCurrentDayCaffeine() {
    this.currentDayCaffeine = this.caffeineData.reduce(
      (total, drink) => total + drink.caffeine,
      0
    );
  }

  toggleShowAllDrinks() {
    this.showAllDrinks = !this.showAllDrinks;
    if (this.showAllDrinks) {
      this.retrieveAllCaffeineData();
    } else {
      this.caffeineData = [];
      this.retrieveCaffeineData();
    }
  }
  retrieveAllCaffeineData() {
    if (this.showAllDrinks) {
      // Retrieve all drinks without date filtering
      this.db
        .list('drinks', (ref) => ref.orderByChild('timestamp'))
        .valueChanges()
        .subscribe((data: any[]) => {
          this.caffeineData = data;
        });
    }
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