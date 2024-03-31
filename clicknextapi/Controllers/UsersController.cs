using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using clicknextapi.Data;
using clicknextapi.Model;
using MySql.Data.MySqlClient;
using MySql.Data.MySqlClient;


namespace clicknextapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly clicknextdb _context;

        public UsersController(clicknextdb context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UsersExists(users.user_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsers", new { id = users.user_id }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.user_id == id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBalance(int id, int balance)
        {
            try
            {
                if (id <= 0 || balance < 0)
                {
                    return BadRequest("Invalid id or balance value.");
                }

                // Execute parameterized SQL query to update user balance
                var affectedRows = _context.Database.ExecuteSqlRaw("UPDATE `users` SET `balance` = @balance WHERE `user_id` = @id",
                    new MySqlParameter("@balance", balance),
                    new MySqlParameter("@id", id));

                if (affectedRows > 0)
                {
                    return Ok("Updated successfully.");
                }
                else
                {
                    return NotFound("User not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPut]
        [Route("updatebalance/{id}")]
        public async Task<IActionResult> UpdateBalance(int id, Users balance)
        {
            try
            {
                _context.Entry(balance).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(balance);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("byname/{name}")]
        public async Task<ActionResult<Users>> GetUsers(string name)
        {
            var users = await _context.Users.FirstOrDefaultAsync(u => u.name == name);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        [HttpPatch("UpdateBalance/{id}")]
        public IActionResult PatchUpdateBalance(int id, [FromBody] int newBalance)
        {
            try
            {
                var existingUser = _context.Users.Find(id);

                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }

                existingUser.balance = newBalance;

                _context.Entry(existingUser).State = EntityState.Modified;
                _context.SaveChanges();

                return Ok("Balance updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
    