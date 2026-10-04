using Newtonsoft.Json;

namespace AbpDemo.As400Integration;

public class As400EquipmentDto
{
    [JsonProperty("schemaId")]
    public int SchemaId { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("translatedCategoryName")]
    public string Category { get; set; }

    [JsonProperty("formattedLabel")]
    public string FormattedLabel { get; set; }

    [JsonProperty("isStandard")]
    public bool IsStandard { get; set; }

    /// <summary>
    /// Peut contenir un prix si l'équipement n'est pas standard et est facturé séparément.
    /// </summary>
    [JsonProperty("value")]
    public string Value { get; set; }
}