using AbpDemo.As400Integration;
using AbpDemo.DynamicComponents.Common;
using System.Collections.Generic;

namespace AbpDemo.DynamicComponents;

public interface IAs400ToDynamicConfigurationMapper
{
    IReadOnlyList<ADynamicConfigurationDto> MapToDynamicComponents(As400RootResponseDto rootResponse);
}