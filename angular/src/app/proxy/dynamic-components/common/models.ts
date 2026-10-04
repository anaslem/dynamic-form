import type { DynamicComponentType } from '../../enums/dynamic-component-type.enum';
import type { DynamicFilterRuleActionType } from '../../enums/dynamic-filter-rule-action-type.enum';
import type { DynamicFilterRuleOperatorType } from '../../enums/dynamic-filter-rule-operator-type.enum';

export interface ADynamicConfigurationDto {
  componentType?: DynamicComponentType;
  id?: string;
  name?: string;
  groupName?: string;
  isDisplayed?: boolean;
  disabled?: boolean;
  required?: boolean;
  order?: number;
  shouldDetectChanges?: boolean;
  filterRules?: DynamicFilterRuleDto[];
  label?: string;
}

export interface DynamicFilterRuleDto {
  targetFilterId?: string;
  actionType?: DynamicFilterRuleActionType;
  operatorType?: DynamicFilterRuleOperatorType;
  propertyName?: string;
  targetValue?: object;
}

export interface ApiDataSourceDto {
  serviceName?: string;
  methodName?: string;
}

export interface DynamicOptionDto {
  id?: string;
  parentId?: string;
  value?: string;
  suffixValue?: string;
  indicator?: string;
  disabled?: boolean;
  disabledReason?: string;
  isSelected?: boolean;
  externalReferenceId?: string;
  priceInfo?: DynamicPriceDto;
}

export interface DynamicPriceDto {
  amount?: number | null;
  currency?: string;
  formattedDisplay?: string;
}

export interface DynamicRangeValueDto {
  minValue?: number;
  maxValue?: number;
}
