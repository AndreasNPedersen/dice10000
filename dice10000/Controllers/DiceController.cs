using dice10000.Interfaces;
using dice10000.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dice10000.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiceController : ControllerBase
    {
        private IDiceApplication _diceApplication;

        public DiceController(IDiceApplication application)
        {
            _diceApplication = application;
        }

        // POST api/dice
        [HttpPost("singleCase")]
        public int PostSingle([FromBody] string value)
        {
            return _diceApplication.CheckValuesForSingleCasesRule(value);
        }

        // POST api/multipleCases
        [HttpPost("multipleCases")]
        public int PostMultiple([FromBody] DiceMultiple dices)
        {
            return _diceApplication.GetDiceValue(dices.DiceValue, dices.DicesThisRoundArray);
        }
    }
}
