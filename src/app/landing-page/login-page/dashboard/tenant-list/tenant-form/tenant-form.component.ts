import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TenantFormComponent implements OnInit, OnChanges {
  @Input() tenant: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  tenantForm!: FormGroup;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  maxYear = new Date().getFullYear() - 18;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tenant'] && this.tenantForm) {
      this.tenantForm.patchValue(this.tenant);
      this.tenantForm.markAsPristine();
    }
  }

  initForm() {
    this.tenantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^(\d{3}-?){2}\d{4}$/)]],
      dobDay: [''],
      dobMonth: [''],
      dobYear: [''],
      streetAddress: [''],
      city: [''],
      province: [''],
      postalCode: [''],
      country: [{value: 'Canada', disabled: true}],
      leaseStartDay: [''],
      leaseStartMonth: [''],
      leaseStartYear: [''],
      leaseEndDay: [''],
      leaseEndMonth: [''],
      leaseEndYear: [''],
      rentAmount: [''],
      securityDeposit: [''],
      emergencyContactName: [''],
      emergencyContactPhone: ['', [Validators.pattern(/^(\d{3}-?){2}\d{4}$/)]],
      occupation: [''],
      employer: [''],
      hasPets: [false],
      petDetails: [''],
      leaseSignedDay: [''],
      leaseSignedMonth: [''],
      leaseSignedYear: ['']
    });

    if (this.tenant) {
      this.tenantForm.patchValue(this.tenant);
      this.tenantForm.markAsPristine();
    }
  }

  formatPhoneNumber(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    input.value = value.slice(0, 12);
  }

  onSubmit() {
    if (this.tenantForm.valid) {
      const formData = {
        ...this.tenantForm.value,
        id: this.tenant.id
      };
      this.save.emit(formData);
    }
    else{
      console.log("issue");
    }
  }

  onCancel() {
    if (this.tenantForm.dirty) {
      if (confirm('Are you sure you want to cancel? Your progress will be lost.')) {
        this.cancel.emit();
      }
    } else {
      this.cancel.emit();
    }
  }
}