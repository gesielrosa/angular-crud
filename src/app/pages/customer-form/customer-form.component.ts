import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {CustomersService} from '../../services/customers/customers.service';
import {CustomerModel} from '../../models/customer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toaster} from 'ngx-toast-notifications';
import {validatorCPF} from '../../shared/utils/validators';
import {VehicleBrandModel} from '../../models/vehicle-brand.model';
import {VehicleModelModel} from '../../models/vehicle-model.model';
import {VehiclesService} from '../../services/vehicles/vehicles.service';

@Component({
  selector: 'ac-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  isLoading: boolean = false;
  vehiclesBrands: VehicleBrandModel[] = [];
  vehiclesModels: VehicleModelModel[] = [];

  constructor(private customersService: CustomersService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toaster: Toaster,
              private vehiclesService: VehiclesService) {

    this.customerForm = this.formBuilder.group({
      id: [Date.now()],
      name: ['', Validators.compose([Validators.required])],
      doc: ['', Validators.compose([Validators.required, validatorCPF()])],
      phone: ['', Validators.compose([Validators.required])],
      birth: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      complement: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      vehicle_brand: ['', Validators.compose([Validators.required])],
      vehicle_model: ['', Validators.compose([Validators.required])],
      vehicle_model_name: ['']
    });

  }

  async ngOnInit() {
    this.isLoading = true;

    let customerId: string;

    await this.route.params
      .subscribe((params: Params) => customerId = params['id']);

    if (customerId) {
      await this.getCustomer(Number(customerId));
    }

    await this.getVehiclesBrands();

    this.isLoading = false;
  }

  /**
   * Get customer by id and set to form.
   * @param id The id of customer.
   * @returns A new void Promise.
   */
  async getCustomer(id: number): Promise<void> {
    await this.customersService.getCustomer(id)
      .then((customer: CustomerModel) => {

        this.customerForm.patchValue(customer);

        if (customer.vehicle_brand) {
          this.getVehiclesModelsByBrandCod(customer.vehicle_brand);
        }

      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Save the customer form.
   */
  setCustomer(): void {
    this.customersService.setCustomer(this.customerForm.value)
      .then((msg: string) => {
        this.toaster.open(msg, {type: 'success'});
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Get vehicles brands.
   * @returns A new void Promise.
   */
  async getVehiclesBrands(): Promise<void> {
    await this.vehiclesService.getVehiclesBrands()
      .then((brands: VehicleBrandModel[]) => {
        this.vehiclesBrands = brands;
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Get vehicles models by cod brand.
   * @param cod The cod of brand.
   * @returns A new void Promise.
   */
  async getVehiclesModelsByBrandCod(cod: string): Promise<void> {
    await this.vehiclesService.getVehiclesModelsByBrandCod(cod)
      .then((models: VehicleModelModel[]) => {
        this.vehiclesModels = models;
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Reset vehicle model formControls and get vehicles models by cod brand.
   * @param ev The event.
   * @returns A new void Promise.
   */
  async changeVehicleBrand(ev: any): Promise<void> {
    this.isLoading = true;
    this.customerForm.controls.vehicle_model.reset();
    this.customerForm.controls.vehicle_model_name.reset();
    await this.getVehiclesModelsByBrandCod(ev.value);
    this.isLoading = false;
  }

  /**
   * Set a new vehicle name when the vehicle model is changed.
   * @param ev The event.
   */
  changeVehicleModel(ev: any): void {
    if (ev && ev.value) {

      const index = this.vehiclesModels.findIndex(item => item.codigo == ev.value);
      if (index > -1) {
        this.customerForm.controls.vehicle_model_name.setValue(this.vehiclesModels[index].nome);
      }

    } else {
      this.customerForm.controls.vehicle_model_name.reset();
    }
  }

  /**
   * Check if formControl is invalid.
   * @param controlName The name of formControl.
   * @returns CSS class name when invalid or null on valid.
   */
  checkInvalid(controlName: string): string {
    if (this.customerForm.controls[controlName].untouched) return null;
    return this.customerForm.controls[controlName].invalid ? 'is-invalid' : null;
  }

}
