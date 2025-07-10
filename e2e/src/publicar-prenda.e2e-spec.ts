import { browser, by, element, ExpectedConditions as EC } from 'protractor';

xdescribe('Publicación de Prenda', () => {
  beforeAll(async () => {
    // Simula inicio de sesión escribiendo directamente en localStorage
    await browser.get('/');
    await browser.executeScript(`
      localStorage.setItem('token', 'aqui_va_tu_token_de_prueba');
    `);
    await browser.refresh(); // recarga con sesión activa
  });

  it('debería permitir publicar una nueva prenda', async () => {
    await browser.get('/publicar');

    // Asegura que el campo esté presente antes de interactuar
    const tituloInput = element(by.css('input[formControlName="titulo"]'));
    await browser.wait(EC.visibilityOf(tituloInput), 5000);
    await tituloInput.sendKeys('Camisa Vintage');

    await element(by.css('textarea[formControlName="descripcion"]')).sendKeys('Camisa de los 80s, buen estado.');
    await element(by.css('input[formControlName="precio"]')).sendKeys('12000');


    // Condición
    await element(by.css('mat-select[formControlName="condicion"]')).click();
    const condicion = element(by.cssContainingText('mat-option', 'Usado'));
    await browser.wait(EC.elementToBeClickable(condicion), 5000);
    await condicion.click();

    await element(by.buttonText('Publicar')).click();

    // Confirmación
    await browser.wait(EC.urlContains('/mis-prendas'), 5000);
    expect(await browser.getCurrentUrl()).toContain('/mis-prendas');
  });
});
