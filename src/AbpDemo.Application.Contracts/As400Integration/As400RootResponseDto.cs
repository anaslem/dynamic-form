using Newtonsoft.Json;
using System.Collections.Generic;

namespace AbpDemo.As400Integration;

public class As400RootResponseDto
{
    [JsonProperty("result")] public As400ResultDto Result { get; set; }
}

public class As400ResultDto
{
    [JsonProperty("quotationModuleElements")] public As400QuotationElementsDto Elements { get; set; }
}

public class As400QuotationElementsDto
{
    [JsonProperty("listeOptions")] public List<As400OptionDto> ListeOptions { get; set; }
    [JsonProperty("listeAccesoires")] public List<As400AccessoireDto> ListeAccessoires { get; set; }
    [JsonProperty("listePrestations")] public List<As400PrestationCategoryDto> ListePrestations { get; set; }
}

public class As400OptionDto
{
    [JsonProperty("numeroOption")] public long NumeroOption { get; set; }
    [JsonProperty("libelleOption")] public string LibelleOption { get; set; }
    [JsonProperty("montantAAfficher")] public decimal MontantAAfficher { get; set; }
    [JsonProperty("selectionne")] public string Selectionne { get; set; }
    [JsonProperty("obligatoire")] public string Obligatoire { get; set; }
}

public class As400AccessoireDto
{
    [JsonProperty("numeroAccessoire")] public long NumeroAccessoire { get; set; }
    [JsonProperty("libelleAccessoire")] public string LibelleAccessoire { get; set; }
    [JsonProperty("montantAAfficher")] public decimal MontantAAfficher { get; set; }
    [JsonProperty("selectionne")] public string Selectionne { get; set; }
}

public class As400PrestationCategoryDto
{
    [JsonProperty("categoryPrestation")] public string CategoryPrestation { get; set; }
    [JsonProperty("prestations")] public List<As400PrestationDto> Prestations { get; set; }
}

public class As400PrestationDto
{
    [JsonProperty("numeroPrestation")] public string NumeroPrestation { get; set; }
    [JsonProperty("libelleAbrege")] public string LibelleAbrege { get; set; }
    [JsonProperty("libelleCourt")] public string LibelleCourt { get; set; }
    [JsonProperty("libelleLong")] public string LibelleLong { get; set; }
    [JsonProperty("infoBulle")] public string InfoBulle { get; set; }
    [JsonProperty("selectionnable")] public string Selectionnable { get; set; }
    [JsonProperty("selectionne")] public int Selectionne { get; set; }
    [JsonProperty("obligatoire")] public string Obligatoire { get; set; }

    [JsonProperty("dataSaisissable")] public bool DataSaisissable { get; set; }
    [JsonProperty("listNameDataSaisissable")] public List<string> ListNameDataSaisissable { get; set; }

    [JsonProperty("quantiteMin")] public decimal QuantiteMin { get; set; }
    [JsonProperty("quantiteMax")] public decimal QuantiteMax { get; set; }
    [JsonProperty("quantiteDefaut")] public decimal QuantiteDefaut { get; set; }

    [JsonProperty("montantMin")] public decimal MontantMin { get; set; }
    [JsonProperty("montantMax")] public decimal MontantMax { get; set; }
    [JsonProperty("montantDefaut")] public decimal MontantDefaut { get; set; }

    [JsonProperty("tauxMinPrcent")] public decimal TauxMinPrcent { get; set; }
    [JsonProperty("tauxMaxPrcent")] public decimal TauxMaxPrcent { get; set; }
    [JsonProperty("tauxDefautPrcent")] public decimal TauxDefautPrcent { get; set; }

    [JsonProperty("listwq")] public List<As400WqItemDto> ListWq { get; set; }
}

public class As400WqItemDto
{
    [JsonProperty("label")] public string Label { get; set; }
    [JsonProperty("identifiantDefault")] public string IdentifiantDefault { get; set; }
}