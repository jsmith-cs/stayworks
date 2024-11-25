import { Component, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PropertyService } from '@app/services/property.service';
import { BehaviorSubject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  private destroy$ = new BehaviorSubject<boolean>(false);
  private propertiesSubject = new BehaviorSubject<any[]>([]); 
  properties$ = this.propertiesSubject.asObservable();

  provinces: any[] = [];
  tenantAmount: string = '2';
  selectedProvince: string = '';
  loading: boolean = true;
  error: string | null = null;
  property: any[] = [];
  allProperties: any[] = [];

  uniqueProvinces = this.properties$.pipe(
    map((properties: any) => [...new Set(properties.map((property: any) => property.Province))].sort()),
  )

  constructor(
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.loadProperties();
  }
  ngOptimizedImage() {

  }

  loadProperties() {
    this.loading = true;
    this.error = null;

    this.propertyService.getProperties()
    .subscribe({
      next: (properties: any) => {
        console.log(properties);
        this.allProperties = properties;
        this.property = properties;
        this.loading = false;
        this.provinces = [...new Set(properties.map((property: any) => property.Province))].sort();
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.error = error.message;
      },
    });
  }

   getUniqueProvinces(event: Event) {
    const province = (event.target as HTMLSelectElement).value;
    this.selectedProvince = province;
    if (this.selectedProvince ) {
      this.loading = true;

     this.propertyService.getPropertyByProvince(province)
     .pipe(takeUntil(this.destroy$))
     .subscribe({
        next: (properties: any) => {
          this.property = properties;

          console.log(properties + 'PROPERTIES');
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.error = error.message;
        },
      });
    }
   
  }

  onProvinceChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedProvince = target.value;
    
    if (this.selectedProvince ) {
      this.property = this.allProperties.filter(property => property.Province === this.selectedProvince);      
    }else{ 
      this.property = this.allProperties;
    }

  }

  onPropertyClick(propertyId: number) {
    this.router.navigate(['/dashboard/property-documents/', propertyId]);
  }

  onResetFilter() {
    this.selectedProvince = '';
    this.property = this.allProperties;
  }

  onPropertyDocumentsIDClick() {
    this.router.navigate(['/property-documents']);
  }
}
