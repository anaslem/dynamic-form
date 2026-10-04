using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AbpDemo.As400Integration;

/// <summary>
/// Contrat externe représentant la réponse brute de l'AS400/JATO.
/// </summary>
public class As400VehicleResponseDto
{
    [JsonProperty("vehicleId")]
    public long VehicleId { get; set; }

    [JsonProperty("brand")]
    public string Brand { get; set; }

    [JsonProperty("model")]
    public string Model { get; set; }

    [JsonProperty("jatoCodeLabel")]
    public string JatoCodeLabel { get; set; }

    [JsonProperty("rentalPeriod")]
    public int RentalPeriod { get; set; }

    [JsonProperty("kilometers")]
    public int Kilometers { get; set; }

    // --- PRICING ---
    [JsonProperty("vatExcludedRent")]
    public decimal VatExcludedRent { get; set; }

    [JsonProperty("rentVAT")]
    public decimal RentVAT { get; set; }

    [JsonProperty("vatIncludedRent")]
    public decimal VatIncludedRent { get; set; }

    [JsonProperty("photos")]
    public IReadOnlyList<string> Photos { get; set; }

    // --- ÉQUIPEMENTS DE SÉRIE ET TECHNIQUES ---
    [JsonProperty("equipments")]
    public IReadOnlyList<As400EquipmentDto> Equipments { get; set; }

    // --- OPTIONS DYNAMIQUES (Le tableau brut du JSON) ---
    [JsonProperty("options")]
    public IReadOnlyList<As400OptionItemDto> RawOptions { get; set; }

    // ========================================================================
    // HELPER PROPERTIES : Répond à ton besoin de séparation "listColor, listOption"
    // Ces propriétés ne sont pas dans le JSON, elles sont calculées à la volée 
    // par le backend pour faciliter le mapping vers Angular.
    // ========================================================================

    /// <summary>
    /// Liste des couleurs extérieures (OptionType == "C").
    /// </summary>
    [JsonIgnore]
    public IEnumerable<As400OptionItemDto> Colors =>
        RawOptions?.Where(o => o.OptionType == "C") ?? Enumerable.Empty<As400OptionItemDto>();

    /// <summary>
    /// Liste des Packs / Prestations (OptionType == "P").
    /// </summary>
    [JsonIgnore]
    public IEnumerable<As400OptionItemDto> Packages =>
        RawOptions?.Where(o => o.OptionType == "P") ?? Enumerable.Empty<As400OptionItemDto>();

    /// <summary>
    /// Liste des options individuelles (OptionType == "O").
    /// </summary>
    [JsonIgnore]
    public IEnumerable<As400OptionItemDto> StandaloneOptions =>
        RawOptions?.Where(o => o.OptionType == "O") ?? Enumerable.Empty<As400OptionItemDto>();
}