using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace clicknextapi.Model
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int user_id { get; set; }
        public int balance { get; set; }
        public string name { get; set; }
    }
}
