using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookBorrowingSystem.Models
{
    public class Book
    {
      
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int BookId { get; set; }
        [StringLength(50)] 
        public string Name { get; set; }
        [StringLength(50)]
        public string Author { get; set; }
        
        public int rating{ get; set; }
        [StringLength(50)]
        public string Genre { get; set; }
        public bool is_available { get; set; }
        [StringLength(1000)]
        public string Discription { get; set; }
        public int Lent_by_user_id { get; set; }
        public int Borrower_user_id { get; set; }








    }
}
