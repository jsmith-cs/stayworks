import { DashboardComponent } from './../dashboard.component';
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
@Component({
  selector: 'app-documents',
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
    RouterModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {

  properties: any[] = []
  constructor(private primengConfig: PrimeNGConfig) {}




  ngOnInit() {
    this.primengConfig.ripple = true;
    this.properties = [
      {
        Image: 'image_icon.png',
        label: 'property 1',
        content: 'Lorem ipsum dolor sit amet 1',
        class: 'card-one',
      }
    ]
  }

  title = 'stayworks_test';
}