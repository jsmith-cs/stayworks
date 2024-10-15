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
import { CommonModule } from '@angular/common';
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
  constructor(private primengConfig: PrimeNGConfig) {}

  sidebar_buttons: any[] = [];

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.sidebar_buttons = [
      {
        label: 'overview',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard/overview'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'documents',
        icon: 'pi pi-fw pi-info',
        routerLink: ['/dashboard/documents'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'propertymanagement',
        icon: 'pi pi-fw pi-phone',
        routerLink: ['/dashboard/property_management'],
        routerLinkActive: 'router-link-active',
      },
      {
        label: 'sign-out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/'],
        routerLinkActive: 'router-link-active',
      },
    ];
  }

  title = 'stayworks_test';
}
