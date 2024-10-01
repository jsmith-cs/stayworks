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
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stayworks_test';
}

