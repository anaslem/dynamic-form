import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicComponentType {
  Select = 1,
  Slider = 2,
  Input = 3,
}

export const dynamicComponentTypeOptions = mapEnumToOptions(DynamicComponentType);
