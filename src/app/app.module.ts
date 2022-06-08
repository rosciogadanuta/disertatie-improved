import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./helpers/jwt.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import {fakeBackendProvider} from "./helpers/fake-backend";
import {HomePageComponent} from './pages/home-page/home-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FilterPipe} from "./pipes/filer.pipe";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {BookComponent} from './components/book/book.component';
import {BookDetailsComponent} from './pages/book-details/book-details.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReserveBookDialogComponent} from './components/reserve-book-dialog/reserve-book-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FaqComponent} from './pages/faq/faq.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {ExploreLibraryComponent} from "./pages/explore-library/explore-library.component";
import {AddBookComponent} from './pages/add-book/add-book.component';
import {DeleteBookComponent} from './pages/delete-book/delete-book.component';
import {MatSelectModule} from "@angular/material/select";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    FilterPipe,
    ExploreLibraryComponent,
    NavBarComponent,
    BookComponent,
    BookDetailsComponent,
    ReserveBookDialogComponent,
    FaqComponent,
    ContactUsComponent,
    AddBookComponent,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    NgxMatFileInputModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
