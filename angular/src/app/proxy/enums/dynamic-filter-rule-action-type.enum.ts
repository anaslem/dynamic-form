import { mapEnumToOptions } from '@abp/ng.core';

export enum DynamicFilterRuleActionType {
  RenderDisplay = 1,
  Display = 2,
  Delete = 3,
}

export const dynamicFilterRuleActionTypeOptions = mapEnumToOptions(DynamicFilterRuleActionType);
