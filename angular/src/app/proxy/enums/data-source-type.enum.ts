import { mapEnumToOptions } from '@abp/ng.core';

export enum DataSourceType {
  Static = 1,
  Api = 2,
}

export const dataSourceTypeOptions = mapEnumToOptions(DataSourceType);
