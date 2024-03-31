using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace clicknextapi.Model
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int transaction_id { get; set; }
        public DateTime date_time { get; set; }
        public string action { get; set; }
        public int remain { get; set; }
        public int amount { get; set; }
        public int user_id { get; set; }
    }
}
