using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppClient.Controllers
{
    public class MenuDashboardController : Controller
    {
        // GET: MenuDashboard
        public ActionResult Index()
        {
            ViewBag.Theme = "theme-dark";
            ViewBag.Slides = 1;

            return View();
        }
    }
}