import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ServiciodbService {

  private db!: SQLiteDBConnection;
  readonly db_name: string = "usuarios.db";
  readonly db_table: string = "usuario";

  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB() {
    try {
      this.db = await this.sqlite.createConnection(
        this.db_name,
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open();

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${this.db_table} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellidop TEXT NOT NULL,
          apellidom TEXT NOT NULL,
          correo TEXT NOT NULL,
          password TEXT NOT NULL,
          genero TEXT NOT NULL,
          fechaNacimiento TEXT NOT NULL
        );
      `;
      await this.db.execute(createTableQuery);
      console.log("Base de datos inicializada");
    } catch (error) {
      console.error("Error :", error);
    }
  }

  async addUsuario(
    nombre: string,
    apellidop: string,
    apellidom: string,
    correo: string,
    password: string,
    genero: string,
    fechaNacimiento: string
  ) {
    try {
      const query = `
        INSERT INTO ${this.db_table} (nombre, apellidop, apellidom, correo, password, genero, fechaNacimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [nombre, apellidop, apellidom, correo, password, genero, fechaNacimiento];
      await this.db.run(query, values);
      console.log("Usuario registrado en la base de datos.");
    } catch (error) {
      console.error("Error al insertar usuario:", error);
    }
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
    await Preferences.remove({ key: 'nombreUsuario' });
    await Preferences.remove({ key: 'prendas' });
    console.log("Sesión cerrada.");
  }

  async estaLogeado(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'usuario' });
    console.log('¿Está logeado?:', !!value);
    return !!value;
  }

  async getNombreUsuario(): Promise<string> {
    const { value } = await Preferences.get({ key: 'nombreUsuario' });
    return value || 'Invitado';
  }

  async obtenerUsuarios(): Promise<any[]> {
    try {
      const query = `SELECT * FROM ${this.db_table};`;
      const res = await this.db.query(query);
      return res.values || [];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }
}
