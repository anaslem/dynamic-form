using AbpDemo.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Base class for dynamic component configurations.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "componentType")]
[JsonDerivedType(typeof(DynamicInputConfigurationDto), typeDiscriminator: "input")]
[JsonDerivedType(typeof(DynamicSelectConfigurationDto), typeDiscriminator: "select")]
[JsonDerivedType(typeof(DynamicSliderConfigurationDto), typeDiscriminator: "slider")]
public abstract class ADynamicConfigurationDto
{
    /// <summary>
    /// Concrete type of the dynamic component.
    /// </summary>
    public abstract DynamicComponentType DynamicComponentType { get; }

    /// <summary>
    /// Unique identifier of the configuration.
    /// </summary>
    public string Id { get; set; } = Guid.NewGuid().ToString();

    /// <summary>
    /// Technical name of the component.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Indicates whether the component should be displayed.
    /// </summary>
    public bool IsDisplayed { get; set; } = true;

    /// <summary>
    /// Indicates whether the component is disabled.
    /// </summary>
    public bool Disabled { get; set; } = false;

    /// <summary>
    /// Indicates whether input is required for the component.
    /// </summary>
    public bool Required { get; set; } = false;

    /// <summary>
    /// Display order of the component.
    /// </summary>
    public int Order { get; set; } = default;

    /// <summary>
    /// Indicates whether the component should trigger change detection.
    /// </summary>
    public bool ShouldDetectChanges { get; set; } = false;

    /// <summary>
    /// Filter and behavior rules associated with the component.
    /// </summary>
    public IList<DynamicFilterRuleDto> FilterRules { get; set; }

    /// <summary>
    /// Label displayed for the field.
    /// </summary>
    public string Label { get; set; } = "::GenericComponent:Input:DefaultLabel";
}
