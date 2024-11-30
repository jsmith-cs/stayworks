import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { AuthService } from '../../../../services/auth.service';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MaintenanceFormComponent,
    FormsModule
  ]
})
export class MaintenanceRequestComponent implements OnInit {
  maintenanceRequests: any[] = [];
  showForm = false;
  selectedRequest: any = {};
  properties: any[] = [
    {'id': 1, 'name': '123 Main St'},
    {'id': 2, 'name': '283 Clark Blvd'},
    {'id': 3, 'name': '5738 Fairview St'},
  ];

  constructor(
    private maintenanceService: MaintenanceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMaintenanceRequests();
  }

  loadMaintenanceRequests() {
    this.maintenanceService.getMaintenanceRequests().subscribe(
      data => {
        console.log('Maintenance requests loaded:', data);
        this.maintenanceRequests = data;
      },
      error => console.error('Error loading maintenance requests', error)
    );
  }

  showAddForm() {
    this.selectedRequest = {};
    this.showForm = true;
  }

  editRequest(request: any) {
    console.log('Editing request:', request);
    this.selectedRequest = { ...request };
    this.showForm = true;
  }

  confirmDeleteRequest(id: number) {
    const request = this.maintenanceRequests.find(r => r.id === id);
    if (request) {
      const confirmMessage = `Are you sure you want to delete the maintenance request "${request.title}"?`;
      if (confirm(confirmMessage)) {
        this.deleteRequest(id);
      }
    }
  }

  deleteRequest(id: number) {
    this.maintenanceService.deleteMaintenanceRequest(id).subscribe(
      () => {
        console.log('Maintenance request deleted successfully');
        this.loadMaintenanceRequests();
      },
      error => console.error('Error deleting maintenance request', error)
    );
  }

  saveRequest(request: any) {
    const landlordId = this.authService.getUserId();
    if (landlordId) {
      request.landlord_ID = Number(landlordId);
      
      if (request.id) {
        this.maintenanceService.updateMaintenanceRequest(request).subscribe(
          (updatedRequest) => {
            console.log('Maintenance request updated successfully:', updatedRequest);
            this.loadMaintenanceRequests();
            this.cancelForm();
          },
          error => {
            console.error('Error updating maintenance request', error);
          }
        );
      } else {
        this.maintenanceService.createMaintenanceRequest(request).subscribe(
          (newRequest) => {
            console.log('Maintenance request added successfully:', newRequest);
            this.loadMaintenanceRequests();
            this.cancelForm();
          },
          error => {
            console.error('Error adding maintenance request', error);
          }
        );
      }
    } else {
      console.error('No landlord ID found');

    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedRequest = {};
  }

  logout() {
    this.authService.logout();
  }

  updateRequestStatus(request: any) {
    this.maintenanceService.updateMaintenanceRequest(request).subscribe(
      () => {
        console.log('Maintenance request status updated successfully');
        this.loadMaintenanceRequests();
      },
      error => console.error('Error updating maintenance request status', error)
    );
  }
}