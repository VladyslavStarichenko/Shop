using Shop.Database;
using Shop.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.ProductsAdmin
{
    public class DeleteProducts
    {
        private ApplicationDbContext _context;

        public DeleteProducts(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Do(int id)
        {
            var Product = _context.Products.FirstOrDefault(x => x.Id == id);
            _context.Products.Remove(Product);
             await _context.SaveChangesAsync();
        }


        
    }
}
