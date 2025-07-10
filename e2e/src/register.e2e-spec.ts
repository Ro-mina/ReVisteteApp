import { browser, by, element, ExpectedConditions as EC } from 'protractor';

xdescribe('Registro de Usuario', () => {
  it('debería registrar un nuevo usuario correctamente', async () => {
    await browser.get('/registro');

    // Esperar que el formulario se cargue
    await browser.wait(EC.visibilityOf(element(by.css('form'))), 5000);

    await element(by.css('input[formControlName="nombre"]')).sendKeys('Test');
    await element(by.css('input[formControlName="apellidoPaterno"]')).sendKeys('User');
    await element(by.css('input[formControlName="apellidoMaterno"]')).sendKeys('Demo');
    await element(by.css('input[formControlName="fechaNacimiento"]')).sendKeys('01/01/2000');

    // Seleccionar género 
    const generoOtro = element(by.css('mat-radio-button[value="otro"]'));
    await browser.wait(EC.elementToBeClickable(generoOtro), 5000, 'Radio button "Otro" no clickeable');
    await generoOtro.click();

    const correo = `usuario${Math.floor(Math.random() * 10000)}@prueba.com`;
    await element(by.css('input[formControlName="correo"]')).sendKeys(correo);
    await element(by.css('input[formControlName="password"]')).sendKeys('123456');

    // Hacer click en el botón de registro
    const boton = element(by.css('button[type="submit"]'));
    await browser.wait(EC.elementToBeClickable(boton), 5000);
    await boton.click();

    // Esperar a que redirija o confirme el éxito del registro
    await browser.sleep(3000);

    // Verificar que redirige al login 
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });
});
