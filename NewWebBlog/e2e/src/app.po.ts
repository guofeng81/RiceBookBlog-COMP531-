import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToMain() {
    return browser.get('/main');
  }

  getMainPageText() {
    return element(by.id('main')).getText();
  }

  getLandingPageText() {
    return element(by.className('welcome')).getText();
  }

}


