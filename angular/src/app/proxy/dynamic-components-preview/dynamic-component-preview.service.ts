import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { DynamicInputConfigurationDto, DynamicSelectConfigurationDto, DynamicSliderConfigurationDto } from '../dynamic-components/models';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentPreviewService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  getInputConfig = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DynamicInputConfigurationDto>({
      method: 'GET',
      headers: { Accept: 'application/json' },
      url: '/api/app/dynamic-component-preview/input-config',
    },
    { apiName: this.apiName,...config });
  

  getSelectConfig = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DynamicSelectConfigurationDto>({
      method: 'GET',
      headers: { Accept: 'application/json' },
      url: '/api/app/dynamic-component-preview/select-config',
    },
    { apiName: this.apiName,...config });
  

  getSliderConfig = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DynamicSliderConfigurationDto>({
      method: 'GET',
      headers: { Accept: 'application/json' },
      url: '/api/app/dynamic-component-preview/slider-config',
    },
    { apiName: this.apiName,...config });
}