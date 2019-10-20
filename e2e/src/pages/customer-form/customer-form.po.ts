import {browser, by, element} from 'protractor';

export class CustomerFormPage {
  navigateTo() {
    return browser.get(`/customer-form`) as Promise<any>;
  }

  getForm() {
    return element(by.id('customerForm'));
  }

  getNameTextBox() {
    return element(by.id('inputName'));
  }

  getDocTextBox() {
    return element(by.id('inputDoc'));
  }

  getPhoneTextBox() {
    return element(by.id('inputPhone'));
  }

  getBirthTextBox() {
    return element(by.id('inputBirth'));
  }

  getAddressTextBox() {
    return element(by.id('inputAddress'));
  }

  getComplementTextBox() {
    return element(by.id('inputComplement'));
  }

  getCityTextBox() {
    return element(by.id('inputCity'));
  }

  getStateTextBox() {
    return element(by.id('inputState'));
  }

  getVehicleBrandSelect() {
    return element(by.id('inputVehicleBrand'));
  }

  getVehicleBrandOption() {
    return this.getVehicleBrandSelect().all(by.tagName('option')).first();
  }

  getVehicleModelSelect() {
    return element.all(by.id('inputVehicleModel')).first();
  }

  getVehicleModelOption() {
    return this.getVehicleModelSelect().all(by.tagName('option')).first();
  }

  getSubmitButton() {
    return element(by.className('btnSubmit'));
  }
}
