import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicFilterRuleOperatorType {
  Contains = 1,
  In = 2,
}

export const dynamicFilterRuleOperatorTypeOptions = mapEnumToOptions(DynamicFilterRuleOperatorType);
