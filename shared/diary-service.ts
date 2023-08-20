/*
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from './authentication-service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import 'firebase/firestore'; // Import Firestore-specific features

import firebase from 'firebase/compat/app';
import 'firebase/firestore'; // Importing specific Firestore features

// ...

timestamp: firebase.firestore.FieldValue.serverTimestamp()


@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor(
    private authService: AuthenticationService,
    private firestore: AngularFirestore
  ) {}

  addDiaryEntry(entry: string): Promise<void> {
    return this.authService.user.pipe(take(1)).toPromise().then(user => {
      if (user) {
        const diaryCollection = this.firestore.collection(`users/${user.uid}/diary_entries`);
        return diaryCollection.add({
          userId: user.uid,
          entry,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      throw new Error('User not logged in.');
    });
  }

  editDiaryEntry(entryId: string, newEntry: string): Promise<void> {
    return this.authService.user.pipe(take(1)).toPromise

*/

import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor(
    private authService: AuthenticationService,
    private firestore: AngularFirestore
  ) {}

  async addDiaryEntry(entry: string): Promise<void> {
    const user = await this.authService.getUserData(this.authService.userData.uid).pipe(take(1)).toPromise();
    if (user) {
      const diaryCollection = this.firestore.collection(`users/${user.uid}/diary_entries`);
      await diaryCollection.add({
        userId: user.uid,
        entry,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      throw new Error('User not logged in.');
    }
  }

  async editDiaryEntry(entryId: string, newEntry: string): Promise<void> {
    const user = await this.authService.getUserData(this.authService.userData.uid).pipe(take(1)).toPromise();
    if (user) {
      const diaryEntryRef = this.firestore.doc(`users/${user.uid}/diary_entries/${entryId}`);
      await diaryEntryRef.update({
        entry: newEntry,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      throw new Error('User not logged in.');
    }
  }

  getDiaryEntries(): Observable<any[]> {
    return this.authService.getUserData(this.authService.userData.uid).pipe(
      switchMap(user => {
        console.log('User:', user); // Log user information
  
        if (user) {
          const entries$ = this.firestore.collection(`users/${user.uid}/diary_entries`, ref => ref.orderBy('timestamp', 'desc'))
            .valueChanges();
  
          entries$.subscribe(entries => {
            console.log('Fetched entries:', entries); // Log fetched entries
          });
  
          return entries$;
        } else {
          return of([]);
        }
      }),
      take(1)
    );
  }
  
  
}
