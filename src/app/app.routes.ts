import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing_page/landingpage.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ContractorsComponent } from './dashboard/contractors/contractors.component';
import { PropertyDocumentsComponent } from './dashboard/property-documents/property-documents.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/documents' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'documents/pdocs/:propertyId', component: PropertyDocumentsComponent },
      { path: 'propertymanagement', component: PropertiesComponent },
      { path: 'contractors', component: ContractorsComponent },
    ],
  },

];
