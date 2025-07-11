describe('Flujo E2E completo del usuario', () => {
  it('Registra, logea, publica, comenta y cierra sesión', () => {
    const usuario = {
      correo: `test${Date.now()}@correo.com`,
      password: '123456',
      nombre: 'Test',
      apellidoP: 'Test',
      apellidoM: 'Test',
      genero: 'otro'
    };

    // 1. Ir a registro
    cy.visit('http://localhost:8100/registro');

    // Espera que el formulario esté visible
    cy.get('form').should('be.visible');

    // Nombre
    cy.get('input[formcontrolname="nombre"]')
    .should('exist')
    .type(usuario.nombre, { force: true });

    // Apellido Paterno
    cy.get('input[formcontrolname="apellidoPaterno"]')
    .should('exist')
    .type(usuario.apellidoP, { force: true });

    // Apellido Materno
    cy.get('input[formcontrolname="apellidoMaterno"]')
    .should('exist')
    .type(usuario.apellidoM, { force: true });

    // Fecha de Nacimiento
    cy.get('input[formcontrolname="fechaNacimiento"]')
    .should('exist')
    .type('01/01/2000', { force: true });

    // Selección de Género 
    cy.get('mat-radio-button[value="masculino"] input[type="radio"]', { timeout: 6000 })
    .should('exist')
     .check({ force: true });    

    // Correo
    cy.get('input[formcontrolname="correo"]', { timeout: 6000 })
    .should('exist')
    .type(usuario.correo, { force: true });

    // Contraseña
    cy.get('input[formcontrolname="password"]', { timeout: 6000 })
    .should('exist')
    .type(usuario.password, { force: true });  

        // Validar que el botón está visible y habilitado
    cy.get('button[type="submit"]', { timeout: 6000 })
    .should('exist')
    .should('not.be.disabled')
    .scrollIntoView({ duration: 300 }) 
    .click({ force: true });

    // Esperar navegación al login
    cy.url({ timeout: 10000 }).should('include', '/login');

    // 2. Login después del registro
    cy.url().should('include', '/login');

    cy.get('ion-input[formcontrolname="correo"] input').type(usuario.correo);
    cy.get('ion-input[formcontrolname="password"] input').type(usuario.password);
    cy.get('ion-button[type="submit"]').click();

    // 3. Entrar a /publicar desde Home
    cy.url().should('include', '/home');
    cy.contains('Publicar').click();

    // Llenar el formulario de publicación
    cy.get('ion-input[formcontrolname="titulo"] input').type('Polera Blanca');
    cy.get('ion-textarea[formcontrolname="descripcion"] textarea').type('Como nueva');

    cy.contains('.select-box', 'Seleccionar tipo').click();
    cy.contains('.option', 'Polera').click();

    cy.contains('.select-box', 'Seleccionar estado').click();
    cy.contains('.option', 'Como nueva').click();

    cy.contains('.select-box', 'Seleccionar talla').click();
    cy.contains('.option', 'M').click();

    cy.contains('.select-box', 'Seleccionar ubicación').click();
    cy.contains('.option', 'Santiago').click();

    cy.get('ion-input[formcontrolname="precio"] input').type('4500');

    cy.contains('ion-button', 'Publicar Prenda')
    .should('exist')
    .should('not.be.disabled')
    .click({ force: true });


    // Verificar redirección al home
    cy.url({ timeout: 8000 }).should('include', '/home');


    // 4. Filtrar por Talla S
    // Abrir el menú de filtros
    cy.contains('Filtrar').click();

    // Esperar a que el menú se abra
    cy.get('ion-menu[menuid="menu-filtros"]').should('have.class', 'menu-enabled');

    // Elegir talla S 
    cy.get('ion-menu[menuid="menu-filtros"]')
    .contains('button', 'S')
    .scrollIntoView()
    .click({ force: true });

    // Aplicar los filtros
    
    cy.get('ion-menu[menuid="menu-filtros"]')
    .find('ion-button')
    .contains('Aplicar filtros')
    .click({ force: true });

    // Esperar un momento antes de verificar si se cerró el menú
    cy.wait(2000); 

    // Ahora verificar que el menú se haya cerrado
    cy.get('ion-menu[menuid="menu-filtros"]')
    .should('not.have.class', 'show-menu');


    // 5. Limpiar filtros
    cy.contains('Filtrar').click();

    // Esperar a que el menú esté visible 
    cy.get('ion-menu[menuid="menu-filtros"]')
    .should('have.class', 'show-menu');

    // Ahora sí limpiar
    cy.contains('Limpiar filtros').click();

    // Esperar que se cierre de nuevo 
    cy.get('ion-menu[menuid="menu-filtros"]')
    .should('not.have.class', 'show-menu');

   // 6. Ver detalle y comentar
    cy.get('.item-prenda').first().click();
    cy.url().should('include', '/detalle');
    cy.wait(1000); // asegurar carga

    // Usar el ion-textarea directamente
    cy.get('ion-textarea[placeholder="Escribe tu comentario..."]')
      .should('exist')
      .then($ionTextarea => {
        const nativeTextarea = $ionTextarea[0].querySelector('textarea') || 
                              $ionTextarea[0].shadowRoot?.querySelector('textarea');

        expect(nativeTextarea).to.exist;

        nativeTextarea.scrollIntoView({ behavior: 'auto', block: 'center' });

        // Establecer valor directamente y disparar input
        nativeTextarea.value = 'Me interesa';
        nativeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      });

    // Click en publicar
    cy.get('ion-button.btn-comentar')
      .should('be.visible')
      .click({ force: true });

    // Confirmar que el comentario se ve
    cy.contains('Me interesa').should('exist');

    // Luego de comentar la prenda
    cy.contains('Me interesa').should('exist');

    // 7. Ir a mi cuenta y cerrar sesión
    cy.go('back'); 
    cy.url().should('include', '/home');

    // Esperar que cargue el home y se muestre el menú toggle
    cy.get('#menu-toggle', { timeout: 4000 })
      .should('be.visible')
      .click({ force: true });

    // Clic en "Mi Cuenta"
    cy.contains('Mi Cuenta')
      .should('be.visible')
      .click({ force: true });

    // Confirmar redirección
    cy.url().should('include', '/mi-cuenta');

    // Clic en "Cerrar sesión"
    cy.contains('Cerrar sesión')
      .should('be.visible')
      .click({ force: true });

    // Verificar que redirige al login
    cy.url().should('include', '/login');

  });
});