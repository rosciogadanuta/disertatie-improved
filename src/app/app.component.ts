import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./models/user";
import {AuthenticationService} from "./services/autentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
