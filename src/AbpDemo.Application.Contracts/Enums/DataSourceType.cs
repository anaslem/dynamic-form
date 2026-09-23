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
    Input = 3
}
/// <summary>
/// Defines the action to apply when a filter rule is satisfied.
/// </summary>
public enum DynamicFilterRuleActionType
{
    /// <summary>
    /// Makes the component visible and active.
    /// </summary>
    RenderDisplay = 1,

    /// <summary>
    /// Displays the component without removing it from configuration.
    /// </summary>
    Display = 2,

    /// <summary>
    /// Removes the component from display.
    /// </summary>
    Delete = 3,
}
/// <summary>
/// Defines the comparison operator used by a dynamic filter rule.
/// </summary>
public enum DynamicFilterRuleOperatorType
{
    /// <summary>
    /// Checks that a value contains the expected target.
    /// </summary>
    Contains = 1,

    /// <summary>
    /// Checks that a value belongs to a set of values.
    /// </summary>
    In = 2
}

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
