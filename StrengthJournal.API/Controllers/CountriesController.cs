using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model.Countries;
using StrengthJournal.API.Model.Users;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<CountryResponse>> GetCountries()
        {
            using (var db = DB.SqlConnection)
            {
                var countries = await db.QueryAsync<CountryResponse>("EXEC spGetCountries");
                return countries;
            }
        }
    }
}
