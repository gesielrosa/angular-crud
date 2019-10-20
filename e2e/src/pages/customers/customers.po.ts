import {browser, by, element} from 'protractor';

export class CustomersPage {
  navigateTo() {
    return browser.get(`/`) as Promise<any>;
  }

  getTable() {
    return element(by.className('table-responsive'));
  }

  getFirstCustomerId() {
    return this.getTable().all(by.tagName('scope')).first();
  }

  getEmplyAlert() {
    return element(by.className('alert-info'));
  }

}
