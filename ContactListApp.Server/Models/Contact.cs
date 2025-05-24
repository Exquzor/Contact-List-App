using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactListApp.Server.Models
{
    // Contact stored in the database

    [Index(nameof(Email),IsUnique =true)] // Index attribute to enforce uniqueness on Email column
    public class Contact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key, database generated id
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; } // Email address of the contact, validated as email format
        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; } // Foreign key linking contact to a category
        [ForeignKey("Subcategory")]
        public int? SubcategoryId { get; set; } // Foreign key linking contact to a subcategory
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } // Phone number of the contact validated as a well-formed phone number
        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

    }
}
