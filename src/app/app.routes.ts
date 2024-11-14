import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PricingPageComponent } from './landing-page/pricing-page/pricing-page.component';
import { FeaturesPageComponent } from './landing-page/features-page/features-page.component';
import { SignupPageComponent } from './landing-page/signup-page/signup-page.component';
import { LoginPageComponent } from './landing-page/login-page/login-page.component';
import { AboutusPageComponent } from './landing-page/aboutus-page/aboutus-page.component';
import { ContactusPageComponent } from './landing-page/contactus-page/contactus-page.component';
import { DashboardComponent } from './landing-page/login-page/dashboard/dashboard.component';
import { TenantListComponent } from './landing-page/login-page/dashboard/tenant-list/tenant-list.component';
import { TermsAndConditionsComponent } from './landing-page/terms-and-conditions/terms-and-conditions.component';
import { AuthGuard } from './guards/auth.guard';
import { PropertyDocumentsComponent } from './landing-page/login-page/dashboard/property-documents/property-documents.component';
import { ContractorsComponent } from './landing-page/login-page/dashboard/contractors/contractors.component';
import { DocumentsComponent } from './landing-page/login-page/dashboard/documents/documents.component';
import { ProfileComponent } from './landing-page/login-page/dashboard/profile/profile.component';
import { PropertiesComponent } from './landing-page/login-page/dashboard/properties/properties.component';
import { OverviewComponent } from './landing-page/login-page/dashboard/overview/overview.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'documents',
        component: DocumentsComponent,
        children: [
          { path: 'property-documents', component: PropertyDocumentsComponent },
        ],
      },
      { path: 'property-management', component: PropertiesComponent },
      { path: 'contractors', component: ContractorsComponent },
    ],
  },
  {
    path: 'tenant-management',
    component: TenantListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutusPageComponent },
  { path: 'contact', component: ContactusPageComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
];
