using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Nodes;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Represents a selectable option in a dynamic component.
/// </summary>
public class DynamicOptionDto
{
    /// <summary>
    /// Unique identifier of the option.
    /// </summary>
    public string Id { get; set; } = string.Empty;

    /// <summary>
    /// Parent identifier for hierarchical option structures.
    /// </summary>
    public string ParentId { get; set; } = string.Empty;

    /// <summary>
    /// Main label or value displayed.
    /// </summary>
    public string Value { get; set; } = string.Empty;

    /// <summary>
    /// Additional value displayed as a suffix.
    /// </summary>
    public string SuffixValue { get; set; } = string.Empty;

    /// <summary>
    /// Visual indicator associated with the option.
    /// </summary>
    public string Indicator { get; set; } = string.Empty;

    /// <summary>
    /// Indicates whether the option is disabled.
    /// </summary>
    public bool Disabled { get; set; } = false;

    /// <summary>
    /// Indicates whether the option is selected.
    /// </summary>
    public bool IsSelected { get; set; }

    /// <summary>
    /// Raw business value originating from the AS400 system.
    /// </summary>
    public object As400Value { get; set; }
}
