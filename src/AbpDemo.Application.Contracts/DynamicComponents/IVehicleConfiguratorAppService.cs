using AbpDemo.DynamicComponents.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AbpDemo.DynamicComponents;

public interface IVehicleConfiguratorAppService : IApplicationService
{
    Task<IReadOnlyList<ADynamicConfigurationDto>> GetConfigurationFormAsync(long vehicleId);
}