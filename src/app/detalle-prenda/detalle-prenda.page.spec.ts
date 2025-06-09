import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePrendaPage } from './detalle-prenda.page';

describe('DetallePrendaPage', () => {
  let component: DetallePrendaPage;
  let fixture: ComponentFixture<DetallePrendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePrendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
