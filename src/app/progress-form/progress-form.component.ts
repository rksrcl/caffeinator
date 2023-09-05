import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-progress-form',
  templateUrl: './progress-form.component.html',
  styleUrls: ['./progress-form.component.scss'],
})
export class ProgressFormComponent implements OnInit {
  @Input() formLocked: boolean;

  progressForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private cdr: ChangeDetectorRef) {
    this.progressForm = this.fb.group({
      // Define form controls
      feelings: ['', [Validators.required]],
      additionalNotes: ['', [Validators.required]],
      followed: ['false', [Validators.required]],
    });
  }

  ngOnInit() {
    const storedFormLocked = sessionStorage.getItem('formLocked');
    const storedTimestamp = sessionStorage.getItem('lockTimestamp');
  
    if (storedFormLocked === 'true' && storedTimestamp) {
      const currentDate = new Date();
      const storedDate = new Date(Number(storedTimestamp));
      
      if (storedDate.toDateString() === currentDate.toDateString()) {
        this.formLocked = true;
      } else {
        this.formLocked = false;
        sessionStorage.removeItem('formLocked');
        sessionStorage.removeItem('lockTimestamp');
      }
    }
  }
  

  submitForm() {
    console.log(this.progressForm.valid);
    if (this.progressForm.valid) {
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);
  
      const formData = {
        date: currentDate,
        feelings: this.progressForm.value.feelings,
        additionalNotes: this.progressForm.value.additionalNotes,
        followed: this.progressForm.value.followed,
      };
  
      this.afs.collection('dailyProgress').doc(formattedDate).set(formData)
        .then(() => {
          console.log('Document successfully written.');
          this.formLocked = true;
          sessionStorage.setItem('formLocked', 'true');
          sessionStorage.setItem('lockTimestamp', String(currentDate.getTime()));
          this.progressForm.disable();
          this.cdr.detectChanges();
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
