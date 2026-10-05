using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AbpDemo.VehicleConfigurator;

public interface IVehicleConfiguratorFormAppService : IApplicationService
{
    Task<VehicleConfiguratorFormDto> GetConfigurationAsync(string requestNumber);
}