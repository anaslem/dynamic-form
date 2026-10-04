using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using Newtonsoft.Json;
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
    [JsonProperty("componentType")]
    public override DynamicComponentType ComponentType => DynamicComponentType.Input;

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

    // 1. Prefix renommé en Suffix !
    public string Suffix { get; set; } = string.Empty;

    public int? MaxLength { get; set; }

    // 2. NOUVEAU : Longueur minimum
    public int? MinLength { get; set; }

    // 3. NOUVEAU : Expression régulière
    public string RegexPattern { get; set; }

    // 4. NOUVEAU : Bouton pour vider le champ
    public bool IsClearable { get; set; } = false;
}
