import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing_page/landingpage.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },  // Default route for the landing page
  { path: 'login', component: LoginComponent },  // Route to login page
  { path: 'signup', component: SignupComponent },  // Route to signup page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
