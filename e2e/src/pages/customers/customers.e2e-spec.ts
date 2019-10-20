import {CustomersPage} from './customers.po';
import {browser} from 'protractor';

describe('Customer Form test', () => {
  let page: CustomersPage;

  beforeEach(() => {
    page = new CustomersPage();
    page.navigateTo();
  });

  it('Empty customer list', () => {
    let alert = page.getEmplyAlert().getText();
    expect(alert).toContain('Nenhum cliente encontrado');
  });

  // it('Get first customer from list when list is not empty', () => {
  //   let customerId = page.getFirstCustomerId().getText();
  //   expect(customerId).not.toBeNull();
  // });

});
