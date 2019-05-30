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
    public class MenuHomeController : Controller
    {       
        public async Task<ActionResult> Index()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:44301/api/Usuario/");
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                string token = await AutenticaUsuario.getTokenAsync();
                client.DefaultRequestHeaders.Add("Authorization", "bearer " + token);

                HttpResponseMessage resposta = await client.GetAsync(client.BaseAddress.ToString());

                if (resposta.IsSuccessStatusCode)
                {
                    ViewBag.jsonData = JsonConvert.SerializeObject(resposta.Content.ReadAsStringAsync().Result);
                    ViewBag.Token = token;
                }
            }

            ViewBag.Theme = "theme-dark";
            ViewBag.Slides = 2;

            return View();
        }
    }
}