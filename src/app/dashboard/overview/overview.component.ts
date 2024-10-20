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
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    ButtonModule,
    SidebarModule,
    SplitterModule,
    MenubarModule,
    CommonModule,
    CardModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  overview_card: any[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.overview_card = [
      {
        label: 'Overview',
        content: 'Lorem ipsum dolor sit ',
        class: 'overview-card',
      },
      {
        label: 'Documents',
        content: 'Lorem ipsum dolor sit ',
        class: 'documents-card',
      },
      {
        label: 'Properties Owned',
        content: 'Lorem ipsum dolor sit ',
        class: 'properties-card',
      },
      {
        label: 'Payments received',
        content: 'Lorem ipsum dolor sit ',
        class: 'payments-card',
      },
      {
        label: 'Payment due',
        content: 'Lorem ipsum dolor sit ',
        class: 'payment-due-card',
      },
      {
        label: 'transactions',
        content: 'Lorem ipsum dolor sit ',
        class: 'transactions-card',
      },
      {
        label: 'trend',
        content: 'Lorem ipsum dolor sit ',
        class: 'trend-card',
      },
      {
        label: 'support tickets',
        content: 'Lorem ipsum dolor sit ',
        class: 'support-tickets-card',
      },
      {
        label: 'sales',
        content: 'Lorem ipsum dolor sit ',
        class: 'sales-card',
      },
      {
        label: 'Customer demographics',
        content: 'Lorem ipsum dolor sit ',
        class: 'demographics-card',
      },
    ];
  }
}
