import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PropertyDocumentsComponent } from './property-documents/property-documents.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { DocumentsComponent } from './documents/documents.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertiesComponent } from './properties/properties.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DashboardComponent,
    PropertyDocumentsComponent,
    ContractorsComponent,
    DocumentsComponent,
    OverviewComponent,
    ProfileComponent,
    PropertiesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
})
export class DashboardModule {}
