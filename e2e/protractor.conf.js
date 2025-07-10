const path = require('path');

exports.config = {
  allScriptsTimeout: 60000,
  getPageTimeout: 60000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-gpu', '--window-size=1024,768']
    }
  },
  chromeDriver: path.resolve('D:/chromedriver138/chromedriver.exe'),
  directConnect: true,
  baseUrl: 'http://localhost:8100/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },
  onPrepare() {
    require('ts-node').register({
      project: path.join(__dirname, './tsconfig.json')
    });

    
    const { browser } = require('protractor');
    browser.waitForAngularEnabled(false);

    // Agregamos un poco de zoom out porque mi app se ve recortada
    browser.driver.manage().window().setSize(1280, 800);
  }
};
