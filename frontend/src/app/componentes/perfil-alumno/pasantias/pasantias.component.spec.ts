import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasantiasComponent } from './pasantias.component';

describe('PasantiasComponent', () => {
  let component: PasantiasComponent;
  let fixture: ComponentFixture<PasantiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasantiasComponent]
    });
    fixture = TestBed.createComponent(PasantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
