using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookBorrowingSystem.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int UserId { get; set; }

        public string UserEmail { get; set; }
        [StringLength(70)]
        public string Username { get; set; }
        [StringLength(50)]
        public string Password { get; set; }

        public int lib_token { get; set; }

        [NotMapped]
        public Book[] Books_boorow { get; set; }
        [NotMapped]
        public Book[] Books_lent { get; set; }


        [NotMapped]
        public string? Token { get; set; }
    }
}
