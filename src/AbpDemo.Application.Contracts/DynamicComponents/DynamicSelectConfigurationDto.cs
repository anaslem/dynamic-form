using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AbpDemo.DynamicComponents;

/// <summary>
/// Configuration for a dynamic selection component.
/// </summary>
public class DynamicSelectConfigurationDto : ADynamicConfigurationDto
{
    [JsonProperty("componentType")]
    public override DynamicComponentType ComponentType => DynamicComponentType.Select;

    public bool IsDropDownDisplay { get; set; } = true;

    public string Placeholder { get; set; } = "::GenericComponent:Select:DefaultPlaceholder";

    public bool IsMultiSelect { get; set; } = false;

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int? MaxSelectionLength { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string MessageWhenMaxSelectionLengthExceeded { get; set; }

    public bool ShouldEnableAutocomplete { get; set; } = false;

    public bool IsClearable { get; set; } = true;

    public DataSourceType DataSourceType { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public IReadOnlyList<DynamicOptionDto> StaticItems { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public ApiDataSourceDto ApiDataSourceDto { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public IReadOnlyList<string> DefaultValueIds { get; set; }
}