import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {CustomersService} from '../../services/customers/customers.service';
import {CustomerModel} from '../../models/customer.model';
import {Toaster} from 'ngx-toast-notifications';

@Component({
  selector: 'ac-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: CustomerModel[] = [];
  itemSelected: number;
  modalRemoveCustomer: BsModalRef;

  constructor(private customersService: CustomersService,
              private modalService: BsModalService,
              private toaster: Toaster) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  /**
   * Get customers list.
   * * @returns A new void Promise.
   */
  async getCustomers(): Promise<void> {
    await this.customersService.getCustomers().then((customers: CustomerModel[]) => {
      this.customers = customers;
    });
  }

  /**
   * Remove customer by id.
   * @param id The id of customer.
   * @returns A new void Promise.
   */
  async removeCustomer(id: number): Promise<void> {
    await this.customersService.removeCustomer(id).then((msg: string) => {
      this.toaster.open(msg, {type: 'success'});
      this.getCustomers();
    }).catch((e: string) => {
      console.error(e);
    });
  }

  /**
   * Open the modal to confirm the action.
   * @param template The ng-template to be loaded into the 'modalService'.
   * @param id The id of customer.
   */
  alertRemoveCustomer(template: TemplateRef<any>, id: number): void {
    this.itemSelected = id;
    this.modalRemoveCustomer = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirms the user action to remove the customer.
   * @param bool User action.
   * @returns A new void Promise.
   */
  async confirmRemoveCustomer(bool: boolean): Promise<void> {
    this.modalRemoveCustomer.hide();
    if (bool) {
      await this.removeCustomer(this.itemSelected);
    }
    this.itemSelected = null;
  }

}
