using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents.Common;

/// <summary>
/// Describes the API source used to retrieve dynamic data.
/// </summary>
public class ApiDataSourceDto
{
    /// <summary>
    /// Name of the application service to invoke.
    /// </summary>
    public string ServiceName { get; set; }

    /// <summary>
    /// Name of the method to call on the service.
    /// </summary>
    public string MethodName { get; set; }
}
