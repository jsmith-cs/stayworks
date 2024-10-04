import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {Card, CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {SplitterModule} from 'primeng/splitter';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,
     MatButtonModule, 
     ButtonModule, 
     SidebarModule,
     SplitterModule ,
     MenubarModule,
      CardModule, 
      RouterLink, 
      RouterLinkActive, 
      RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}

    sidebar_buttons: any[] = [
        {label: 'Profile', icon: 'pi pi-fw pi-home', routerLink:['/profile'], routerLinkActive: 'router-link-active'},
        {label: 'Documents', icon: 'pi pi-fw pi-info', routerLink:['/documents'], routerLinkActive: 'router-link-active'},
        {label: 'Property Management', icon: 'pi pi-fw pi-phone', routerLink:['/property-management'], routerLinkActive: 'router-link-active'},
        {label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', routerLink:['/'], routerLinkActive: 'router-link-active'}

    ]

  
    ngOnInit() {
      this.primengConfig.ripple = true; 
      this.sidebar_buttons = [
        {label: 'Profile', icon: 'pi pi-fw pi-home', routerLink:['/profile'], routerLinkActive: 'router-link-active'},
        {label: 'Documents', icon: 'pi pi-fw pi-info', routerLink:['/documents'], routerLinkActive: 'router-link-active'},
        {label: 'Property Management', icon: 'pi pi-fw pi-phone', routerLink:['/property-management'], routerLinkActive: 'router-link-active'},
        {label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', routerLink:['/'], routerLinkActive: 'router-link-active'}
      ]
    }
  
    title = 'stayworks_test';
}