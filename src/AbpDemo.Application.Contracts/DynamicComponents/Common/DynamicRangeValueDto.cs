using System;
using System.Collections.Generic;
using System.Text;

namespace AbpDemo.DynamicComponents.Common
{
    /// <summary>
    /// Represents a value range for a dynamic component.
    /// </summary>
    public class DynamicRangeValueDto
    {
        /// <summary>
        /// Minimum value of the range.
        /// </summary>
        public decimal MinValue { get; set; } = decimal.MinValue;

        /// <summary>
        /// Maximum value of the range.
        /// </summary>
        public decimal MaxValue { get; set; } = decimal.MaxValue;
    }
}
