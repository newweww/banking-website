using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace clicknextapi.Model
{
    public class Login
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int user_id { get; set; }
    }
}
