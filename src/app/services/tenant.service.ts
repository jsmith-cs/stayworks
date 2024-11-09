import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

interface Tenant {
  id?: number;
  landlord_ID: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  lease_start_date: Date;
  lease_end_date: Date;
  rent_amount: number;
  security_deposit: number;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  occupation: string;
  employer: string;
  has_pets: boolean;
  pet_details: string;
  lease_signed: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = 'http://localhost:5000/api/Tenants';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  getTenants(): Observable<Tenant[]> {
    const landlordId = this.authService.getUserId();
    return this.http.get<Tenant[]>(`${this.apiUrl}?landlordId=${landlordId}`, {
      headers: this.getHeaders()
    });
  }

  getTenant(id: number): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  addTenant(tenant: any): Observable<Tenant> {
    const landlordId = this.authService.getUserId();
    const tenantData = {
      ...tenant,
      landlord_ID: parseInt(landlordId || '0', 10)
    };
    return this.http.post<Tenant>(this.apiUrl, tenantData, {
      headers: this.getHeaders()
    });
  }

  updateTenant(id: number, tenant: any): Observable<Tenant> {
    const landlordId = this.authService.getUserId();
    const tenantData = {
      ...tenant,
      landlord_ID: parseInt(landlordId || '0', 10)
    };
    return this.http.put<Tenant>(`${this.apiUrl}/${id}`, tenantData, {
      headers: this.getHeaders()
    });
  }

  deleteTenant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  private formatDate(day: string, month: string, year: string): string | null {
    if (day && month && year) {
      const monthIndex = this.getMonthIndex(month);
      return `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return null;
  }

  private getMonthIndex(monthName: string): number {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
  }

  formatTenantData(formData: any): any {
    const landlordId = this.authService.getUserId();
    return {
      id: formData.id,
      landlord_ID: parseInt(landlordId || '0', 10),
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: this.formatDate(formData.dobDay, formData.dobMonth, formData.dobYear),
      street_address: formData.streetAddress,
      city: formData.city,
      province: formData.province,
      postal_code: formData.postalCode,
      lease_start_date: this.formatDate(formData.leaseStartDay, formData.leaseStartMonth, formData.leaseStartYear),
      lease_end_date: this.formatDate(formData.leaseEndDay, formData.leaseEndMonth, formData.leaseEndYear),
      rent_amount: formData.rentAmount,
      security_deposit: formData.securityDeposit,
      emergency_contact_name: formData.emergencyContactName,
      emergency_contact_phone: formData.emergencyContactPhone,
      occupation: formData.occupation,
      employer: formData.employer,
      has_pets: formData.hasPets,
      pet_details: formData.petDetails,
      lease_signed: this.formatDate(formData.leaseSignedDay, formData.leaseSignedMonth, formData.leaseSignedYear)
    };
  }
}