import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-maintenance-form',
    templateUrl: './maintenance-form.component.html',
    styleUrls: ['./maintenance-form.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class MaintenanceFormComponent {
    @Input() request: any = {};
    @Input() properties: any[] = [];
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();
    @ViewChild('maintenanceForm') form!: NgForm;

    onSubmit() {
        if (this.form.valid) {
            this.save.emit(this.request);
        }
    }

    onCancel() {
        this.cancel.emit();
    }
}