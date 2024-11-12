import { Component, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PropertyService } from '@app/services/property.service';


@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  tenantAmount: string = '2';
  selectedProvince: string = '';
  loading: boolean = true;
  error: string | null = null;
  property: any[] = [];

  constructor(
    private router: Router,
    private propertyService: PropertyService
  ) {}

  // property = [
  //   {
  //     propertyId: 1,
  //     street_address:
  //       '128 jon stsssssssssssssssssssssssssss sssssssssssssssssssssssssss',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '3 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 2,
  //     street_address: '256 smith st',
  //     city: 'Ottawa',
  //     province: 'Alberta',
  //     country: 'Canada',
  //     documents: '5 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 3,
  //     street_address: '384 oak st',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '2 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 3,
  //     street_address: '384 oak st',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '2 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 3,
  //     street_address: '384 oak st',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '2 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 3,
  //     street_address: '384 oak st',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '2 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  //   {
  //     propertyId: 3,
  //     street_address: '384 oak st',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     documents: '2 documents',
  //     recent_files: `assets/pdf.png`,
  //     file_name: 'Recent file 1',
  //     tenantAmount: '2',
  //   },
  // ];

  loadProperties() {
    this.loading = true;
    this.error = null;

    this.propertyService.getProperties().subscribe({
      next: (properties: any) => {
        console.log(properties);
        this.property = properties;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.error = error.message;
      },
    });
  }

  getUniqueProvinces() {
    return [...new Set(this.property.map((property) => property.province))];
  }

  onProvinceChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedProvince = target.value;
    console.log('Selected province:', this.selectedProvince);
  }

  onPropertyClick(id: number) {
    this.propertyService.getPropertyById(id).subscribe({
      next: (property: any) => {
        console.log(property);
        this.router.navigate(['property-documents', property.propertyId]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onAddPropertyClick() {
    console.log('Clicked add property');
  }

  onResetFilter() {
    this.selectedProvince = '';
  }
}
