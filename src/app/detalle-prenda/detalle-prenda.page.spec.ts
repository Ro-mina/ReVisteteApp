import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DetallePrendaPage } from './detalle-prenda.page';
import { ActivatedRoute } from '@angular/router';
import { PrendaService } from 'src/app/services/prenda.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiciodbService } from 'services/serviciodb.service';

describe('DetallePrendaPage', () => {
  let component: DetallePrendaPage;
  let fixture: ComponentFixture<DetallePrendaPage>;

  //  Prenda simulada
  const prendaFalsa = {
    id: 1,
    imagen: 'imagen',
    titulo: 'polera',
    descripcion: 'polera negra poco uso',
    tipo: 'polera',
    estado: 'Como nueva',
    talla: 'S',
    ubicacion: 'Santiago',
    precio: '4000',
    publicadoPor: 'Admin'
  };

  // simulacion del servicio
  const prendaServiceMock = {
    getPrendas: jasmine.createSpy('getPrendas')
      .and.returnValue(of([prendaFalsa])) 
  };
  const dbServiceMock = {
    estaLogeado: jasmine.createSpy('estaLogeado').and.resolveTo(true),
    cerrarSesion: jasmine.createSpy('cerrarSesion')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePrendaPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        },
        {
          provide: PrendaService,
          useValue: prendaServiceMock
        },
        {
          provide: ServiciodbService,
          useValue: dbServiceMock
        },
        {
          provide: ServiciodbService,
          useValue: dbServiceMock
        }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(DetallePrendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load prenda on init', async () => {
    await component.ngOnInit(); // llama al método para iniciar la carga

    expect(prendaServiceMock.getPrendas).toHaveBeenCalled();
    expect(component.prenda).toEqual(prendaFalsa);
  });
});
