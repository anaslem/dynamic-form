import type { ADynamicConfigurationDto } from './common/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleConfiguratorService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  getConfigurationForm = (vehicleId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ADynamicConfigurationDto[]>({
      method: 'GET',
      headers: { Accept: 'application/json' },
      url: `/api/app/vehicle-configurator/configuration-form/${vehicleId}`,
    },
    { apiName: this.apiName,...config });
}