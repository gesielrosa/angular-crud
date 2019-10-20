import {CustomerFormPage} from './customer-form.po';
import {browser} from 'protractor';

describe('Customer Form test', () => {
  let page: CustomerFormPage;

  beforeEach(() => {
    page = new CustomerFormPage();
    page.navigateTo();
  });

  it('Customer form should be valid', () => {
    page.getNameTextBox().sendKeys('Gesiel Rosa');
    page.getDocTextBox().sendKeys('071.803.469-42');
    page.getPhoneTextBox().sendKeys('(48) 996636056');
    page.getBirthTextBox().sendKeys('23/08/1990');
    page.getAddressTextBox().sendKeys('Rua Vicente Benevenutti, 3050');
    page.getComplementTextBox().sendKeys('Casa');
    page.getCityTextBox().sendKeys('Canelinha');
    page.getStateTextBox().sendKeys('SC');
    page.getVehicleBrandSelect().click();
    browser.driver.sleep(1000);
    page.getVehicleBrandOption().click();
    browser.driver.sleep(5000);
    page.getVehicleModelSelect().click();
    browser.driver.sleep(1000);
    page.getVehicleModelOption().click();
    browser.driver.sleep(2000);
    page.getSubmitButton().click();

    let form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

});
