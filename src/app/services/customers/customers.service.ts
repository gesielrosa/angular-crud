import {CustomerModel} from '../../models/customer.model';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private storageService: LocalStorageService) {
  }

  /**
   * Get a list of customers from localStorage.
   * @returns A Promise that resolves to 'CustomerModel[]' when the request is succeeds or fail.
   */
  getCustomers(): Promise<CustomerModel[]> {
    return new Promise((resolve) => {

      this.storageService.asPromisable().get('customers')
        .then((data: string) => {

          if (data) {

            let customers: CustomerModel[] = JSON.parse(data);
            resolve(customers);

          } else {
            resolve([]);
          }

        })
        .catch((e) => {
          console.error(e);
          resolve([]);
        });

    });
  }

  /**
   * Set a list of customers to localStorage.
   * @param customers A array of customers.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  setCustomers(customers: CustomerModel[]) {
    return new Promise((resolve, reject) => {

      this.storageService.asPromisable().set('customers', JSON.stringify(customers))
        .then((confirm: boolean) => {
          resolve(confirm ? 'Cadastro salvo com sucesso!' : 'Não foi possível salvar o cadastro.');
        })
        .catch((e) => {
          console.error(e);
          reject('Não foi possível salvar o cadastro.');
        });

    });
  }

  /**
   * Set a customer to localStorage.
   * @param customer A customer.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  setCustomer(customer: CustomerModel): Promise<string> {
    return new Promise((resolve, reject) => {

      this.getCustomers().then((customers: CustomerModel[]) => {

        const index = customers.findIndex(item => item.id == customer.id);

        if (index > -1) {
          customers[index] = customer;
        } else {
          customers.push(customer);
        }

        this.setCustomers(customers)
          .then(() => resolve('Cadastro salvo com sucesso!'))
          .catch((e: string) => {
            console.error(e);
            reject('Não foi possível salvar cadastro.');
          });

      });

    });
  }

  /**
   * Get a customer from localStorage by id.
   * @param id The id of customer.
   * @returns A Promise that resolves to 'CustomerModel' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  getCustomer(id: number): Promise<CustomerModel> {
    return new Promise((resolve, reject) => {

      this.getCustomers().then((customers: CustomerModel[]) => {

        const index = customers.findIndex(item => item.id == id);

        if (index > -1) {
          resolve(customers[index]);
        } else {
          reject('Cadastro não encontrado.');
        }

      });

    });
  }

  /**
   * Remove a customer from localStorage by id.
   * @param id The id of customer.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  removeCustomer(id: number) {
    return new Promise((resolve, reject) => {

      this.getCustomers().then((customers: CustomerModel[]) => {

        const index = customers.findIndex(item => item.id == id);

        if (index > -1) {
          customers.splice(index, 1);

          this.setCustomers(customers)
            .then(() => resolve('Cadastro removido com sucesso!'))
            .catch((e: string) => {
              console.error(e);
              reject('Não foi possível remover cadastro.');
            });

        } else {
          reject('Cadastro não encontrado.');
        }

      });

    });
  }

}
