import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {MainComponent} from './main/main.component';
import {PostsComponent} from './main/posts/posts.component';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from './services/user.service';
import {AuthGuard} from './auth/auth.guard';
import {ReactiveFormsModule} from '@angular/forms';
import {ArticleService} from './services/article.service';
import {FollowerService} from './services/follower.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatProgressSpinnerModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './error/error.component';
import {CommonModule} from '@angular/common';

const appRoutes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PostsComponent,
    ProfileComponent,
    ErrorComponent
  ],
  imports: [RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    CommonModule
  ],
  exports: [PostsComponent,
    LoginComponent,
    RouterModule],
  providers: [UserService, ArticleService, FollowerService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})

export class AppModule {
}

