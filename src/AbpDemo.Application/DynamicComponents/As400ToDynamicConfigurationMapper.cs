using AbpDemo.As400Integration;
using AbpDemo.DynamicComponents.Common;
using AbpDemo.Enums;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp.DependencyInjection;

namespace AbpDemo.DynamicComponents;

public class As400ToDynamicConfigurationMapper : IAs400ToDynamicConfigurationMapper, ITransientDependency
{
    public IReadOnlyList<ADynamicConfigurationDto> MapToDynamicComponents(As400RootResponseDto rootResponse)
    {
        var components = new List<ADynamicConfigurationDto>();
        var elements = rootResponse?.Result?.Elements;
        if (elements == null) return components;

        int orderCounter = 10;

        // 1. Options (Select Multiple)
        if (elements.ListeOptions?.Any() == true)
        {
            var optionsList = elements.ListeOptions.Select(o => new DynamicOptionDto
            {
                Id = o.NumeroOption.ToString(),
                Value = o.LibelleOption,
                IsSelected = o.Selectionne == "1",
                Disabled = o.Obligatoire == "1",
                PriceInfo = o.MontantAAfficher > 0 ? new DynamicPriceDto { FormattedDisplay = $"+ {o.MontantAAfficher:F2} €" } : null
            }).ToList();

            components.Add(CreateMultiSelect("Les options", optionsList, ref orderCounter));
        }

        // 2. Prestations Complexes (Moteur Maître / Esclave)
        if (elements.ListePrestations != null)
        {
            foreach (var category in elements.ListePrestations)
            {
                var groupName = string.IsNullOrWhiteSpace(category.CategoryPrestation) ? "Services" : category.CategoryPrestation;

                foreach (var prestation in category.Prestations ?? Enumerable.Empty<As400PrestationDto>())
                {
                    string componentId = $"prest_{prestation.NumeroPrestation}";
                    bool isToggle = prestation.Selectionnable == "1" || prestation.DataSaisissable;

                    // MAÎTRE : Création du Toggle
                    if (isToggle)
                    {
                        components.Add(new DynamicToggleConfigurationDto
                        {
                            Id = componentId,
                            Name = prestation.LibelleAbrege,
                            Label = prestation.LibelleLong ?? prestation.LibelleCourt,
                            GroupName = groupName,
                            Order = orderCounter++,
                            IsDisplayed = true,
                            Value = prestation.Selectionne == 1,
                            InfoBulle = prestation.InfoBulle,
                            Required = prestation.Obligatoire == "1"
                        });
                    }

                    // ESCLAVES : Les Inputs générés selon les règles AS400
                    if (prestation.DataSaisissable && prestation.ListNameDataSaisissable != null)
                    {
                        var displayRule = new DynamicFilterRuleDto
                        {
                            TargetFilterId = componentId,
                            PropertyName = "Value",
                            OperatorType = DynamicFilterRuleOperatorType.Equals,
                            TargetValue = true, // Déclenché si Toggle est TRUE
                            ActionType = DynamicFilterRuleActionType.Show
                        };

                        foreach (var dataType in prestation.ListNameDataSaisissable)
                        {
                            switch (dataType)
                            {
                                case "MontantSaisisable":
                                    components.Add(BuildNumericInput(prestation.LibelleCourt, $"{componentId}_mnt", groupName, prestation.MontantMin, prestation.MontantMax, prestation.MontantDefaut, "€ TTC", displayRule, ref orderCounter));
                                    break;
                                case "TauxSaisisable":
                                    components.Add(BuildNumericInput(prestation.LibelleCourt, $"{componentId}_tx", groupName, prestation.TauxMinPrcent, prestation.TauxMaxPrcent, prestation.TauxDefautPrcent, "%", displayRule, ref orderCounter));
                                    break;
                                case "QuantiteSaisisable":
                                    components.Add(BuildNumericInput(prestation.LibelleCourt, $"{componentId}_qte", groupName, prestation.QuantiteMin, prestation.QuantiteMax, prestation.QuantiteDefaut, "", displayRule, ref orderCounter));
                                    break;
                                case "IdentifiantSaisisable":
                                    if (prestation.ListWq != null && prestation.ListWq.Any())
                                    {
                                        components.Add(BuildSelectInput("Select identifier", $"{componentId}_id", groupName, prestation.ListWq, displayRule, ref orderCounter));
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        }

        return components;
    }

    private DynamicSelectConfigurationDto CreateMultiSelect(string name, List<DynamicOptionDto> items, ref int orderCounter)
    {
        var comp = new DynamicSelectConfigurationDto
        {
            Id = $"select_{name.Replace(" ", "_").ToLower()}",
            Name = name,

            // CORRECTION ICI : On ne met plus de groupe pour ces composants racines
            GroupName = null,

            Label = name,
            Order = orderCounter,
            IsMultiSelect = true,
            DataSourceType = DataSourceType.Static,
            StaticItems = items
        };
        orderCounter += 10;
        return comp;
    }

    private DynamicInputConfigurationDto BuildNumericInput(string label, string id, string groupName, decimal min, decimal max, decimal defaultValue, string suffix, DynamicFilterRuleDto displayRule, ref int orderCounter)
    {
        return new DynamicInputConfigurationDto
        {
            Id = id,
            Name = id,
            Label = label,
            GroupName = groupName,
            Order = orderCounter++,
            IsDisplayed = false, // Masqué par défaut
            FilterRules = new List<DynamicFilterRuleDto> { displayRule },
            ValueType = DynamicInputValueType.Decimal,
            DefaultValue = defaultValue.ToString("0.##"),
            Suffix = suffix,
            Range = new DynamicRangeValueDto { MinValue = min, MaxValue = max }
        };
    }

    private DynamicSelectConfigurationDto BuildSelectInput(string label, string id, string groupName, List<As400WqItemDto> listWq, DynamicFilterRuleDto displayRule, ref int orderCounter)
    {
        var options = listWq.Select(wq => new DynamicOptionDto
        {
            Id = wq.IdentifiantDefault,
            Value = wq.Label
        }).ToList();

        return new DynamicSelectConfigurationDto
        {
            Id = id,
            Name = id,
            Label = label,
            GroupName = groupName,
            Order = orderCounter++,
            IsDisplayed = false, // Masqué par défaut
            FilterRules = new List<DynamicFilterRuleDto> { displayRule },
            IsMultiSelect = false,
            IsDropDownDisplay = true,
            StaticItems = options
        };
    }
}