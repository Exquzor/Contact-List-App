using ContactListApp.Server.Data;
using ContactListApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactListApp.Server.Controllers
{
    // API controller for managing subcategories
    [ApiController]
    [Route("api/[controller]")]
    public class SubcategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubcategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieves a list of all subcategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategories()
        {
            var subcategories = await _context.Subcategories.ToListAsync();
            return Ok(subcategories);
        }

        // Retrieves a specific subcategory by its id
        [HttpGet("{id}")]
        public async Task<ActionResult<Subcategory>> GetSubcategory(int id)
        {
            var subcategory = await _context.Subcategories.FindAsync(id);

            if (subcategory == null)
            {
                return NotFound();
            }

            return Ok(subcategory);
        }

        // Retrieves all subcategories associated with a specific category
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategoriesByCategoryId(int categoryId)
        {
            var subcategories = await _context.Subcategories
                .Where(sc => sc.CategoryId == categoryId)
                .ToListAsync();

            if (subcategories == null || subcategories.Count == 0)
            {
                return NotFound();
            }

            return subcategories;
        }

        // Creates a new subcategory
        [HttpPost]
        public async Task<ActionResult<Subcategory>> PostSubcategory(Subcategory subcategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if subcategory with the same name already exists in the database
            var existingSubcategory = await _context.Subcategories
                .FirstOrDefaultAsync(s => s.Name == subcategory.Name && s.CategoryId == subcategory.CategoryId);

            if (existingSubcategory != null)
            {
                // If exists return existing one, instead of creating a new one
                return Ok(existingSubcategory);
            }

            // Add new subcategory to the database
            _context.Subcategories.Add(subcategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubcategory", new { id = subcategory.Id }, subcategory);
        }
    }
}