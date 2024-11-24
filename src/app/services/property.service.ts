import { map, Observable } from 'rxjs';
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
  private idApi = 'http://localhost:3000';

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
    return this.http.get<Property>(`${this.idApi}/getProperty/${id}`, {
      headers: this.getHeaders(),
    });
  }
  getPropertyByProvince(province: string) {
    return this.http.get<Property>(`${this.idApi}/getPropertyByCity/${province}`, {
      headers: this.getHeaders(),
    });
  }

  getPropertyDocuments(id: number) {
    return this.http.get<Property>(`${this.idApi}/listFiles/${id}`, {
      headers: this.getHeaders(),
      responseType: 'json',
    });
  }
}
