using ContactListApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactListApp.Server.Data
{
    // Database context for the application, providing access to database tables
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Subcategory> Subcategories { get; set; }
    }
}
