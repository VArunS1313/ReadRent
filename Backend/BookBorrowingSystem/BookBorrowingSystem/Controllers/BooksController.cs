using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookBorrowingSystem.Data;
using BookBorrowingSystem.Models;

namespace BookBorrowingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookBorrowingSystem_DbContext _context;

        public BooksController(BookBorrowingSystem_DbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
          if (_context.Book == null)
          {
              return NotFound();
          }
            return await _context.Book.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
          if (_context.Book == null)
          {
              return NotFound();
          }
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
          if (_context.Book == null)
          {
              return Problem("Entity set 'BookBorrowingSystem_DbContext.Book'  is null.");
          }
          book.is_available = true;
            book.Borrower_user_id = 0;
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("borrow/{bookId}/{userId}")]
        public async Task<IActionResult> BorrowBook(int bookId, int userId)
        {
            // Check if the book exists
            var book = await _context.Book.FindAsync(bookId);

            if (book == null)
            {
                return NotFound(); 
            }

            
            if (!book.is_available)
            {
                return BadRequest("Book is not available for borrowing.");
            }
            var user = await _context.Users.FindAsync(userId);
            int lentuserid = book.Lent_by_user_id;
            var user_lent = await _context.Users.FindAsync(lentuserid);

            if (user == null||user_lent==null)
            {
                return NotFound("User not found.");
            }

            
            if (user.lib_token <= 0)
            {
                return BadRequest("User does not have enough tokens to borrow the book.");
            }
            user.lib_token--;
            user_lent.lib_token++;



            book.is_available = false;
            //book.Lent_by_user_id = userId;
            book.Borrower_user_id = userId;

         
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500); 
            }

            return Ok("Book borrowed successfully.");
        }
        [HttpPost("return/{bookId}")]
        public async Task<IActionResult> ReturnBook(int bookId)
        {
            // Check if the book exists
            var book = await _context.Book.FindAsync(bookId);

            if (book == null)
            {
                return NotFound();
            }


           


            book.is_available = true;
            //book.Lent_by_user_id = userId;
            book.Borrower_user_id = 0;


           
                await _context.SaveChangesAsync();
           
           
           //     return StatusCode(500);
            

            return Ok("Book Return successfully.");
        }
        [HttpGet("available-books")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAvailableBooks()
        {
            var availableBooks = await _context.Book
                .Where(book => book.is_available)
                .ToListAsync();

            if (availableBooks == null || availableBooks.Count == 0)
            {
                return NotFound("No available books found.");
            }

            return Ok(availableBooks);
        }
        [HttpGet("lent-books/{userId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetLentBooks(int userId)
        {
            var lentBooks = await _context.Book
                .Where(book => book.Lent_by_user_id == userId)
                .ToListAsync();

            if (lentBooks == null || lentBooks.Count == 0)
            {
                return NotFound($"No books lent by user with ID {userId} found.");
            }

            return Ok(lentBooks);
        }
        [HttpGet("Borrow-books/{userId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBorrowBooks(int userId)
        {
            var lentBooks = await _context.Book
                .Where(book => book.Borrower_user_id == userId)
                .ToListAsync();

            if (lentBooks == null || lentBooks.Count == 0)
            {
                return NotFound($"No books lent by user with ID {userId} found.");
            }

            return Ok(lentBooks);
        }

        private bool BookExists(int id)
        {
            return (_context.Book?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
    }
}
