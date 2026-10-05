using AbpDemo.DynamicComponents.Common;
using System.Collections.Generic;

namespace AbpDemo.VehicleConfigurator;

public class VehicleConfiguratorFormDto
{
    public GlobalVehicleInfoDto GlobalInfo { get; set; } = new();
    public List<DynamicAccordionGroupDto> Accordions { get; set; } = new();
}

public class GlobalVehicleInfoDto
{
    public string RequestNumber { get; set; }
    public string AmountType { get; set; }
    public decimal RentValue { get; set; }
    public bool IsInCO2Policy { get; set; }
    public decimal TcoValue { get; set; }
}

public class DynamicAccordionGroupDto
{
    public string GroupCode { get; set; }
    public string Title { get; set; }
    public int Order { get; set; }
    public List<ADynamicConfigurationDto> Components { get; set; } = new();
}