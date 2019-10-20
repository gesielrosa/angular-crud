import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {VehicleBrandModel} from '../../models/vehicle-brand.model';
import {VehicleModelModel} from '../../models/vehicle-model.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get vehicle brand list.
   * @returns A Promise that resolves to 'VehicleBrandModel[]' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  getVehiclesBrands(): Promise<VehicleBrandModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
        .subscribe((brands: VehicleBrandModel[]) => {
          resolve(brands);
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Não foi possível buscar a lista de marcas. (Cod.: ${error.status})`);
        });

    });
  }

  /**
   * Get a list of vehicle models by brand code.
   * @param cod Brand code.
   * @returns A Promise that resolves to 'VehicleModelModel[]' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  getVehiclesModelsByBrandCod(cod: string): Promise<VehicleModelModel[]> {
    return new Promise((resolve, reject) => {

      this.http.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${cod}/modelos`)
        .subscribe((models: { anos: any[], modelos: VehicleModelModel[] }) => {

          if (models && models.modelos) {
            resolve(models.modelos);
          } else {
            resolve([]);
          }

        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Não foi possível buscar a lista de modelos de veículos. (Cod.: ${error.status})`);
        });

    });
  }

}
