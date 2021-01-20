using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Filtros
{
    public class MiFiltroDeAccion : IActionFilter
    {
        private readonly ILogger _logger;

        public MiFiltroDeAccion(ILogger<MiFiltroDeAccion> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation("Antes de ejecutar la acción");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation("Después de ejecutar la acción");
        }
    }
}
