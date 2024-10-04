import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {LandingPageComponent} from './landing_page/landingpage.component'
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '',  pathMatch: 'full', component: LandingPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent}
];

