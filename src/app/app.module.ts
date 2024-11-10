import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDocumentsComponent } from './dashboard/property-documents/property-documents.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
@NgModule({
  declarations: [PropertyDocumentsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
