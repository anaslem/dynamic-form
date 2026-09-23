using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AbpDemo.DynamicComponents;

public interface IDynamicComponentPreviewAppService : IApplicationService
{
    public Task<DynamicSelectConfigurationDto> GetSelectConfigAsync();
}