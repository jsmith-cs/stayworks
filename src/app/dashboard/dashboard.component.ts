import { Component, OnInit } from '@angular/core';
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
import { Card, CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { CommonModule, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  navbar_title: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private url: LocationStrategy
  ) {
    this.navbar_title = '';
  }

  sidebar_buttons: any[] = [];

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.sidebar_buttons = [
      {
        label: 'Overview',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard/overview'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Documents',
        icon: 'pi pi-fw pi-info',
        routerLink: ['/dashboard/documents'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Properties',
        icon: 'pi pi-fw pi-phone',
        routerLink: ['/dashboard/propertymanagement'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Contractors',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/dashboard/contractors'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'Tenant Management',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/dashboard/tenantmanagement'],
        routerLinkActive: 'router-link-active',
      },
    ];

    if (this.url.path() == '/dashboard/overview') {
      this.title = 'Dashboard';
    } else if (this.url.path() == '/dashboard/profile') {
      this.title = 'Profile';
    } else if (this.url.path() == '/dashboard/documents') {
      this.title = 'Documents';
    } else if (this.url.path() == '/dashboard/propertymanagement') {
      this.title = 'Properties';
    } else if (this.url.path() == '/dashboard/contractors') {
      this.title = 'Contractors';
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  title = 'stayworks_test';
}
