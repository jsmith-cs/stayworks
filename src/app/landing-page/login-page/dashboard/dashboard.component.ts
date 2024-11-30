import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
<<<<<<< HEAD
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
=======
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { filter } from 'rxjs/operators';
>>>>>>> remotes/origin/rishav_branch

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    ButtonModule,
    SidebarModule,
    SplitterModule,
    MenubarModule,
    CardModule,
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
=======
  imports: [CommonModule, RouterOutlet]
>>>>>>> remotes/origin/rishav_branch
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  isInTenantManagement = false;
  private platformId = inject(PLATFORM_ID);
<<<<<<< HEAD
  sidebar_buttons: any[] = [];
=======
>>>>>>> remotes/origin/rishav_branch

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // Subscribe to router events to track current route
<<<<<<< HEAD
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
        routerLink: ['/dashboard/properties'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Contractors',
        routerLink: ['/dashboard/contractors'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Tenant Management',
        routerLink: ['/tenant-management'],
        routerLinkActive: 'router-link-active',
      }
    ];
=======
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isInTenantManagement = event.urlAfterRedirects.includes('tenant-management');
      console.log('Current route:', event.urlAfterRedirects);
      console.log('Is in tenant management:', this.isInTenantManagement);
    });
  }

  ngOnInit() {
    // Check current route on component initialization
    this.isInTenantManagement = this.router.url.includes('tenant-management');
    
>>>>>>> remotes/origin/rishav_branch
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('x-auth-token', token);
<<<<<<< HEAD
        this.http
          .get('http://localhost:5000/api/auth/user', { headers })
=======
        this.http.get('http://localhost:5000/api/auth/user', { headers })
>>>>>>> remotes/origin/rishav_branch
          .subscribe(
            (response: any) => {
              this.userId = response.id;
            },
<<<<<<< HEAD
            (error) => {
=======
            error => {
>>>>>>> remotes/origin/rishav_branch
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
<<<<<<< HEAD
    console.log("Navigating to tenant management");
    this.router.navigate(['/tenant-management']);

  }
}
=======
    this.router.navigate(['/tenant-management']);
  }

  navigateToMaintenance() {
    this.router.navigate(['/maintenance']);
  }
}
>>>>>>> remotes/origin/rishav_branch
