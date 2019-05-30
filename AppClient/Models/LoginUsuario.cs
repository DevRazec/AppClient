using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.ModelBinding;

namespace AppClient.Models
{
    public class LoginUsuario
    {
        [Required(ErrorMessage = "Login obrigatório!", AllowEmptyStrings = false)]
        [StringLength(10, ErrorMessage = "Login inválido!", MinimumLength = 2)]
        [Display(Name = "Login")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Senha obrigatória!", AllowEmptyStrings = false)]     
        [StringLength(10, ErrorMessage = "Senha inválida!", MinimumLength = 2)]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Senha { get; set; }       
    }
}