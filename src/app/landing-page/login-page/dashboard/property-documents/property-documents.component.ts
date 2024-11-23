import { PropertyService } from './../../../../services/property.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-documents.component.html',
  styleUrl: './property-documents.component.css',
})
export class PropertyDocumentsComponent implements OnInit {
  propertyId: number | null = null;
  propertyDocuments: any[] = [];
  showPropertyDocuments: boolean = false;
  loading: boolean = true;
  propertyDetails: any[] = [];

  constructor(private route: ActivatedRoute, private PropertyService: PropertyService) {}

  documents = [
    {
      document_id: 1,
      document_name: 'Contract',
      date_uploaded: '2023-01-01',
      document_type: 'Contract',
    },
  ];

  // propertyDetails = [
  //   {
  //     address: '123 willow av',
  //     city: 'Ottawa',
  //     province: 'Ontario',
  //     country: 'Canada',
  //     postal_code: 'K2G 1V6',
  //     occupied_status: '1/2',
  //   },
  // ];

  users = [
    {
      name: 'John Doe',
      email_address: '2F9X4@example.com',
      phone_number: '123-456-7890',
      tenant_status: 'Long-Term',
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = +params['propertyId'];
      console.log("Property ID:", this.propertyId);
      if (this.propertyId){
        this.loadPropertyDocuments();
    }
    });

    this.showPropertyDocuments = false;
  }

  loadPropertyDocuments() {
  
    if (!this.propertyId) {
      return;
    }

    this.PropertyService.getPropertyById(this.propertyId).subscribe({
      next: (data: any) => {
        this.propertyDetails = data;
        this.loading = false;
      }
    })

    this.PropertyService.getPropertyDocuments(this.propertyId).subscribe({
      next: (documents: any) => {
        this.propertyDocuments = documents;
        this.loading = false;
      }
    })
  }

  
  ToggleShowPropertyDocumentsTable() {
    console.log('This is working inside the property documents component');
    this.showPropertyDocuments = !this.showPropertyDocuments;
  }

  title = 'Property Documents';
}
