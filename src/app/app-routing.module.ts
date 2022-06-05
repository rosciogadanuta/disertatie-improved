import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AuthGuard} from "./helpers/auth.guard";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {ExploreLibraryComponent} from "./pages/explore-library/explore-library.component";
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'explore-library', component: ExploreLibraryComponent, canActivate:[AuthGuard] },
  { path: 'contact-us', component: ContactUsComponent, canActivate:[AuthGuard] },
  { path: 'faq', component: FaqComponent, canActivate:[AuthGuard] },
  { path: 'book/:id', component: BookDetailsComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
