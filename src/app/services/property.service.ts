import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

interface Property {
  id?: number;
  address: string;
  city: string;
  province: string;
  country: string;
}

interface IAuthService {
  getToken(): string | null;
  logout(): void;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:5000/api/RentalProperty';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  getProperties() {
    return this.http.get<Property>(`${this.apiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  getPropertyById(id: number) {
    return this.http.get<Property>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}