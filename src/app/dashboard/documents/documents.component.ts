import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  constructor(private router: Router) {}
  tenantAmount: string = '2';
  selectedProvince: string = '';

  property = [
    {
      propertyId: 1,
      street_address:
        '128 jon stsssssssssssssssssssssssssss sssssssssssssssssssssssssss',
      city: 'Ottawa',
      province: 'Ontario',
      country: 'Canada',
      documents: '3 documents',
      recent_files: `assets/pdf.png`,
      file_name: 'Recent file 1',
      tenantAmount: '2',
    },
    {
      propertyId: 2,
      street_address: '256 smith st',
      city: 'Ottawa',
      province: 'Alberta',
      country: 'Canada',
      documents: '5 documents',
      recent_files: `assets/pdf.png`,
      file_name: 'Recent file 1',
      tenantAmount: '2',
    },
    {
      propertyId: 3,
      street_address: '384 oak st',
      city: 'Ottawa',
      province: 'Ontario',
      country: 'Canada',
      documents: '2 documents',
      recent_files: `assets/pdf.png`,
      file_name: 'Recent file 1',
      tenantAmount: '2',
    },
  ];


  getUniqueProvinces() {
    return [...new Set(this.property.map((property) => property.province))];
  }

  onProvinceChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedProvince = target.value;
    console.log('Selected province:', this.selectedProvince);
  }

  onPropertyClick(id: number) {
    console.log('Clicked property:', id);
    this.router.navigate(['/dashboard/pdocs', id]);
  }

  onAddPropertyClick() {
    console.log('Clicked add property');
  }

  onResetFilter(){
    this.selectedProvince = '';
  }
}
