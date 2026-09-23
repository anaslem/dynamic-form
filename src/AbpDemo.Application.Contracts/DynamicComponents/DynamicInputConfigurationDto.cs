using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents;

/// <summary>
/// Configuration for a dynamic numeric input component.
/// </summary>
public class DynamicInputConfigurationDto : ADynamicConfigurationDto
{
    /// <summary>
    /// Dynamic component type.
    /// </summary>
    public override DynamicComponentType DynamicComponentType => DynamicComponentType.Input;

    /// <summary>
    /// Placeholder text shown when the value is empty.
    /// </summary>
    public string Placeholder { get; set; } = "::GenericComponent:Input:DefaultPlaceholder";

    /// <summary>
    /// Indicator text shown for more information.
    /// </summary>
    public string Indicator { get; set; } = string.Empty;

    /// <summary>
    /// Expected value type for the input.
    /// </summary>
    public DynamicInputValueType ValueType { get; set; } = DynamicInputValueType.Integer;

    /// <summary>
    /// Range allowed value.
    /// </summary>
    public DynamicRangeValueDto Range { get; set; }

    /// <summary>
    /// Increment step between values.
    /// </summary>
    public decimal? Step { get; set; }

    /// <summary>
    /// Initial value of the field.
    /// </summary>
    public string DefaultValue { get; set; }

    /// <summary>
    /// Prefix displayed before the value.
    /// </summary>
    public string Prefix { get; set; } = string.Empty;

    // Nouvelle propriété pour la validation des textes
    public int? MaxLength { get; set; }
}
