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
import { Chart, registerables } from 'chart.js';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
Chart.register(...registerables);
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
  // data: any[] = [];
  labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Revenue',
        data: [
          17000, 18000, 19000, 20000, 22000, 22000, 22000, 19000, 20000, 22000,
          22000, 22000,
        ],
        borderColor: '#3a7ca5',
        backgroundColor: '#3a7ca5',
      },
      {
        label: 'Expense',
        data: [
          1000, 2000, 3000, 1500, 2500, 4000, 1563, 3000, 1500, 2500, 4000,
          1563,
        ],
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
      },
    ],
  };
  public config: any = {
    type: 'bar',
    data: this.data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Revenue and Expense',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            align: 'center',
            text: 'Dollars $',
          },
        },
        x: {
          title: {
            display: true,
            align: 'center',
            text: 'Months',
          },
        },
      },
    },
  };

  chart: any;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.overview_card = [
      {
        label: 'Properties',
        content: '5',
        class: 'documents-card',
      },
      {
        label: 'Tenants',
        content: '20',
        class: 'properties-card',
      },
      {
        label: 'Expected Revenue This Month',
        content: '$22,000.00',
        class: 'payments-card',
      },
      {
        label: 'Expenses This Month',
        content: '$1,563.00',
        class: 'payment-due-card',
      },
    ];

    this.chart = new Chart('MyChart', this.config);
  }
}
