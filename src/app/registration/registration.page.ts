import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication-service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  name: string;
  email: string;
  password: string;
  password2: string;
  showErrorMessage: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}
  

  signUp(name, email, password, password2){
    if (password.value !== password2.value) {
      console.log("1st password" + password.value);
      window.alert("Your passwords don't match");
    }
    else {
      this.authService.RegisterUser(email.value, password.value, name.value)
      .then((res) => {
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      });

    }

  }
}