import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/autentication.service";
import {User} from "../../models/user";
import {Role} from "../../models/role";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
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
  onAddBook(){
    this.router.navigate(['/add-book']);
  }

  onDeleteBook(){
    this.router.navigate(['/delete-book']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
