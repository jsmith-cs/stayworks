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
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  private baseUrl = 'http://localhost:3000/';
  public overview = {properties:0,tenants:0,revenue:0.00, expense:0.00}
  public properties = 0;
  public tenants = 0;
  public landLordId = 1 ;
  // data: any[] = [];
  revenueData = [];
  expenseData = [];
  labels = [];
  lineData = [];
  chart: any;
  lineChart: any;
  constructor(private primengConfig: PrimeNGConfig,private http: HttpClient) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    var userId = localStorage.getItem("userId");
    this.landLordId = Number( userId ? userId:0);

    this.refreshPropertyList();
    this.refreshOverview();
    this.overview_card = [
      {
        label: 'Properties',
        content: this.properties,
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

    
  }

  //getList of Properties
  getListProperties(): Observable<any> {
    return this.http.get(`${this.baseUrl}getProperties/${this.landLordId}`,{
      responseType:'json'
    });
  }

  refreshPropertyList()
  {
    this.getListProperties().subscribe((data)=> {
      this.properties = data.length;
      console.log(this.properties);
    }
    
    );
  }

  getOverview(): Observable<any> {
    return this.http.get(`${this.baseUrl}overview/${this.landLordId}`,{
      responseType:'json'
    });
  }

  getChartingData(): Observable<any> {
    return this.http.get(`${this.baseUrl}chartingData/${this.landLordId}`,{
      responseType:'json'
    });
  }

  refreshOverview()
  {
    this.getOverview().subscribe((data)=> {
      this.overview = data;
      console.log(this.overview);
    }
    ); 

    this.getChartingData().subscribe((cd)=> {
      this.labels = cd.map((e: { cMonthYear: any; }) => e.cMonthYear);
      this.revenueData = cd.map((e: { cMonthRevenue: any; }) => Number(e.cMonthRevenue));
      this.expenseData = cd.map((e: { cMonthExpense: any; }) => Number(e.cMonthExpense));
      this.lineData = cd.map((e: { cProfit_Time: any; }) => Number(e.cProfit_Time));
      this.buildChart();
    }
    );
  }

  buildChart(){
    console.log(this.lineData);
    var data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Revenue',
          data: this.revenueData,
          borderColor: '#3a7ca5',
          backgroundColor: '#3a7ca5',
        },
        {
          label: 'Expense',
          data: this.expenseData,
          borderColor: '#FF6384',
          backgroundColor: '#FF6384',
        },
      ],
    };
    var config: any = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

    var lineData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Profit',
          data: this.lineData,
          borderColor: '#3a7ca5',
          backgroundColor: '#3a7ca5',
        }
        
      ],
    };

    var lineConfig: any = {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Profit over Time',
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

    this.chart = new Chart('MyChart', config);
    this.lineChart = new Chart ('LineChart',lineConfig);
  }

  

}
