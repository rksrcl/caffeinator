import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../shared/authentication-service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string;
  constructor(
    public authService: AuthenticationService
  ) { }
  async ngOnInit() {
    const userData = await this.authService.getUserData();
  
    if (userData) {
      this.userName = userData.displayName;
    }
  }
  
}