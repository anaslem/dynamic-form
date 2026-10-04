import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicFilterRuleActionType {
  Show = 0,
  Hide = 1,
  Disable = 2,
  Enable = 3,
}

export const dynamicFilterRuleActionTypeOptions = mapEnumToOptions(DynamicFilterRuleActionType);
