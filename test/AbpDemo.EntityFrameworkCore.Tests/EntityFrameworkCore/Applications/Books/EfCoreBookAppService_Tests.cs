using AbpDemo.Books;
using Xunit;

namespace AbpDemo.EntityFrameworkCore.Applications.Books;

[Collection(AbpDemoTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<AbpDemoEntityFrameworkCoreTestModule>
{

}