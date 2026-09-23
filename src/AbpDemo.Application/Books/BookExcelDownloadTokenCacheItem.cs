using System;

namespace AbpDemo.Books;

[Serializable]
public class BookExcelDownloadTokenCacheItem
{
    public string Token { get; set; } = string.Empty;
}
