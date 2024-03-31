using clicknextapi.Model;
using Microsoft.EntityFrameworkCore;

namespace clicknextapi.Data
{
    public class clicknextdb : DbContext
    {
        public clicknextdb(
            DbContextOptions<clicknextdb> options) : base(options) { }
        public clicknextdb() { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<Transfer> Transfer { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("users");
            modelBuilder.Entity<Login>().ToTable("login");
            modelBuilder.Entity<Transaction>().ToTable("transaction");
            modelBuilder.Entity<Transfer>().ToTable("transfer");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string server = "localhost";
            string database = "clicknextdb";
            string uid = "root";
            string password = "12345678";
            string connectionString = "SERVER=" + server + ";" + "DATABASE=" +
            database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";PORT=3306;SslMode=Required;";
            optionsBuilder.UseMySQL(connectionString);
        }

    }
}
