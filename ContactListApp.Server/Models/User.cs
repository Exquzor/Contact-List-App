using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactListApp.Server.Models
{
    // User stored in the database
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key, database generated id
        [Required]
        [MaxLength(20)]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
