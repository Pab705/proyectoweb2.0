import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoBusquedaComponent } from './resultado-busqueda.component';

describe('ResultadoBusquedaComponent', () => {
  let component: ResultadoBusquedaComponent;
  let fixture: ComponentFixture<ResultadoBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadoBusquedaComponent]
    });
    fixture = TestBed.createComponent(ResultadoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
