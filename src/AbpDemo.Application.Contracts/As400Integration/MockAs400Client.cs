using AbpDemo.As400Integration;
using Newtonsoft.Json;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace AbpDemo.As400Integration;

public class MockAs400Client : IAs400Client, ITransientDependency
{
    public async Task<As400RootResponseDto> GetVehicleConfigurationAsync(long vehicleId, CancellationToken cancellationToken = default)
    {
        // Chemin relatif depuis le dossier d'exécution (projet .HttpApi.Host)
        var filePath = "mock-as400.json";

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Le fichier Mock {filePath} est introuvable. Place-le à la racine de HttpApi.Host.");
        }

        var jsonContent = await File.ReadAllTextAsync(filePath, cancellationToken);

        // Désérialisation avec Newtonsoft.Json
        var response = JsonConvert.DeserializeObject<As400RootResponseDto>(jsonContent);

        return response;
    }
}