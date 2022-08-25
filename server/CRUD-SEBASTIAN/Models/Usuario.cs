using System;
using System.Collections.Generic;

namespace CRUD_SEBASTIAN.Models
{
    public partial class Usuario
    {
        public int UserId { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Email { get; set; }
    }
}
