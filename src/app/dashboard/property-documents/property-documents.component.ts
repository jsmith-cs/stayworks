import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property-documents',
  standalone: true,
  imports: [],
  templateUrl: './property-documents.component.html',
  styleUrl: './property-documents.component.css',
})
export class PropertyDocumentsComponent implements OnInit {
  propertyId: number | null = null;
  propertyDetails: any = null;
  propertyDocuments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.propertyId = +params['propertyId'];
      this.propertyDetails();
    });
  }
}
