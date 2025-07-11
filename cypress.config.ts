import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    defaultCommandTimeout: 15000, // aumenta el tiempo máximo por comando
    pageLoadTimeout: 30000,      // también útil
  }
});
