import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicFilterRuleOperatorType {
  Equals = 0,
  NotEquals = 1,
  GreaterThan = 2,
  LessThan = 3,
}

export const dynamicFilterRuleOperatorTypeOptions = mapEnumToOptions(DynamicFilterRuleOperatorType);
