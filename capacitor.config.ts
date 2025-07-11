import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.revistete.app',             
  appName: 'ReVístete',                   
  webDir: 'www',                          
  bundledWebRuntime: false,               

  server: {
    androidScheme: 'http',                
    cleartext: true                       
  },

  android: {
    allowMixedContent: true,             
    backgroundColor: '#ffffff',          
  },

  ios: {
    contentInset: 'always',              
    backgroundColor: '#ffffff'           
  }
};

export default config;