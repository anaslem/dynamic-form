using AbpDemo.As400Integration;
using AbpDemo.DynamicComponents.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AbpDemo.DynamicComponents;

public class VehicleConfiguratorAppService : AbpDemoAppService, IVehicleConfiguratorAppService
{
    private readonly IAs400Client _as400Client;
    private readonly IAs400ToDynamicConfigurationMapper _mapper;

    public VehicleConfiguratorAppService(
        IAs400Client as400Client,
        IAs400ToDynamicConfigurationMapper mapper)
    {
        _as400Client = as400Client;
        _mapper = mapper;
    }
    // test value 438656
    public async Task<IReadOnlyList<ADynamicConfigurationDto>> GetConfigurationFormAsync(long vehicleId)
    {
        var as400Data = await _as400Client.GetVehicleConfigurationAsync(vehicleId);
        return _mapper.MapToDynamicComponents(as400Data);
    }
}