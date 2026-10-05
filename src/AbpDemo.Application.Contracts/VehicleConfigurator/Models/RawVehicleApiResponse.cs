using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AbpDemo.VehicleConfigurator.Models;

public class RawVehicleApiResponse
{
    public int RequestNumber { get; set; }
    public string AmountType { get; set; }
    public RawRent Rent { get; set; }
    public bool IsInCO2policy { get; set; }
    public RawTco Tco { get; set; }
    public List<RawPrestationCategory> Prestations { get; set; } = new();
    public List<RawOption> Options { get; set; } = new();
    public List<RawOption> Accessories { get; set; } = new(); // Si présent dans le flux
    public List<RawColor> ExternalColors { get; set; } = new();
    public List<RawColor> InternalColors { get; set; } = new();
}

public class RawRent
{
    public decimal ValueTTC { get; set; }
}

public class RawTco
{
    public decimal Value { get; set; }
}

public class RawPrestationCategory
{
    public string Category { get; set; }
    public List<RawPrestationItem> Items { get; set; } = new();
}

public class RawPrestationItem
{
    public string Id { get; set; }
    public string Family { get; set; }
    public string AbbreviatedName { get; set; }
    public string ShortDescription { get; set; }
    public string Tooltip { get; set; }
    public bool IsSelectable { get; set; }
    public bool IsSelected { get; set; }

    public RawQuantityConfiguration QuantityConfigurations { get; set; }
    public List<RawAs400Configuration> AS400Configurations { get; set; } = new();
}

public class RawQuantityConfiguration
{
    public int Min { get; set; }
    public int Max { get; set; }
    public int DefaultValue { get; set; }
    public int Value { get; set; }
    public bool IsUpdatable { get; set; }
}

public class RawAs400Configuration
{
    public string Name { get; set; }
    public string DefaultIdentifier { get; set; }
}

public class RawOption
{
    public int Id { get; set; }
    public string Name { get; set; }
    public RawAmount Amount { get; set; }
    public decimal AmountToDisplay { get; set; }
    public bool IsSelected { get; set; }
}

public class RawAmount
{
    public decimal ValueTTC { get; set; }
    public decimal ValueHT { get; set; }
}

public class RawColor
{
    public int Id { get; set; }
    public string JatoName { get; set; }
}