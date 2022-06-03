import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AuthGuard} from "./helpers/auth.guard";
import {ExploreazaBibliotecaComponent} from "./pages/exploreaza-biblioteca/exploreaza-biblioteca.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'exploreaza-biblioteca', component: ExploreazaBibliotecaComponent, canActivate:[AuthGuard] },
  { path: 'book/:id', component: BookDetailsComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
