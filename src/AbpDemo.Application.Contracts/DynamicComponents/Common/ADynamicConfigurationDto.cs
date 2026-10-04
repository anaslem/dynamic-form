using AbpDemo.Enums;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AbpDemo.DynamicComponents.Common;

public abstract class ADynamicConfigurationDto
{
    [JsonProperty("componentType")]
    public abstract DynamicComponentType ComponentType { get; }

    public string Id { get; set; }

    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// NOUVEAU : Nom du panneau de l'accordéon dans lequel ce composant doit s'afficher.
    /// Exemples : "La durée et kilomètrage", "Les options", "Energie".
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string GroupName { get; set; }

    public bool IsDisplayed { get; set; } = true;

    public bool Disabled { get; set; } = false;

    public bool Required { get; set; } = false;

    public int Order { get; set; } = default;

    public bool ShouldDetectChanges { get; set; } = false;

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public IReadOnlyList<DynamicFilterRuleDto> FilterRules { get; set; }

    public string Label { get; set; } = string.Empty;
}