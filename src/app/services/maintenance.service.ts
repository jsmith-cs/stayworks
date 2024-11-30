import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface MaintenanceRequest {
  id?: number;
  title: string;
  description: string;
  property_name: string;
  unit_number?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  landlord_ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private readonly apiUrl = 'http://localhost:5000/api/Maintenance';

  constructor(private readonly http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  getMaintenanceRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(
      `${this.apiUrl}/maintenance-requests`, 
      { headers: this.getHeaders() }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createMaintenanceRequest(request: MaintenanceRequest): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(
      `${this.apiUrl}/maintenance-requests`, 
      request, 
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateMaintenanceRequest(request: MaintenanceRequest): Observable<MaintenanceRequest> {
    return this.http.put<MaintenanceRequest>(
      `${this.apiUrl}/maintenance-requests/${request.id}`, 
      request, 
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteMaintenanceRequest(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/maintenance-requests/${id}`, 
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }
}