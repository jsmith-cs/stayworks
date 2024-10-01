import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {Card, CardModule} from 'primeng/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     MatButtonModule, ButtonModule, MenubarModule, CardModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})

export class LandingPageComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}
  
    header_menu_items: any[] = [];
    account_menu_items: any[] = [];
  
    ngOnInit() {
      this.primengConfig.ripple = true; 
      this.header_menu_items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'About', icon: 'pi pi-fw pi-info'},
        {label: 'Contact', icon: 'pi pi-fw pi-phone'}
      ]
  
      this.account_menu_items = [
        {label: 'sign in', icon: 'pi pi-fw pi-sign-in',routerLink:['/login'], routerLinkActive: 'router-link-active'},
        {label: 'sign up', icon: 'pi pi-fw pi-sign-out', routerLink: ['/signup'], routerLinkActive: 'router-link-active'}
      ]
    }
  
    title = 'stayworks_test';
}