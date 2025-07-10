import { browser, by, element, ExpectedConditions as EC, protractor } from 'protractor';

describe('ReVístete App - Pruebas E2E', () => {

  it('Flujo completo Registro de usuario', async () => {
    const correoPrueba = `test_${Date.now()}@correo.com`;

    await browser.get('/registro');
    await element(by.css('input[formControlName="nombre"]')).sendKeys('Test');
    await element(by.css('input[formControlName="apellidoPaterno"]')).sendKeys('Test');
    await element(by.css('input[formControlName="apellidoMaterno"]')).sendKeys('Test');
    await element(by.css('input[formControlName="fechaNacimiento"]')).sendKeys('01/01/2000');
    const radioMasculino = element(by.css('mat-radio-button[value="masculino"]'));
    await browser.executeScript('arguments[0].scrollIntoView(true);', radioMasculino.getWebElement());
    await browser.sleep(500);
    await radioMasculino.click();
    await element(by.css('input[formControlName="correo"]')).sendKeys(correoPrueba);    
    await element(by.css('input[formControlName="password"]')).sendKeys('123456');
    await element(by.css('button[type="submit"]')).click();

    await browser.sleep(2000);
    expect(await browser.getCurrentUrl()).toContain('/login');
  });

  it('Login de usuario', async () => {
    await browser.get('/login');
    await browser.wait(EC.visibilityOf(element(by.css('ion-input[formControlName="correo"] input'))), 10000);

    await element(by.css('ion-input[formControlName="correo"] input')).sendKeys('usuario@prueba.com'); // correo dinámico del test anterior
    await element(by.css('ion-input[formControlName="password"] input')).sendKeys('123456');

    const botonLogin = element(by.cssContainingText('ion-button', 'Iniciar sesión'));
    await browser.wait(EC.elementToBeClickable(botonLogin), 10000);
    await botonLogin.click();

    // Esperar redirección y verificar que estamos en el home
    await browser.wait(EC.urlContains('/home'), 10000, 'No redirigió al home después del login');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/home');
  });

  it('Visualización de detalle de prenda existente', async () => {
    const idPrenda = 0; // Puedes cambiarlo entre 0 y 5 según tu base

    await browser.get(`/detalle-prenda/${idPrenda}`);
    await browser.wait(EC.visibilityOf(element(by.css('.card-prenda'))), 10000);

    const titulo = await element(by.css('ion-card-title')).getText();
    const descripcion = await element(by.css('ion-card-content')).getText();

    expect(titulo.length).toBeGreaterThan(0);
    expect(descripcion.length).toBeGreaterThan(10); 
  });

  it('Añadir comentario', async () => {
    await browser.get('/detalle-prenda/3'); 
    await browser.wait(EC.urlContains('/detalle-prenda'), 5000);

    const inputComentario = element(by.css('ion-textarea textarea'));
    const botonPublicar = element(by.cssContainingText('ion-button', 'Publicar'));

    // Esperar a que el textarea esté visible
    await browser.wait(EC.visibilityOf(inputComentario), 5000, 'Textarea no visible');

    // Escribir y enviar comentario
    await inputComentario.sendKeys('¡Estoy interesado!');
    await botonPublicar.click();

    // Verificar que el comentario aparece
    const comentarioPublicado = element(by.cssContainingText('p', '¡Estoy interesado!'));
    await browser.wait(EC.visibilityOf(comentarioPublicado), 5000, 'Comentario no se mostró');
  });

  
  it('Crear prenda', async () => {
    await browser.get('/publicar');
    await browser.wait(EC.urlContains('/publicar'), 5000, 'No se redirigió a /publicar');

    const tituloInput = element(by.css('ion-input[formControlName="titulo"] input'));
    const descripcionTextarea = element(by.css('ion-textarea[formControlName="descripcion"] textarea'));
    const precioInput = element(by.css('ion-input[formControlName="precio"] input'));

    // Completar título y descripción
    await browser.wait(EC.presenceOf(tituloInput), 5000, 'Input título no presente');
    await tituloInput.sendKeys('Chaqueta deportiva');

    await browser.wait(EC.presenceOf(descripcionTextarea), 5000, 'Textarea descripción no presente');
    await descripcionTextarea.sendKeys('Chaqueta en perfecto estado, casi nueva.');

    // Seleccionar tipo
    const tipoSelect = element(by.css('ion-select[formControlName="tipo"]'));
    await browser.wait(EC.elementToBeClickable(tipoSelect), 5000);
    await tipoSelect.click();

    const opcionTipo = element(by.cssContainingText('ion-alert button.alert-radio-button', 'Chaqueta'));
    await browser.wait(EC.visibilityOf(opcionTipo), 5000);
    await opcionTipo.click();

    const okTipo = element(by.cssContainingText('ion-alert button.alert-button', 'OK'));
    await browser.wait(EC.elementToBeClickable(okTipo), 5000);
    await okTipo.click();

    // Seleccionar estado
    const estadoSelect = element(by.css('ion-select[formControlName="estado"]'));
    await browser.wait(EC.elementToBeClickable(estadoSelect), 5000);
    await estadoSelect.click();

    const opcionEstado = element(by.cssContainingText('ion-alert button.alert-radio-button', 'Como nueva'));
    await browser.wait(EC.visibilityOf(opcionEstado), 5000);
    await opcionEstado.click();

    const okEstado = element(by.cssContainingText('ion-alert button.alert-button', 'OK'));
    await browser.wait(EC.elementToBeClickable(okEstado), 5000);
    await okEstado.click();

    // Seleccionar talla
    const tallaSelect = element(by.css('ion-select[formControlName="talla"]'));
    await browser.wait(EC.elementToBeClickable(tallaSelect), 5000);
    await tallaSelect.click();

    const opcionTalla = element(by.cssContainingText('ion-alert button.alert-radio-button', 'M'));
    await browser.wait(EC.visibilityOf(opcionTalla), 5000);
    await opcionTalla.click();

    const okTalla = element(by.cssContainingText('ion-alert button.alert-button', 'OK'));
    await browser.wait(EC.elementToBeClickable(okTalla), 5000);
    await okTalla.click();

    // Seleccionar ubicación
    const ubicacionSelect = element(by.css('ion-select[formControlName="ubicacion"]'));
    await browser.wait(EC.elementToBeClickable(ubicacionSelect), 5000);
    await ubicacionSelect.click();

    const opcionUbicacion = element(by.cssContainingText('ion-alert button.alert-radio-button', 'Santiago'));
    await browser.wait(EC.visibilityOf(opcionUbicacion), 5000);
    await opcionUbicacion.click();

    const okUbicacion = element(by.cssContainingText('ion-alert button.alert-button', 'OK'));
    await browser.wait(EC.elementToBeClickable(okUbicacion), 5000);
    await okUbicacion.click();

    // Ingresar precio
    await browser.wait(EC.presenceOf(precioInput), 5000, 'Input precio no presente');
    await precioInput.sendKeys('12990');

    // Publicar
    const publicarBtn = element(by.cssContainingText('ion-button', 'Publicar Prenda'));

    // Scroll para evitar elementos encima como ion-footer
    await browser.executeScript('arguments[0].scrollIntoView(true);', publicarBtn.getWebElement());
    await browser.wait(EC.elementToBeClickable(publicarBtn), 5000, 'Botón Publicar no clickeable');
    await publicarBtn.click();


    // Esperar redirección o mensaje de éxito
    await browser.sleep(10000); 
    await browser.wait(EC.urlContains('/home'), 5000, 'No se redirigió a /home después de publicar');
  });

    it('Cerrar sesión', async () => {
    const botonMenu = element(by.id('menu-toggle'));    
    await browser.wait(EC.elementToBeClickable(botonMenu), 5000, 'Botón menú no clickeable');
    await browser.executeScript('arguments[0].scrollIntoView(true);', botonMenu.getWebElement());
    await botonMenu.click();

    const cerrarSesionItem = element(by.cssContainingText('ion-item', 'Cerrar sesión'));
    await browser.wait(EC.elementToBeClickable(cerrarSesionItem), 5000, 'Botón Cerrar sesión no clickeable');
    await cerrarSesionItem.click();

    await browser.wait(EC.urlContains('/login'), 5000, 'No se redirigió a login después del logout');
  });
});
