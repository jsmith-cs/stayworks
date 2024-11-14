import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Router,
  RouterOutlet,
  RouterLink,
  NavigationEnd,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { filter } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { DocumentsComponent } from './documents/documents.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DocumentsComponent,
    MatButtonModule,
    ButtonModule,
    SidebarModule,
    SplitterModule,
    MenubarModule,
    CardModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  isInTenantManagement = false;
  private platformId = inject(PLATFORM_ID);
  sidebar_buttons: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // Subscribe to router events to track current route
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.isInTenantManagement =
          event.urlAfterRedirects.includes('tenant-management');
        console.log('Current route:', event.urlAfterRedirects);
        console.log('Is in tenant management:', this.isInTenantManagement);
      });
  }
  ngOnInit() {
    // Check current route on component initialization
    this.isInTenantManagement = this.router.url.includes('tenant-management');
    this.sidebar_buttons = [
      {
        label: 'Overview',
        routerLink: ['/dashboard/overview'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Documents',
        routerLink: ['/dashboard/documents'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Properties',
        routerLink: ['/dashboard/propertymanagement'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Contractors',
        routerLink: ['/dashboard/contractors'],
        routerLinkActive: 'router-link-active',
      },
    ];
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('x-auth-token', token);
        this.http
          .get('http://localhost:5000/api/auth/user', { headers })
          .subscribe(
            (response: any) => {
              this.userId = response.id;
            },
            (error) => {
              console.error('Error fetching user data', error);
              if (error.status === 401) {
                this.authService.logout();
              }
            }
          );
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  navigateToTenantManagement() {
    console.log("Navigating to tenant management");
    this.router.navigate(['/tenant-management']);

  }
}
