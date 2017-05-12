import { browser, element, by } from 'protractor';

export class JCExperimentPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jcx-root h1')).getText();
  }
}
