using BookBorrowingSystem.Models;
using Microsoft.EntityFrameworkCore;


namespace BookBorrowingSystem.Data
{
    public class BookBorrowingSystem_DbContext:DbContext
    {
        public BookBorrowingSystem_DbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Book { get; set; }
    }
}
