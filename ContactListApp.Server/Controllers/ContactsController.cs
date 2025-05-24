using ContactListApp.Server.Data;
using ContactListApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactListApp.Server.Controllers
{
    // API controller for managing contacts
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieves a list of all contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // Retrieves a specific contact by its id
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email is unique
            var existingContact = await _context.Contacts.FirstOrDefaultAsync(c => c.Email == contact.Email);
            if (existingContact != null)
            {
                ModelState.AddModelError("Email", "The Email must be unique.");
                return BadRequest(ModelState);
            }

            // Check if the category exists
            var category = await _context.Categories.FindAsync(contact.CategoryId);
            if (category == null)
            {
                ModelState.AddModelError("CategoryId", "Invalid CategoryId.");
                return BadRequest(ModelState);
            }

            // If "Business" category is selected, a subcategory must be selected
            if (category.Name == "Business")
            {
                if (contact.SubcategoryId == null)
                {
                    ModelState.AddModelError("SubcategoryId", "Subcategory is required for Business category.");
                    return BadRequest(ModelState);
                }

                var subcategory = await _context.Subcategories.FindAsync(contact.SubcategoryId);
                if (subcategory == null)
                {
                    ModelState.AddModelError("SubcategoryId", "Invalid SubcategoryId.");
                    return BadRequest(ModelState);
                }
            }
            else if (category.Name == "Other")
            {
                // For "Other" category, subcategory is entered manually
                if (contact.SubcategoryId != null)
                {
                    var subcategory = await _context.Subcategories.FindAsync(contact.SubcategoryId);
                    if (subcategory == null)
                    {
                        ModelState.AddModelError("SubcategoryId", "Invalid SubcategoryId.");
                        return BadRequest(ModelState);
                    }
                }
            }
            else
            {
                // For "Private" category, set subcategory id to null
                contact.SubcategoryId = null;
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // Updates an existing contact
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            var existingContact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            if (existingContact == null)
            {
                return NotFound();
            }

            // Check if email is unique (if changed)
            if (existingContact.Email != contact.Email)
            {
                var otherContactWithSameEmail = await _context.Contacts.FirstOrDefaultAsync(c => c.Email == contact.Email);
                if (otherContactWithSameEmail != null && otherContactWithSameEmail.Id != id)
                {
                    ModelState.AddModelError("Email", "The Email must be unique.");
                    return BadRequest(ModelState);
                }
            }

            // Check if the category exists
            var category = await _context.Categories.FindAsync(contact.CategoryId);
            if (category == null)
            {
                ModelState.AddModelError("CategoryId", "Invalid CategoryId.");
                return BadRequest(ModelState);
            }

            // If "Business" category is selected, a subcategory must be selected
            if (category.Name == "Business")
            {
                if (contact.SubcategoryId == null)
                {
                    ModelState.AddModelError("SubcategoryId", "Subcategory is required for Business category.");
                    return BadRequest(ModelState);
                }

                var subcategory = await _context.Subcategories.FindAsync(contact.SubcategoryId);
                if (subcategory == null)
                {
                    ModelState.AddModelError("SubcategoryId", "Invalid SubcategoryId.");
                    return BadRequest(ModelState);
                }
            }
            else if (category.Name == "Other")
            {
                // For "Other" category, subcategory is entered manually
                if (contact.SubcategoryId != null)
                {
                    var subcategory = await _context.Subcategories.FindAsync(contact.SubcategoryId);
                    if (subcategory == null)
                    {
                        ModelState.AddModelError("SubcategoryId", "Invalid SubcategoryId.");
                        return BadRequest(ModelState);
                    }
                }
            }
            else
            {
                // For "Private" category, set subcategory id to null
                contact.SubcategoryId = null;
            }

            // Update the existing contact with the new data
            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.CategoryId = contact.CategoryId;
            existingContact.SubcategoryId = contact.SubcategoryId;
            existingContact.PhoneNumber = contact.PhoneNumber;
            existingContact.BirthDate = contact.BirthDate;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Deletes a contact by its id
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
