using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using clicknextapi.Data;
using clicknextapi.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace clicknextapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly clicknextdb _context;

        public LoginsController(clicknextdb context)
        {
            _context = context;
        }

        // GET: api/Logins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin()
        {
            return await _context.Login.ToListAsync();
        }

        // GET: api/Logins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
            var login = await _context.Login.FindAsync(id);

            if (login == null)
            {
                return NotFound();
            }

            return login;
        }

        // PUT: api/Logins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogin(int id, Login login)
        {
            if (id != login.id)
            {
                return BadRequest();
            }

            _context.Entry(login).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
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

        [HttpPost("request")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid request");
            }

            var user = _context.Login.FirstOrDefault(u => u.username == request.username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Use a secure method to compare hashed passwords
            if (!VerifyPassword(request.password, user.password))
            {
                return Unauthorized("Invalid credentials");
            }

            // Authentication successful
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return enteredPassword == storedPassword;
        }

        private string GenerateJwtToken(Login user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = GenerateRandomKey(32); 

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.user_id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(1), 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private byte[] GenerateRandomKey(int length)
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] key = new byte[length];
                rng.GetBytes(key);
                return key;
            }
        }


        [HttpPost]
        public async Task<ActionResult<Login>> PostLogin(Login login)
        {
            _context.Login.Add(login);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LoginExists(login.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLogin", new { id = login.id }, login);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogin(int id)
        {
            var login = await _context.Login.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }

            _context.Login.Remove(login);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(int id)
        {
            return _context.Login.Any(e => e.id == id);
        }
    }

    // LoginRequest class

    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}