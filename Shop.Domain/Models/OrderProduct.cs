﻿
using System;
using System.Collections.Generic;
using System.Text;

namespace Shop.Domain.Models
{
    public class OrderProduct
    {
        public int Product_id { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}