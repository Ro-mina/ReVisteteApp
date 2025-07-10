import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { UsuarioRespuesta } from '../models/usuario.model';
import { Preferences } from '@capacitor/preferences';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    const toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/login' });

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: ToastController, useValue: toastCtrlSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //  Mock completo para todas las llamadas a Preferences.set
    spyOn(Preferences, 'set').and.callFake(() => Promise.resolve());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate to /home', (done) => {
    const usuarioMock: UsuarioRespuesta = {
      id: 1,
      nombre: 'Romina',
      apellido_paterno: 'Torres',
      apellido_materno: 'Gongora',
      fecha_nacimiento: '1994-25-02',
      genero: 'Femenino',
      correo: 'test@example.com',         
      token: 'mocktoken123'
    };

    authServiceSpy.login.and.returnValue(of(usuarioMock));

    component.formLogin.setValue({
      correo: 'test@example.com',
      password: '123456'
    });

    component.login();

    //  Espera a que se resuelvan las promesas async
    setTimeout(() => {
      expect(authServiceSpy.login).toHaveBeenCalledWith({
        correo: 'test@example.com',
        contrasena: '123456'
      });

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      done(); //  Marca el test como completado
    }, 100);
  }, 5000); // Tiempo máximo del test
});
