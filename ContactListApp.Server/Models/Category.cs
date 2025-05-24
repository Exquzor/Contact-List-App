using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactListApp.Server.Models
{
    // Category stored in the database
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key, database generated id
        [Required]
        public string Name { get; set; }
        public ICollection<Subcategory> Subcategories { get; set; } // Collection navigation property for related subcategories
    }
}
