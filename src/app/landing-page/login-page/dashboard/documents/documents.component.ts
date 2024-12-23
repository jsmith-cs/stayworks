import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '@app/services/property.service';
import { BehaviorSubject, map, Observable, takeUntil } from 'rxjs';

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
  propertyId: number = 0;
  document: any[] = [];
  uniqueProvinces = this.properties$.pipe(
    map((properties: any) => [...new Set(properties.map((property: any) => property.Province))].sort()),
  )
   // File Form
   fileType = '';
  private baseUrl = 'http://localhost:3000/';
  myForm = new FormGroup({
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required]),
     fileType: new FormControl('', [Validators.required]),
   });
   public fileList = [
    {docType: "Lease", docId:1,fileName:'---',CreatedAt:''},
    {docType: "Lease",docId:2,fileName:'----',CreatedAt:''},
    {docType: "Lease",docId:3,fileName:'---',CreatedAt:''},
    {docType: "Lease",docId:4,fileName:'---',CreatedAt:''}
  ];


   onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private http : HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.propertyId = +params['propertyId'];
      console.log('Property ID:', this.propertyId);
        this.loading = false;
    });
    this.loadProperties();
    this.refreshDocList();
  }




  loadProperties() {
    this.loading = true;
    this.error = null;

    this.propertyService.getProperties()
    .subscribe({
      next: (properties: any) => {
        this.allProperties = properties;
        this.property = properties;

        this.getListFiles().subscribe((documents: any)=> {
          
          const doc = documents.reduce((acc: any, doc: any) => {
            acc[doc.propertyId] = doc;
            console.log(acc);
            return acc;
          }, {} as { [key: number]: any });

          properties.forEach((property: any) => {

              this.http.get(`${this.baseUrl}/listFiles/${property.propertyId}`,{ responseType: 'json' })
              .subscribe((data: any)  => {
                this.fileList = [...this.fileList, ...data]
              })
          });

        })

        this.loading = false;
        this.provinces = [...new Set(properties.map((property: any) => property.Province))].sort();
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.error = error.message;
      },
    });

    this.propertyService.getPropertyDocuments
    
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

  refreshDocList()
  {
    this.getListFiles().subscribe((data)=> {
      this.fileList = data;
      console.log(this.fileList);
    }
    
    );
  }
  getListFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}listFiles/${this.propertyId}`,{
      responseType:'json'
    });
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
  onFileClick (docId: number) {
      this.http.get(`${this.baseUrl}file/` + `${docId}`, { responseType: 'blob' })
      .subscribe((data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
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
