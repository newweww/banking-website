using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace clicknextapi.Model
{
    public class Transfer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int transfer_id { get; set; }
        public DateTime date_time { get; set; }
        public string user { get; set; }
        public int remain { get; set; }
        public string actions { get; set; }
        public string from_user { get; set; }
        public int amount { get; set; }
     
    }
}
