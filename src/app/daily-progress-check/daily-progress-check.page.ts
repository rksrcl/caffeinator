import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProgressFormComponent } from '../progress-form/progress-form.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from 'firebase/firestore';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore'
type MyTimestamp = Timestamp;

interface DailyProgressData {
  date: MyTimestamp;
}

@Component({
  selector: 'app-daily-progress-check',
  templateUrl: './daily-progress-check.page.html',
  styleUrls: ['./daily-progress-check.page.scss'],
})
export class DailyProgressCheckPage implements OnInit {
  formLocked: boolean = false;
  lastSubmissionDate: Date;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Grab user id through FireAuth
        const userId = user.uid;
  
        // Get user's last submission date
        this.afs
          .collection('dailyprogress', ref => ref.where('userId', '==', userId).orderBy('date', 'desc').limit(1))
          .get()
          .pipe(
            finalize(() => {
              // This block will run after the observable completes (whether successful or not)
            })
          )
          .subscribe(querySnapshot => {
            if (!querySnapshot.empty) {
              const lastSubmissionData = querySnapshot.docs[0].data() as DailyProgressData;
              this.lastSubmissionDate = lastSubmissionData.date.toDate();
  
              // Determine if the form should be locked based on the last submission date
              const currentDate = new Date();
              if (this.lastSubmissionDate.toDateString() === currentDate.toDateString()) {
                this.formLocked = true; // Lock the form if submitted for the day
                this.cdr.detectChanges();
              }
              console.log('lastSubmissionDate:', this.lastSubmissionDate);
              console.log('currentDate:', currentDate);
              console.log('Dates match:', this.lastSubmissionDate.toDateString() === currentDate.toDateString());
            }
          });
      }
    });
  }
  
}
