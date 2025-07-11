/// <reference types="cypress" />
import 'cypress-wait-until';
Cypress.Commands.add('login', () => {
  window.localStorage.setItem('nombreUsuario', 'Romina');
  window.localStorage.setItem('usuario', JSON.stringify({
    id: 1,
    nombre: 'Romina',
    correo: 'test@example.com',
  }));
});

// Delay entre comandos
const COMMAND_DELAY = 300; // en milisegundos

for (const command of ['visit', 'click', 'type', 'clear', 'reload']) {
  Cypress.Commands.overwrite(
    command as keyof Cypress.Chainable,
    (originalFn, ...args) => {
      const origVal = originalFn(...args);
      return new Promise(resolve => {
        setTimeout(() => resolve(origVal), 300);
      });
    }
  );
}
