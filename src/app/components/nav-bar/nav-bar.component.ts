import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/autentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onHomePage() {
    this.router.navigate(['/']);
  }

  onExploreLibrary(){
    this.router.navigate(['/explore-library']);
  }

  onFAQ() {
    this.router.navigate(['/faq']);
  }

  onContactUs() {
    this.router.navigate(['/contact-us']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
