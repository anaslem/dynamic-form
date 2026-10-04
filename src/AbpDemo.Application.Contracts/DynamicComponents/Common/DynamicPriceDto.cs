using Newtonsoft.Json;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Représente l'impact financier d'une option ou d'un composant.
/// </summary>
public class DynamicPriceDto
{
    /// <summary>
    /// Montant brut (ex: 15.00). Null si l'option est gratuite.
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public decimal? Amount { get; set; }

    /// <summary>
    /// Devise (ex: "EUR").
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string Currency { get; set; }

    /// <summary>
    /// Texte formaté prêt à être affiché par Angular (ex: "+ 15 € / jour").
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string FormattedDisplay { get; set; }
}