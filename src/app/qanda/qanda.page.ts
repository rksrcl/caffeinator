import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QandAService } from '../../../shared/qanda-service';
import { AuthenticationService } from '../../../shared/authentication-service';

@Component({
  selector: 'app-qanda',
  templateUrl: './qanda.page.html',
  styleUrls: ['./qanda.page.scss'],
})
export class QandaPage implements OnInit {
  questions: any[] = [];
  newAnswer = {
    text: '',
  };
  newQuestion = {
    title: '',
    description: '',
  };
  userName: string = '';

  constructor(private router: Router, private qandaService: QandAService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.fetchQuestions();
    this.loadUserData();
  }

  fetchQuestions() {
    this.qandaService.getQuestions().subscribe((questions) => {
      this.questions = questions.map((question) => ({
        ...question,
        showReply: false,
        newAnswer: '',
      }));
    });
  }

  askQuestion() {
    this.qandaService.addQuestion(this.newQuestion).then(() => {
      this.newQuestion = { title: '', description: '' };
    });
  }
  loadUserData() {
    if (this.authService.userData) {
      this.authService.getUserData(this.authService.userData.uid).subscribe((userData) => {
        if (userData) {
          this.userName = userData.displayName;
        }
      });
    }
  }
  toggleReply(question: any) {
    question.showReply = !question.showReply; // Toggle the showReply property
    if (question.showReplies) {
      // Fetch replies for the question
      this.qandaService.getRepliesForQuestion(question.id).subscribe((replies) => {
        question.replies = replies;
      });
    }
  }

  answerQuestion(questionId: string) {
    // Check if the user is logged in
    if (this.authService.isLoggedIn) {
      const answer = {
        text: this.newAnswer.text,
        userId: this.authService.userData.uid,
        timestamp: new Date(),
      };
    
      this.qandaService.addAnswerToQuestion(questionId, answer).then(() => {
        this.newAnswer.text = ''; // Clear answer input once answer is added
      });
    } else {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
    }
  
  }
  submitReply(question: any) {
    if (this.authService.isLoggedIn) {
      const answer = {
        text: question.newAnswer,
        userId: this.authService.userData.uid,
        timestamp: new Date(),
      };
  
      this.qandaService.addAnswerToQuestion(question.id, answer).then(() => {
        // Clear answer input once answer is added
        question.newAnswer = '';
        // Close the reply section
        question.showReply = false;
  
        // Fetch updated replies for the question
        this.qandaService.getRepliesForQuestion(question.id).subscribe((replies) => {
          question.replies = replies;
        });
      });
    } else {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
    }
  }
  
  
  
}
