using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace AppClient.Models
{
    public static class AutenticaUsuario
    {
        public static string username = "cezar";
        public static string password = "te1260";
        public static string token = "";

        public static async System.Threading.Tasks.Task<string> getTokenAsync()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:44301/token");
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var request = new HttpRequestMessage(HttpMethod.Post, client.BaseAddress.ToString());

                request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    { "username",username},
                    { "password",password},
                    { "grant_type","password"}

                });

                var response = await client.SendAsync(request);

                var payLoad = JObject.Parse(await response.Content.ReadAsStringAsync());

                var token = payLoad.Value<string>("access_token");

                return token;
            }
        }
    }
}