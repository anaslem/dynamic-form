using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents;

/// <summary>
/// Configuration for a dynamic slider component.
/// </summary>
public class DynamicSliderConfigurationDto : ADynamicConfigurationDto
{
    /// <summary>
    /// Dynamic component type.
    /// </summary>
    public override DynamicComponentType DynamicComponentType => DynamicComponentType.Slider;

    /// <summary>
    /// Step value used to increment slider values.
    /// </summary>
    public decimal Step { get; set; } = default;

    /// <summary>
    /// Range allowed value.
    /// </summary>
    public DynamicRangeValueDto Range { get; set; } = default;

    /// <summary>
    /// Current slider value in single-value mode.
    /// </summary>
    public decimal Value { get; set; } = default;

    /// <summary>
    /// Indicates whether the slider uses range mode.
    /// </summary>
    public bool IsRange { get; set; }

    /// <summary>
    /// Selected minimum and maximum values in range mode.
    /// </summary>
    public DynamicRangeValueDto RangeValue { get; set; }

    /// <summary>
    /// Suffix displayed after the value.
    /// </summary>
    public string Suffix { get; set; } = string.Empty;

    /// <summary>
    /// Prefix displayed before the value.
    /// </summary>
    public string Prefix { get; set; } = string.Empty;
}