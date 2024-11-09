import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusPageComponent } from './contactus-page.component';

describe('ContactusPageComponent', () => {
  let component: ContactusPageComponent;
  let fixture: ComponentFixture<ContactusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
