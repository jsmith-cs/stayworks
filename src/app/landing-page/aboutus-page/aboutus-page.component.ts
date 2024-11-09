import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrls: ['./aboutus-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AboutusPageComponent {
  showValue(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
  }

  hideValue(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  }
}