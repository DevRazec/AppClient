using AppClient.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace AppClient.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Theme = "";
            ViewBag.Slides = 1;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginUsuario loginusuario)        
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Theme = "";
                ViewBag.Slides = 1;
                return View(loginusuario);
            }
            else
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("http://localhost:44301/api/UsuarioNeo2/");
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    string token = await AutenticaUsuario.getTokenAsync();
                    client.DefaultRequestHeaders.Add("Authorization", "bearer " + token);

                    HttpResponseMessage resposta = await client.GetAsync(client.BaseAddress.ToString());

                    if (resposta.IsSuccessStatusCode)
                    {
                        ViewBag.jsonData = JsonConvert.SerializeObject(resposta.Content.ReadAsStringAsync().Result);
                       
                        //Session["IdUsuario"] = obj.UserId.ToString();
                        //Session["NomeUsuario"] = obj.UserName.ToString();
                        Session["Token"] = token;
                        return RedirectToAction("Index", "MenuHome");
                    }
                    else
                    {
                        ViewBag.Theme = "";
                        ViewBag.Slides = 1;
                        ViewBag.MessageHome = "Login ou senha inválida";
                        return View(loginusuario);
                    }
                }                             
            }
        }
    }
}