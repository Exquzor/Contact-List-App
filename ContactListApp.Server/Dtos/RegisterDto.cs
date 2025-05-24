using System.ComponentModel.DataAnnotations;

namespace ContactListApp.Server.Dtos
{
    // Data Transfer Object for user register information
    public class RegisterDto
    {
        [MaxLength(32)]
        public string Username { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
        ErrorMessage = "Password must contain uppercase, lowercase, number, and special character.")]
        public string Password { get; set; }
    }
}
