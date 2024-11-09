import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tenant-view',
  templateUrl: './tenant-view.component.html',
  styleUrls: ['./tenant-view.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe, DatePipe]
})
export class TenantViewComponent {
  @Input() tenant: any;
  @Output() close = new EventEmitter<void>();
}