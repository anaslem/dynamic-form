import type { ADynamicConfigurationDto, ApiDataSourceDto, DynamicOptionDto, DynamicRangeValueDto } from './common/models';
import type { DynamicComponentType } from '../enums/dynamic-component-type.enum';
import type { DynamicInputValueType } from '../enums/dynamic-input-value-type.enum';
import type { DataSourceType } from '../enums/data-source-type.enum';

export interface DynamicInputConfigurationDto extends ADynamicConfigurationDto {
  dynamicComponentType?: DynamicComponentType;
  placeholder?: string;
  indicator?: string;
  valueType?: DynamicInputValueType;
  range?: DynamicRangeValueDto;
  step?: number | null;
  defaultValue?: string;
  suffix?: string;
  maxLength?: number | null;
  minLength?: number | null;
  regexPattern?: string;
  isClearable?: boolean;
}

export interface DynamicSelectConfigurationDto extends ADynamicConfigurationDto {
  dynamicComponentType?: DynamicComponentType;
  isDropDownDisplay?: boolean;
  placeholder?: string;
  isMultiSelect?: boolean;
  maxSelectionLength?: number | null;
  messageWhenMaxSelectionLengthExceeded?: string;
  shouldEnableAutocomplete?: boolean;
  isClearable?: boolean;
  dataSourceType?: DataSourceType;
  staticItems?: DynamicOptionDto[];
  apiDataSourceDto?: ApiDataSourceDto;
  defaultValueIds?: string[];
}

export interface DynamicSliderConfigurationDto extends ADynamicConfigurationDto {
  dynamicComponentType?: DynamicComponentType;
  step?: number;
  range?: DynamicRangeValueDto;
  value?: number;
  isRange?: boolean;
  rangeValue?: DynamicRangeValueDto;
  suffix?: string;
  prefix?: string;
}
