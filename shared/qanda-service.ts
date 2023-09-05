import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QandAService {
  private questionsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.questionsCollection = this.firestore.collection('questions');
  }

  getQuestions(): Observable<any[]> {
    return this.questionsCollection.valueChanges();
  }

  addQuestion(question: any) {
    return this.questionsCollection.add(question);
  }

  addAnswerToQuestion(questionId: string, answer: any) {
    return this.firestore
      .collection('questions')
      .doc(questionId)
      .collection('answers')
      .add(answer);
  }  
  
  getRepliesForQuestion(questionId: string) {
    return this.firestore
      .collection('questions')
      .doc(questionId)
      .collection('answers')
      .valueChanges();
  }
  
  

  // You can add more methods for updating, deleting, and managing questions and answers here
}
