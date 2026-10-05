import type { VehicleConfiguratorFormDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleConfiguratorFormService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  getConfiguration = (requestNumber: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VehicleConfiguratorFormDto>({
      method: 'GET',
      headers: { Accept: 'application/json' },
      url: '/api/app/vehicle-configurator-form/configuration',
      params: { requestNumber },
    },
    { apiName: this.apiName,...config });
}