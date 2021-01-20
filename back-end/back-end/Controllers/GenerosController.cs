using back_end.Entidades;
using back_end.Filtros;
using back_end.Repositorios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/generos")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GenerosController : ControllerBase
    {
        private readonly IRepositorio _repositorio;
        private readonly WeatherForecastController _weatherForecastController;
        private readonly ILogger _logger;

        public GenerosController(
            IRepositorio repositorio,
            WeatherForecastController weatherForecastController,
            ILogger<GenerosController> logger)
        {
            _repositorio = repositorio;
            _weatherForecastController = weatherForecastController;
            _logger = logger;
        }

        [HttpGet]
        [HttpGet("listado")]
        [HttpGet("/listadogeneros")]
        //[ResponseCache(Duration = 60)]
        [ServiceFilter(typeof(MiFiltroDeAccion))]
        public ActionResult<List<Genero>> Get()
        {
            _logger.LogInformation("Vamos a obtener todos los géneros");
            return _repositorio.ObtenerTodosLosGeneros();
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<Genero>> Get(int Id, [FromHeader] string Nombre)
        {
            _logger.LogDebug($"Obtener el género con el ID: {Id}");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genero = await _repositorio.ObtenerPorId(Id);

            if (genero == null)
            {
                throw new Exception($"No se encontro el genero con ID {Id}");
                _logger.LogWarning($"No se pudo obtener el género con ID: {Id}");
                return NotFound();
            }

            return genero;
        }

        [HttpGet("guid")]
        public ActionResult<Guid> GetGuid()
        {
            return Ok(new
            {
                guidGenerosController = _repositorio.ObtenerGuid(),
                guidWeatherForecastController = _weatherForecastController.ObtenerGuidWeatherForecastController()
            });
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genero genero)
        {
            _repositorio.CrearGenero(genero);
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Genero genero)
        {
            return NoContent();
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            return NoContent();
        }
    }
}
