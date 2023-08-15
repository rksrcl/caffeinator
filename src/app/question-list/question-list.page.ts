/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

*/
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {
  questions: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    // Fetch questions from Firestore
    this.firestore.collection('questions').valueChanges().subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  viewQuestion(questionId: string) {
    // Navigate to question details page with questionId
  }
}


