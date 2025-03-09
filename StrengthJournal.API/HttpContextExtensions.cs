using System.Security.Authentication;

namespace StrengthJournal.API
{
    public static class HttpContextExtensions
    {
        public static Guid GetUserId(this HttpContext httpContext)
        {
            var item = httpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("system_user_id"));
            if (item == null)
            {
                throw new AuthenticationException("No UserID was found in the HTTP context items");
            }
            return Guid.Parse(item.Value.ToString());
        }
    }
}
