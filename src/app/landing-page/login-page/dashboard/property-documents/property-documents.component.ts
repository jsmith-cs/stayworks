import { PropertyService } from './../../../../services/property.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-property-documents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  public fileList = [
    { docType: 'Lease', docId: 1, fileName: '---', CreatedAt: '' },
    { docType: 'Lease', docId: 2, fileName: '----', CreatedAt: '' },
    { docType: 'Lease', docId: 3, fileName: '---', CreatedAt: '' },
    { docType: 'Lease', docId: 4, fileName: '---', CreatedAt: '' },
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
  // File Form
  fileType = '';
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    fileType: new FormControl('', [Validators.required]),
  });

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }
  submit() {
    const formData = new FormData();

    const fileSourceValue = this.myForm.get('fileSource')?.value;
    var fileType1 = this.myForm.value.fileType;
    if (
      fileSourceValue !== null &&
      fileSourceValue !== undefined &&
      fileType1 !== undefined &&
      fileType1 !== null &&
      this.propertyId !== null &&
      this.propertyId !== undefined
    ) {
      formData.append('file', fileSourceValue);
      formData.append('fileType', fileType1);
      formData.append('propertyId', this.propertyId.toString());
    }
    this.http.post(`${this.baseUrl}upload/`, formData).subscribe((res) => {
      console.log(res);
      alert('Uploaded Successfully.');
      this.refreshDocList();
    });
  }
  refreshDocList() {
    this.getListFiles().subscribe((data: any) => {
      this.fileList = data;
      if (data != null) {
        const firstDoc = data[0];
        this.fileType = firstDoc.docType;
      }
      console.log(this.fileList);
    });
  }

  getListFiles() {
    return this.http
      .get(`${this.baseUrl}listFiles/${this.propertyId}`, {
        responseType: 'json',
      })
  }

  onClickRetrieve(a: any) {
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = +params['propertyId'];
      console.log('Property ID:', this.propertyId);
      if (this.propertyId) {
        this.propertyDocuments = this.defaultDocuments;
        this.loading = false;
        this.loadProperty();
        this.loadPropertyDocuments();
        console.log(this.fileList);
      }
    });
    var userId = localStorage.getItem('userId');
    this.landLordId = Number(userId ? userId : 0);
    this.showPropertyDocuments = false;
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
