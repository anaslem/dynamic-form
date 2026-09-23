using AbpDemo.DynamicComponents;
using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AbpDemo.DynamicComponentsPreview;

public class DynamicComponentPreviewAppService: ApplicationService, IDynamicComponentPreviewAppService
{
    public async Task<DynamicSelectConfigurationDto> GetSelectConfigAsync()
    {
        return new DynamicSelectConfigurationDto()
        {
            Name = "countries",
            Label = "::GenericComponent:Select:DefaultLabel",
            Placeholder = "::GenericComponent:Select:DefaultPlaceholder",
            IsMultiSelect = true,
            IsDisplayed = true,
            Disabled = false,
            IsClearable = false,
            Required = false,
            ShouldEnableAutocomplete = false,
            DataSourceType = DataSourceType.Static,
            StaticItems = new List<DynamicOptionDto>() { new DynamicOptionDto() { Id = "1", Value = "France" }, new DynamicOptionDto() { Id = "2", Value = "Germany" } },
            DefaultValueIds = new List<string>() { "1" },
            ShouldDetectChanges = false,
        };
    }

    public async Task<DynamicInputConfigurationDto> GetInputConfigAsync()
    {
        return new DynamicInputConfigurationDto()
        {
            Name = "countries",
            Label = "::GenericComponent:Input:DefaultLabel",
            Placeholder = "::GenericComponent:Input:DefaultPlaceholder",
            Indicator = "::GenericComponent:Indicator:DefaultPlaceholder",
            IsDisplayed = true,
            ValueType = DynamicInputValueType.Integer,
            Range = new DynamicRangeValueDto { MaxValue = 1000, MinValue = 0 },
            Step = 1,
            MaxLength = 1000,
            Disabled = false,
            Required = false,
            ShouldDetectChanges = false,
        };
    }

    public async Task<DynamicSliderConfigurationDto> GetSliderConfigAsync()
    {
        return new DynamicSliderConfigurationDto()
        {
            Name = "dinpower",
            IsDisplayed = true,
            Disabled = false,
            Required = false,
            ShouldDetectChanges = false,
            IsRange = true,
            Range = new DynamicRangeValueDto
            {
                MinValue = 0,
                MaxValue = 100,
            },
            Step = 1,
            RangeValue = new DynamicRangeValueDto
            {
                MinValue = 20,
                MaxValue = 60
            }
        };
    }
}
