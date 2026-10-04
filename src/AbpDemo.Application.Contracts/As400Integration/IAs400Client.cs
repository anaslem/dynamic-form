using AbpDemo.As400Integration;
using System.Threading;
using System.Threading.Tasks;

namespace AbpDemo.As400Integration;

public interface IAs400Client
{
    Task<As400RootResponseDto> GetVehicleConfigurationAsync(long vehicleId, CancellationToken cancellationToken = default);
}