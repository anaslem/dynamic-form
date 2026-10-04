using Newtonsoft.Json;
using System.Collections.Generic;

namespace AbpDemo.As400Integration;

public class As400OptionItemDto
{
    [JsonProperty("optionId")]
    public int OptionId { get; set; }

    [JsonProperty("optionCode")]
    public string OptionCode { get; set; }

    /// <summary>
    /// Type d'option (C = Colour, O = Option, P = Package)
    /// </summary>
    [JsonProperty("optionType")]
    public string OptionType { get; set; }

    [JsonProperty("optionName")]
    public string OptionName { get; set; }

    [JsonProperty("categoryName")]
    public string CategoryName { get; set; }

    /// <summary>
    /// Description formatée ou avertissements.
    /// </summary>
    [JsonProperty("attributes")]
    public IReadOnlyList<string> Attributes { get; set; }

    /// <summary>
    /// Liste des IDs des options que ce choix désactive/exclut.
    /// Utilisé pour générer les DynamicFilterRules côté Angular.
    /// </summary>
    [JsonProperty("excludes")]
    public IReadOnlyList<int> Excludes { get; set; }

    /// <summary>
    /// Liste des règles d'options obligatoires (ex: "Le pack confort nécessite le GPS").
    /// </summary>
    [JsonProperty("requires")]
    public IReadOnlyList<As400RequirementDto> Requires { get; set; }
}

public class As400RequirementDto
{
    /// <summary>
    /// Tableau contenant les IDs des options requises. 
    /// Souvent, si le tableau contient plusieurs ID, cela signifie un "OU" logique 
    /// (ex: nécessite l'option 1088 OU 1086).
    /// </summary>
    [JsonProperty("optionId")]
    public IReadOnlyList<int> OptionIds { get; set; }
}