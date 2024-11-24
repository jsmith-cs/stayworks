import { PropertyService } from './../../../../services/property.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PropertyDetails {
  propertyId: number;
  address: string;
  City: string;
  Province: string;
  Country: string;
  landlordId: number;
}

@Component({
  selector: 'app-property-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-documents.component.html',
  styleUrl: './property-documents.component.css',
})
export class PropertyDocumentsComponent implements OnInit {
  [x: string]: any;
  propertyId: number = 0;
  showPropertyDocuments: boolean = false;
  loading: boolean = true;
  propertyDocuments: any[] = [];
  propertyDetails: PropertyDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private PropertyService: PropertyService
  ) {}

  defaultDocuments = [
    {
      docId: 1,
      docType: '',
      updatedAt: '',
      fileName: '',
      location: '',
    },
  ];

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
      console.log('Property ID:', this.propertyId);
      if (this.propertyId) {
        this.propertyDocuments = this.defaultDocuments;
        this.loading = false;
        this.loadProperty();
        this.loadPropertyDocuments();
      }
    });

    this.showPropertyDocuments = false;
  }

  loadProperty() {
    this.PropertyService.getPropertyById(this.propertyId).subscribe({
      next: (data: any) => {
        this.propertyDetails = data;
        console.log(this.propertyDetails + "Property Details");
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadPropertyDocuments() {
    this.loading = true;

    this.PropertyService.getPropertyDocuments(this.propertyId).subscribe({
      next: (documents: any) => {
        this.loading = true;

        if (documents && documents.length > 0) {
          this.propertyDocuments = documents;
        } else {
          this.propertyDocuments = this.defaultDocuments;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ToggleShowPropertyDocumentsTable() {
    this.showPropertyDocuments = !this.showPropertyDocuments;
  }

  title = 'Property Documents';
}
