using Newtonsoft.Json;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Represents a selectable option in a dynamic component.
/// </summary>
public class DynamicOptionDto
{
    /// <summary>
    /// Identifiant déterministe (ex: "opt_gps_premium").
    /// </summary>
    public string Id { get; set; } = string.Empty;

    public string ParentId { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string SuffixValue { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string Indicator { get; set; }

    public bool Disabled { get; set; } = false;

    /// <summary>
    /// Explique à l'utilisateur pourquoi l'option est grisée (ex: "Incompatible avec Pack Sport").
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string DisabledReason { get; set; }

    public bool IsSelected { get; set; }

    /// <summary>
    /// Référence technique pour faire le lien avec l'ERP/AS400 côté backend (sans polluer le frontend).
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string ExternalReferenceId { get; set; }

    /// <summary>
    /// Impact financier de cette option.
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public DynamicPriceDto PriceInfo { get; set; }
}