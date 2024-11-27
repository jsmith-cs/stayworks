import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';

import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { blob } from "stream/consumers";
import { TenantService } from '../../../../services/tenant.service';
import { AuthService } from '../../../../services/auth.service';
import { TenantFormComponent } from '../tenant-list/tenant-form/tenant-form.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    MatButtonModule,
    ButtonModule,
    SidebarModule,
    SplitterModule,
    MenubarModule,
    CommonModule,
    CardModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    TableModule, //Needed for forms
    TenantFormComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
   //Property Id goes here or Change Pid at Init
   public pId = 1;
   public landLordId = 1 ;
   tenants: any[] = [];
   showForm = false;
   public currentPropertyInfo = {
    address:""
   };
   selectedTenant: any = {};


   private baseUrl = 'http://localhost:3000/';
   public propertyList = [{propertyId:0,address: "---", City:1,Country:'---',PostalCode:'---'},];
   public fileList = [
     {docType: "Lease", docId:1,fileName:'---',CreatedAt:''},
     {docType: "Lease",docId:2,fileName:'----',CreatedAt:''},
     {docType: "Lease",docId:3,fileName:'---',CreatedAt:''},
     {docType: "Lease",docId:4,fileName:'---',CreatedAt:''}
   ];

   //Property Form
   propertyForm = new FormGroup({
     address: new FormControl('', [Validators.required]),
     city: new FormControl('', [Validators.required]),
     province: new FormControl('', [Validators.required]),
     country: new FormControl('', [Validators.required]),
     postalCode: new FormControl('', [Validators.required]),
 });



   // File Form
   fileType = '';
   myForm = new FormGroup({
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required]),
     fileType: new FormControl('', [Validators.required]),
   });




  constructor(private primengConfig: PrimeNGConfig,private http: HttpClient,private tenantService: TenantService,
    private authService: AuthService) {



  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    var userId = localStorage.getItem("userId");
    this.landLordId = Number( userId ? userId:0);
    this.refreshDocList();
    this.refreshPropertyList()
    
   
    // console.log(this.landLordId);
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 

  //file submit
  submit(){
    const formData = new FormData();
  
    const fileSourceValue = this.myForm.get('fileSource')?.value;
    var fileType1 = this.myForm.value.fileType;
    if (fileSourceValue !== null && fileSourceValue !== undefined && fileType1 !== undefined  && fileType1 !== null 
      && this.pId !== null && this.pId !== undefined) {
        formData.append('file', fileSourceValue);
        formData.append('fileType',fileType1);
        formData.append('propertyId',this.pId.toString());

    }
    this.http.post(`${this.baseUrl}upload/`, formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
        this.refreshDocList();
      })

    
  }

  onClickRetrieve(a:any){
    console.log("button Clicked");
    this.getFile(a).subscribe((blob) => {
      const fileUrl = URL.createObjectURL(blob);

      window.open(fileUrl, '_blank');  // Open the file in a new tab
    });
  }

  //Return Single File
  getFile(docId: string): Observable<Blob> {
    
    return this.http.get(`${this.baseUrl}file/`+`${docId}`, {
      responseType: 'blob' // Receive file as a Blob
    });
  }

  //getList of Files for Property
  getListFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}listFiles/${this.pId}`,{
      responseType:'json'
    });
  }

  //Refresh the list
  refreshDocList()
  {
    this.getListFiles().subscribe((data)=> {
      this.fileList = data;
      console.log(this.fileList);
    }
    
    );
  }


  //Property submit
  submitProperty(){
    const formData2 = new FormData();


    //Pass the form data here
    
    var address = this.propertyForm.value.address;
    var city = this.propertyForm.value.city;
    var province = this.propertyForm.value.province;
    var country = this.propertyForm.value.country;
    var postalCode = this.propertyForm.value.postalCode;
    var landLordId = this.landLordId.toString();

    if (address !== null && address !== undefined && city !== undefined  && city !== null 
      && province !== null && province !== undefined && country !== null && country !== undefined
      && landLordId !== null && landLordId !== undefined
      && postalCode !== null && postalCode !== undefined) {
        formData2.append('address', address);
        formData2.append('city',city);
        formData2.append('province',province);
        formData2.append('country',country);
        formData2.append('postalCode',postalCode);
        formData2.append('landLordId',landLordId);
        
        formData2.forEach((value, key) => {
          console.log(`${key}: ${value}`);
      });
       
    }

    this.http.post(`${this.baseUrl}newProperty/`, formData2)
    .subscribe(res => {
      console.log(res);
      alert('Uploaded Successfully.');
      this.refreshPropertyList();
    })

  }


  //getList of Properties
  getListProperties(): Observable<any> {
    return this.http.get(`${this.baseUrl}getProperties/${this.landLordId}`,{
      responseType:'json'
    });
  }

  refreshPropertyList()
  {
    this.getListProperties().subscribe((data)=> {
      this.propertyList = data;
      console.log(this.propertyList);
    }
    
    );
  }

  getProperty(): Observable<any> {
    return this.http.get(`${this.baseUrl}getProperty/${this.pId}`,{
      responseType:'json'
    });
  }

  onClickRetrieveProperty(pId:any){
    console.log(pId);
    this.pId = pId;
    this.getProperty().subscribe((data)=> {
      this.currentPropertyInfo = data;
    });
  }

  // Add Tenant Form Here

  showAddForm() {
    let a = document.getElementById("btnTenants");
    if (a)
    {
      a.setAttribute('data-dismiss','modal');
    }
    this.selectedTenant = {};
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.selectedTenant = {};
  }
  
  saveTenant(tenant: any) {
    tenant.landlord_ID = this.authService.getUserId();
    tenant.pId = this.pId;
    
    if (tenant.id) {
      this.tenantService.updateTenant(tenant.id, tenant).subscribe(
        (updatedTenant) => {
          console.log('Tenant updated successfully:', updatedTenant);
          // this.loadTenants();
          this.cancelForm();
        },
        error => {
          console.error('Error updating tenant', error);
        }
      );
    } else {
      this.tenantService.addTenant(tenant).subscribe(
        (newTenant) => {
          console.log('Tenant added successfully:', newTenant);
          // this.loadTenants();
          this.cancelForm();
        },
        error => {
          console.error('Error adding tenant', error);
        }
      );
    }
  }

  
  title = 'stayworks_test';
}
