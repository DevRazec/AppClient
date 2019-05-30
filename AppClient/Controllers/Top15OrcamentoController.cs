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
    public class Top15OrcamentoController : Controller
    {
        public async Task<ActionResult> Index()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:44301/api/Dashboard");
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                string token = await AutenticaUsuario.getTokenAsync();
                client.DefaultRequestHeaders.Add("Authorization", "bearer " + token);

                HttpResponseMessage resposta = await client.GetAsync(client.BaseAddress.ToString());

                if (resposta.IsSuccessStatusCode)
                {
                    ViewBag.jsonData = JsonConvert.SerializeObject(resposta.Content.ReadAsStringAsync().Result);
                }
            }

            ViewBag.Theme = "theme-dark";
            ViewBag.Slides = 1;

            return View();
        }
    }
}