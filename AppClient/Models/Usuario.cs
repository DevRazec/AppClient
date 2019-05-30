using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AppClient.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "Campo obrigatório!", AllowEmptyStrings = false)]
        [StringLength(10, ErrorMessage = "Campo inválido!", MinimumLength = 2)]
        [Display(Name = "Login")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Campo obrigatório!", AllowEmptyStrings = false)]
        [StringLength(10, ErrorMessage = "Campo inválido!", MinimumLength = 2)]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Senha { get; set; }

        public string NomeUsuario { get; set; }
        public string Email { get; set; }
    }
}