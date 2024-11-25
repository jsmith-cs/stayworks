import { PropertyService } from './../../../../services/property.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// interface PropertyDetails {
//   City: string;
//   Country: string;
//   PostalCode: any;
//   Province: string;
//   address: string;
//   propertyId: number;
//   landlordId: number;
// }

@Component({
  selector: 'app-property-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-documents.component.html',
  styleUrl: './property-documents.component.css',
})
export class PropertyDocumentsComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/';
  propertyId: number = 0;
  showPropertyDocuments: boolean = false;
  loading: boolean = true;
  propertyDocuments: any[] = [];

  public landLordId = 0;

  public landLordId = 0 ;

  constructor(
    private route: ActivatedRoute,
    private PropertyService: PropertyService,
    private http: HttpClient
  ) {}

  defaultDocuments = [
    {
      docId: null,
      docType: '',
      UpdatedAt: '',
      CreatedAt: '',
      fileName: '',
      location: '',
    },
  ];

  propertyDetails = [
    {
      address: '',
      City: '',
      Country: '',
      PostalCode: '',
      Province: '',
      propertyId: 0,
      landlordId: 0,
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
    var userId = localStorage.getItem("userId");
    this.landLordId = Number( userId ? userId:0);
    this.showPropertyDocuments = false;
  }

  onClickRetrieve(a: any) {
    console.log('button Clicked');
    this.getFile(a).subscribe((blob) => {
      const fileUrl = URL.createObjectURL(blob);

      window.open(fileUrl, '_blank'); // Open the file in a new tab
    });
  }
  getFile(docId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}file/` + `${docId}`, {
      responseType: 'blob', // Receive file as a Blob
    });
  }

  loadProperty() {
    this.PropertyService.getPropertyByPropertyId(this.propertyId).subscribe({
      next: (property: any) => {
        this.propertyDetails = property;
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
          console.log(this.propertyDocuments);
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
