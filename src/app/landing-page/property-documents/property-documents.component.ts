<div class="property-documents-main-container">
  <div class="add-property-documents">
    <form [formGroup]="myForm" (ngSubmit)="submit()" class="property-form">
      <div class="form-group">
        <label for="name">Name: </label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="fileType"
          formControlName="fileType"
        >
          <option value="Lease">Lease Document</option>
          <option value="Property">Property Document</option>
          <option value="Other">Other Document</option>
        </select>
      </div>

      <div class="form-group">
        <label for="file">File: </label>
        <input
          formControlName="file"
          id="file"
          type="file"
          class="form-control"
          (change)="onFileChange($event)"
        />
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
  <div class="property-container">
    <table class="property-table">
      <tr>
        <th>Address</th>
        <th>City</th>
        <th>Province</th>
        <th>Country</th>
        <th>Postal Code</th>
        <th>Occupied Status</th>
      </tr>
      <tr
        class="property-details"
        *ngFor="let propertyDetails of propertyDetails"
      >
        <td>{{ propertyDetails.address }}</td>
        <td>{{ propertyDetails.city }}</td>
        <td>{{ propertyDetails.province }}</td>
        <td>{{ propertyDetails.country }}</td>
        <td>{{ propertyDetails.postal_code }}</td>
        <td>{{ propertyDetails.occupied_status }}</td>
        <td class="info_icon">
          <img src="assets/information_icon.svg" alt="information icon" />
        </td>
      </tr>
    </table>
    <table class="property-documents-table" *ngIf="showPropertyDocuments">
      <tr>
        <th>Document ID</th>
        <th>Document Name</th>
        <th>Document Type</th>
        <th>Created At</th>
        <th>File</th>
      </tr>
      <tr *ngFor="let f of fileList">
        <td>
          {{ f.docId }}
        </td>
        <td>{{ f.fileName }}</td>
        <td>{{ f.docType }}</td>
        <td>{{ f.CreatedAt }}</td>
        <td class="file_icon">
          <a href="" onclick="return false;" (click)="onClickRetrieve(f.docId)">
            <img
              src="../../../../../assets/file-image-icon.png"
              alt="file icon"
              width="30"
              style="filter: invert(100%); cursor: pointer"
            />
          </a>
        </td>
      </tr>
    </table>
    <button
      class="show-hide-button-wrapper"
      type="button"
      (click)="ToggleShowPropertyDocumentsTable()"
    >
      <div class="show-hide-documents">
        <div class="show-documents" *ngIf="!showPropertyDocuments">
          <p>Show Documents</p>
          <img src="assets/chevron-down.svg" height="30" alt="down chevron" />
        </div>
        <div class="hide-documents" *ngIf="showPropertyDocuments">
          <img src="assets/chevron-up.svg" height="30" alt="up chevron" />
          <p>Hide Documents</p>
        </div>
      </div>
    </button>
  </div>

  <div class="tenant-list-documents">
    <div class="tentant-documents-container">
      <table class="tenant-documents-table">
        <tr>
          <th><input type="checkbox" name="selectAll" /></th>
          <th>Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Tenant status</th>
        </tr>
        <tr *ngFor="let user of users">
          <td><input type="checkbox" name="user-checkbox" /></td>
          <td>{{ user.name }}</td>
          <td>{{ user.email_address }}</td>
          <td>{{ user.phone_number }}</td>
          <td>{{ user.tenant_status }}</td>
        </tr>
      </table>
    </div>
  </div>
  <!-- ############################################################  -->
  <div>
    <p-dialog
      header="Edit Profile"
      [(visible)]="visibleDialog"
      [style]="{ width: '25rem' }"
      [baseZIndex]="1000"
      maskStyleClass="ui-dialog-mask ui-widget-overlay ui-dialog-visible ui-dialog-mask-scrollblocker"
    >
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
        <p-button
          label="Cancel"
          severity="secondary"
          (onClick)="visibleDialog = false"
        />

        <p-button label="Save" (onClick)="(visibleDialog)" />
      </div>
    </p-dialog>
  </div>

  <!-- <table class="property-documents-table" *ngFor="let f of fileList">
    <tr>
      <td>
        <a href="" onclick="return false;" (click)="onClickRetrieve(f.docId)">{{
          f.docId
        }}</a>
      </td>
      <td>{{ f.docType }}</td>
      <td>{{ f.fileName }}</td>
    </tr>
  </table> -->

  <!-- <button type="button" class="add-documents-button" (click)="showDialog()" label="Add Documents">+ Add Documents</button> -->
</div>
