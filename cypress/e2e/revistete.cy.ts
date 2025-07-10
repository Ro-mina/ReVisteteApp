describe('ReVístete - Pruebas básicas E2E con Cypress', () => {
  it('Debe cargar correctamente la página de login', () => {
    cy.visit('/login');
    cy.contains('Iniciar sesión').should('be.visible');
    cy.get('ion-input[formControlName="correo"] input').should('exist');
    cy.get('ion-input[formControlName="password"] input').should('exist');
  });

  it('Debe redirigir al registro desde el login', () => {
    cy.visit('/login');
    cy.contains('¿No tienes una cuenta?').click();
    cy.url().should('include', '/registro');
  });

  it('Debe mostrar los campos de registro', () => {
    cy.visit('/registro');
    cy.get('input[formControlName="nombre"]').should('exist');
    cy.get('input[formControlName="apellidoPaterno"]').should('exist');
    cy.get('input[formControlName="correo"]').should('exist');
  });
});