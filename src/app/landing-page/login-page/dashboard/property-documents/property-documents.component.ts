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

  constructor(private route: ActivatedRoute) {}

  documents = [
    {
      document_id: 1,
      document_name: 'Contract',
      date_uploaded: '2023-01-01',
      document_type: 'Contract',
    },
  ];

  propertyDetails = [
    {
      address: '123 willow av',
      city: 'Ottawa',
      province: 'Ontario',
      country: 'Canada',
      postal_code: 'K2G 1V6',
      occupied_status: '1/2',
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
      // this.propertyDetails();
    });

    this.showPropertyDocuments = false;
  }

  testButton() {
    console.log('This is working inside the property documents component');
  }

  ToggleShowPropertyDocumentsTable() {
    console.log('This is working inside the property documents component');
    this.showPropertyDocuments = !this.showPropertyDocuments;
  }

  title = 'Property Documents';
}
