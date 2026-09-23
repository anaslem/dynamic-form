import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicInputValueType {
  Integer = 1,
  Decimal = 2,
  Text = 3,
}

export const dynamicInputValueTypeOptions = mapEnumToOptions(DynamicInputValueType);
