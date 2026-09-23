using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents;

/// <summary>
/// Configuration for a dynamic selection component.
/// </summary>
public class DynamicSelectConfigurationDto : ADynamicConfigurationDto
{
    /// <summary>
    /// Dynamic component type.
    /// </summary>
    public override DynamicComponentType DynamicComponentType => DynamicComponentType.Select;

    /// <summary>
    /// Indicate the display type. dropdown or list.
    /// </summary>
    public bool IsDropDownDisplay { get; set; } = true;

    /// <summary>
    /// Placeholder shown when no option is selected.
    /// </summary>
    public string Placeholder { get; set; } = "::GenericComponent:Select:DefaultPlaceholder";

    /// <summary>
    /// Indicates whether multiple selection is allowed.
    /// </summary>
    public bool IsMultiSelect { get; set; } = false;

    /// <summary>
    /// Maximum number of selectable items.
    /// </summary>
    public int? MaxSelectionLength { get; set; } = default;

    /// <summary>
    /// Message displayed when maximum selection length is reached.
    /// </summary>
    public string MessageWhenMaxSelectionLengthExceeded { get; set; } = "::GenericComponent:Select:DefaultMessageWhenMaxSelectionLengthExceeded";

    /// <summary>
    /// Indicates whether autocomplete should be enabled.
    /// </summary>
    public bool ShouldEnableAutocomplete { get; set; } = false;

    /// <summary>
    /// Indicates whether the selection can be cleared.
    /// </summary>
    public bool IsClearable { get; set; } = true;

    /// <summary>
    /// Source of the component options.
    /// </summary>
    public DataSourceType DataSourceType { get; set; }

    /// <summary>
    /// List of available static options.
    /// </summary>
    public IList<DynamicOptionDto> StaticItems { get; set; }

    /// <summary>
    /// API data source configuration.
    /// </summary>
    public ApiDataSourceDto ApiDataSourceDto { get; set; }

    /// <summary>
    /// Identifiers of options selected by default.
    /// </summary>
    public IList<string> DefaultValueIds { get; set; }
}