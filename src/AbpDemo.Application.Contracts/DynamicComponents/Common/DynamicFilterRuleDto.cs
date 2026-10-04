using AbpDemo.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Represents a filter rule applied to a dynamic component.
/// </summary>
public class DynamicFilterRuleDto
{
    /// <summary>
    /// Identifier of the target component affected by the rule.
    /// </summary>
    public string TargetFilterId { get; set; }

    /// <summary>
    /// Action to apply when the rule is satisfied.
    /// </summary>
    public DynamicFilterRuleActionType ActionType { get; set; }

    /// <summary>
    /// Comparison operator used by the rule.
    /// </summary>
    public DynamicFilterRuleOperatorType OperatorType { get; set; }

    /// <summary>
    /// Name of the property evaluated by the rule.
    /// </summary>
    public string PropertyName { get; set; }

    // NOUVEAU : La valeur à comparer (ex: true, "0000543", etc.)
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public object TargetValue { get; set; }
}
