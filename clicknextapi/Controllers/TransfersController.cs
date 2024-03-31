using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using clicknextapi.Data;
using clicknextapi.Model;

namespace clicknextapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfersController : ControllerBase
    {
        private readonly clicknextdb _context;

        public TransfersController(clicknextdb context)
        {
            _context = context;
        }

        // GET: api/Transfers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transfer>>> GetTransfer()
        {
            return await _context.Transfer.ToListAsync();
        }

        // GET: api/Transfers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetTransfer(int id)
        {
            var transfer = await _context.Transfer.FindAsync(id);

            if (transfer == null)
            {
                return NotFound();
            }

            return transfer;
        }

        // GET: api/Transfers/5
        [HttpGet("user/{user}/{actions}")]
        public async Task<ActionResult<IEnumerable<Transfer>>> GetTransfersByUser(string user, string actions)
        {
            var transfers = await _context.Transfer
                .Where(t => t.user == user && t.actions == actions)
                .ToListAsync();

            if (transfers == null || transfers.Count == 0)
            {
                return NotFound();
            }

            return transfers;
        }

        // GET: api/Transfers/5




        // PUT: api/Transfers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransfer(int id, Transfer transfer)
        {
            if (id != transfer.transfer_id)
            {
                return BadRequest();
            }

            _context.Entry(transfer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransferExists(id))
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

        // POST: api/Transfers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transfer>> PostTransfer(Transfer transfer)
        {
            _context.Transfer.Add(transfer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TransferExists(transfer.transfer_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTransfer", new { id = transfer.transfer_id }, transfer);
        }

        // DELETE: api/Transfers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer(int id)
        {
            var transfer = await _context.Transfer.FindAsync(id);
            if (transfer == null)
            {
                return NotFound();
            }

            _context.Transfer.Remove(transfer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransferExists(int id)
        {
            return _context.Transfer.Any(e => e.transfer_id == id);
        }
    }
}
