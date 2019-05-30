using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppClient.Controllers
{
    public class MenuOrcamentoController : Controller
    {
        // GET: MenuOrcamento
        public ActionResult Index()
        {
            ViewBag.Theme = "theme-dark";
            ViewBag.Slides = 1;

            return View();
        }
    }
}