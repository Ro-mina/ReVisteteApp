import { browser, by, element } from 'protractor';

xdescribe('Flujo de Login', () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:8100/login');
    await browser.sleep(1000);
  });

  it('debería permitir al usuario iniciar sesión correctamente', async () => {
    // 1. Ingresar correo
    await element(by.css('ion-input[type="email"] input')).sendKeys('usuario@prueba.com');

    // 2. Ingresar contraseña
    await element(by.css('ion-input[type="password"] input')).sendKeys('123456');

    // 3. Hacer clic en el botón
    await element(by.cssContainingText('ion-button', 'Iniciar sesión')).click();

    // 4. Esperar navegación (puedes ajustar esto según tu flujo real)
    await browser.sleep(2000);

    // 5. Verificar que estamos en la pantalla correcta (por ejemplo, que aparezca un componente de bienvenida)
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/home'); // ajusta según ruta post-login
  });
});
