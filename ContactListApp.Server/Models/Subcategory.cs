using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactListApp.Server.Models
{
    // Subcategory stored in the database
    public class Subcategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key, database generated id
        [Required]
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; } // Foreign key to the associated category
    }
}
