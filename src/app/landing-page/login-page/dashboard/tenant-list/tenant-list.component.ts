import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TenantService } from '../../../../services/tenant.service';
import { AuthService } from '../../../../services/auth.service';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { TenantViewComponent } from './tenant-view/tenant-view.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TenantFormComponent,
    TenantViewComponent
  ]
})
export class TenantListComponent implements OnInit {
  tenants: any[] = [];
  showForm = false;
  showViewPanel = false;
  selectedTenant: any = {};

  constructor(
    private tenantService: TenantService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getTenants().subscribe(
      data => {
        console.log('Tenants loaded:', data);
        this.tenants = data;
      },
      error => console.error('Error loading tenants', error)
    );
  }

  showAddForm() {
    this.selectedTenant = {};
    this.showForm = true;
  }

  editTenant(tenant: any) {
    console.log('Editing tenant:', tenant);
    this.tenantService.getTenant(tenant.id).subscribe(
      (data) => {
        this.selectedTenant = this.formatTenantForForm(data);
        this.showForm = true;
      },
      error => console.error('Error fetching tenant details', error)
    );
  }

  viewTenant(tenant: any) {
    this.selectedTenant = tenant;
    this.showViewPanel = true;
  }

  formatTenantForForm(tenant: any) {
    const formatDate = (dateString: string) => {
      if (!dateString) return { day: '', month: '', year: '' };
      const date = new Date(dateString);
      return {
        day: date.getDate(),
        month: this.getMonthName(date.getMonth()),
        year: date.getFullYear()
      };
    };

    const dob = formatDate(tenant.date_of_birth);
    const leaseStart = formatDate(tenant.lease_start_date);
    const leaseEnd = formatDate(tenant.lease_end_date);
    const leaseSigned = formatDate(tenant.lease_signed);

    return {
      id: tenant.id,
      firstName: tenant.first_name,
      lastName: tenant.last_name,
      email: tenant.email,
      phone: tenant.phone,
      dobDay: dob.day,
      dobMonth: dob.month,
      dobYear: dob.year,
      streetAddress: tenant.street_address,
      city: tenant.city,
      province: tenant.province,
      postalCode: tenant.postal_code,
      leaseStartDay: leaseStart.day,
      leaseStartMonth: leaseStart.month,
      leaseStartYear: leaseStart.year,
      leaseEndDay: leaseEnd.day,
      leaseEndMonth: leaseEnd.month,
      leaseEndYear: leaseEnd.year,
      rentAmount: tenant.rent_amount,
      securityDeposit: tenant.security_deposit,
      emergencyContactName: tenant.emergency_contact_name,
      emergencyContactPhone: tenant.emergency_contact_phone,
      occupation: tenant.occupation,
      employer: tenant.employer,
      hasPets: tenant.has_pets,
      petDetails: tenant.pet_details,
      leaseSignedDay: leaseSigned.day,
      leaseSignedMonth: leaseSigned.month,
      leaseSignedYear: leaseSigned.year
    };
  }

  getMonthName(monthIndex: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  }

  confirmDeleteTenant(id: number) {
    const tenant = this.tenants.find(t => t.id === id);
    if (tenant) {
      const confirmMessage = `Are you sure you want to delete the tenant ${tenant.first_name} ${tenant.last_name}?`;
      if (confirm(confirmMessage)) {
        this.deleteTenant(id);
      }
    }
  }

  deleteTenant(id: number) {
    this.tenantService.deleteTenant(id).subscribe(
      () => {
        console.log('Tenant deleted successfully');
        this.loadTenants();
      },
      error => console.error('Error deleting tenant', error)
    );
  }

  saveTenant(tenant: any) {
    tenant.landlord_ID = this.authService.getUserId();
    
    if (tenant.id) {
      this.tenantService.updateTenant(tenant.id, tenant).subscribe(
        (updatedTenant) => {
          console.log('Tenant updated successfully:', updatedTenant);
          this.loadTenants();
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
          this.loadTenants();
          this.cancelForm();
        },
        error => {
          console.error('Error adding tenant', error);
        }
      );
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedTenant = {};
  }

  closeViewPanel() {
    this.showViewPanel = false;
    this.selectedTenant = {};
  }

  logout() {
    this.authService.logout();
  }
}