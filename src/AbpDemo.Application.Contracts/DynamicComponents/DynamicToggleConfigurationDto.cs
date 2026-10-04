using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using Newtonsoft.Json;

namespace AbpDemo.DynamicComponents;

public class DynamicToggleConfigurationDto : ADynamicConfigurationDto
{
    [JsonProperty("componentType")]
    public override DynamicComponentType ComponentType => DynamicComponentType.Toggle;

    /// <summary>
    /// Valeur par défaut (coché ou non).
    /// </summary>
    public bool Value { get; set; }

    /// <summary>
    /// Le petit texte gris en italique sous le champ.
    /// </summary>
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string InfoBulle { get; set; }
}