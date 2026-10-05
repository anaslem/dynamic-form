import type { ADynamicConfigurationDto } from '../dynamic-components/common/models';

export interface DynamicAccordionGroupDto {
  groupCode?: string;
  title?: string;
  order?: number;
  components?: ADynamicConfigurationDto[];
}

export interface GlobalVehicleInfoDto {
  requestNumber?: string;
  amountType?: string;
  rentValue?: number;
  isInCO2Policy?: boolean;
  tcoValue?: number;
}

export interface VehicleConfiguratorFormDto {
  globalInfo?: GlobalVehicleInfoDto;
  accordions?: DynamicAccordionGroupDto[];
}
