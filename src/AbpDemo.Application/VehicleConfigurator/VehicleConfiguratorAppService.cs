using AbpDemo.As400Integration;
using AbpDemo.DynamicComponents;
using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using AbpDemo.VehicleConfigurator.Models;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AbpDemo.VehicleConfigurator;

public class VehicleConfiguratorFormAppService : ApplicationService, IVehicleConfiguratorFormAppService
{
    public async Task<VehicleConfiguratorFormDto> GetConfigurationAsync(string requestNumber)
    {
        // 1. Simulation de l'appel à l'API AS400 (à remplacer par votre HttpClient)
        RawVehicleApiResponse rawData = await GetJsonFromApiAsync(requestNumber);

        var response = new VehicleConfiguratorFormDto
        {
            GlobalInfo = new GlobalVehicleInfoDto
            {
                RequestNumber = rawData.RequestNumber.ToString(),
                AmountType = rawData.AmountType,
                RentValue = rawData.Rent?.ValueTTC ?? 0,
                IsInCO2Policy = rawData.IsInCO2policy,
                TcoValue = rawData.Tco?.Value ?? 0
            }
        };

        // --- 1. ACCORDÉON : KILOMÉTRAGE & DURÉE (Mois) ---
        var kmDureeGroup = new DynamicAccordionGroupDto { Title = "Kilométrage & Durée", GroupCode = "KM_MONTH", Order = 1 };

        var allItems = rawData.Prestations.SelectMany(p => p.Items).ToList();
        var dureePresta = allItems.FirstOrDefault(i => i.Id == "0000000560");
        var kmPresta = allItems.FirstOrDefault(i => i.Id == "0000000561");

        if (dureePresta != null)
        {
            kmDureeGroup.Components.Add(new DynamicInputConfigurationDto
            {
                Id = "duree_mois",
                Name = "DureeMois",
                Label = "Durée",
                ValueType = DynamicInputValueType.Integer,
                DefaultValue = dureePresta.QuantityConfigurations.DefaultValue.ToString(),
                Range = new DynamicRangeValueDto { MinValue = dureePresta.QuantityConfigurations.Min, MaxValue = dureePresta.QuantityConfigurations.Max },
                Suffix = "mois",
                Order = 1
            });
        }

        if (kmPresta != null)
        {
            kmDureeGroup.Components.Add(new DynamicInputConfigurationDto
            {
                Id = "kilometrage",
                Name = "Kilometrage",
                Label = "Kilométrage annuel",
                ValueType = DynamicInputValueType.Integer,
                DefaultValue = kmPresta.QuantityConfigurations.DefaultValue.ToString(),
                Range = new DynamicRangeValueDto { MinValue = kmPresta.QuantityConfigurations.Min, MaxValue = kmPresta.QuantityConfigurations.Max },
                Step = 5000,
                Suffix = "km",
                Order = 2
            });
        }
        if (kmDureeGroup.Components.Any()) response.Accordions.Add(kmDureeGroup);

        // --- 2. ACCORDÉON : OPTIONS ---
        if (rawData.Options.Any())
        {
            var optionsGroup = new DynamicAccordionGroupDto { Title = "Options du véhicule", GroupCode = "OPTIONS", Order = 2 };
            optionsGroup.Components.Add(new DynamicSelectConfigurationDto
            {
                Id = "options_vehicule",
                Name = "Options",
                Label = "Sélectionnez vos options",
                IsMultiSelect = true,
                IsDropDownDisplay = false, // Liste plate avec Checkboxes
                StaticItems = rawData.Options.Select(o => new DynamicOptionDto
                {
                    Id = o.Id.ToString(),
                    Value = $"{o.Name} (+{o.AmountToDisplay} €)",
                    IsSelected = o.IsSelected
                }).ToList()
            });
            response.Accordions.Add(optionsGroup);
        }

        // --- 3. ACCORDÉON : COULEURS ---
        if (rawData.ExternalColors.Any() || rawData.InternalColors.Any())
        {
            var colorsGroup = new DynamicAccordionGroupDto { Title = "Couleurs & Intérieur", GroupCode = "COLORS", Order = 3 };

            if (rawData.ExternalColors.Any())
            {
                colorsGroup.Components.Add(new DynamicSelectConfigurationDto
                {
                    Id = "couleur_ext",
                    Name = "CouleurExterieure",
                    Label = "Couleur Extérieure",
                    IsDropDownDisplay = true, // Liste déroulante
                    StaticItems = rawData.ExternalColors.Select(c => new DynamicOptionDto { Id = c.Id.ToString(), Value = c.JatoName }).ToList()
                });
            }

            if (rawData.InternalColors.Any())
            {
                colorsGroup.Components.Add(new DynamicSelectConfigurationDto
                {
                    Id = "couleur_int",
                    Name = "CouleurInterieure",
                    Label = "Sellerie & Intérieur",
                    IsDropDownDisplay = true,
                    StaticItems = rawData.InternalColors.Select(c => new DynamicOptionDto { Id = c.Id.ToString(), Value = c.JatoName }).ToList()
                });
            }
            response.Accordions.Add(colorsGroup);
        }

        // --- 4. ACCORDÉON : ACCESSOIRES ---
        if (rawData.Accessories.Any())
        {
            var accessoriesGroup = new DynamicAccordionGroupDto { Title = "Accessoires", GroupCode = "ACCESSORIES", Order = 4 };
            accessoriesGroup.Components.Add(new DynamicSelectConfigurationDto
            {
                Id = "accessoires",
                Name = "Accessoires",
                Label = "Accessoires additionnels",
                IsMultiSelect = true,
                IsDropDownDisplay = false,
                StaticItems = rawData.Accessories.Select(a => new DynamicOptionDto { Id = a.Id.ToString(), Value = a.Name }).ToList()
            });
            response.Accordions.Add(accessoriesGroup);
        }

        // --- 5. ACCORDÉONS : PRESTATIONS PAR FAMILLE ---
        var prestationsByFamily = allItems
            .Where(i => i.Id != "0000000560" && i.Id != "0000000561") // Exclure Duree/KM
            .GroupBy(i => i.Family)
            .OrderBy(g => g.Key);

        int orderIndex = 5;
        foreach (var familyGroup in prestationsByFamily)
        {
            var familyAccordion = new DynamicAccordionGroupDto
            {
                Title = $"Prestations : {familyGroup.Key}",
                GroupCode = $"PRESTA_{familyGroup.Key}",
                Order = orderIndex++
            };

            foreach (var item in familyGroup)
            {
                if (item.QuantityConfigurations != null && item.QuantityConfigurations.IsUpdatable)
                {
                    familyAccordion.Components.Add(new DynamicInputConfigurationDto
                    {
                        Id = item.Id,
                        Name = item.AbbreviatedName,
                        Label = item.ShortDescription,
                        ValueType = DynamicInputValueType.Integer,
                        DefaultValue = item.QuantityConfigurations.DefaultValue.ToString(),
                        Indicator = item.Tooltip,
                        Range = new DynamicRangeValueDto { MinValue = item.QuantityConfigurations.Min, MaxValue = item.QuantityConfigurations.Max }
                    });
                }
                else if (item.AS400Configurations != null && item.AS400Configurations.Any())
                {
                    familyAccordion.Components.Add(new DynamicSelectConfigurationDto
                    {
                        Id = item.Id,
                        Name = item.AbbreviatedName,
                        Label = item.ShortDescription,
                        IsDropDownDisplay = true,
                        ShouldEnableAutocomplete = true, // Très utile pour la liste des 95 départements français !
                        StaticItems = item.AS400Configurations.Select(a => new DynamicOptionDto { Id = a.DefaultIdentifier, Value = a.Name }).ToList()
                    });
                }
            }

            if (familyAccordion.Components.Any())
            {
                response.Accordions.Add(familyAccordion);
            }
        }

        return response;
    }

    private async Task<RawVehicleApiResponse> GetJsonFromApiAsync(string requestNumber)
    {
        // Chemin relatif depuis le dossier d'exécution (projet .HttpApi.Host)
        var filePath = "mock-reponse.json";

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Le fichier Mock {filePath} est introuvable. Place-le à la racine de HttpApi.Host.");
        }

        var jsonContent = await File.ReadAllTextAsync(filePath, default);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, PropertyNameCaseInsensitive = true };
        var response = JsonSerializer.Deserialize<RawVehicleApiResponse>(jsonContent, options);

        return response;
    }
}