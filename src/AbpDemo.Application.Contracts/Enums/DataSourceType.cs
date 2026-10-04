using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.Enums;

/// <summary>
/// Represents the source used to populate options for a dynamic component.
/// </summary>
public enum DataSourceType
{
    /// <summary>
    /// Data is statically defined in the configuration.
    /// </summary>
    Static = 1,

    /// <summary>
    /// Data is retrieved through an API call.
    /// </summary>
    Api = 2
}
/// <summary>
/// Identifies the dynamic component type to render.
/// </summary>
public enum DynamicComponentType
{
    /// <summary>
    /// Selection component (dropdown list).
    /// </summary>
    Select = 1,

    /// <summary>
    /// Slider component.
    /// </summary>
    Slider = 2,

    /// <summary>
    /// Free input component.
    /// </summary>
    Input = 3,
    Toggle = 4
}
public enum DynamicFilterRuleActionType { Show, Hide, Disable, Enable }
public enum DynamicFilterRuleOperatorType { Equals, NotEquals, GreaterThan, LessThan }

/// <summary>
/// Represents the value type allowed in a dynamic input field.
/// </summary>
public enum DynamicInputValueType
{
    /// <summary>
    /// Integer value.
    /// </summary>
    Integer = 1,

    /// <summary>
    /// Decimal value.
    /// </summary>
    Decimal = 2,

    /// <summary>
    /// Text value.
    /// </summary>
    Text = 3,
}
