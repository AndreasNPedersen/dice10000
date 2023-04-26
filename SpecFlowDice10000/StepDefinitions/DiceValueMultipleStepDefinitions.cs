using dice10000;
using dice10000.Models;
using System;
using System.Text;
using TechTalk.SpecFlow;

namespace SpecFlowDice10000.StepDefinitions
{
    [Binding]
    public class DiceValueMultipleStepDefinitions
    {
        DiceApplication _application;
        int _resultPoints;
        [Given(@"(.*) dices has rolled")]
        public void GivenDicesHasRolled(int p0)
        {
            _application = new DiceApplication();
        }

        [When(@"out the dices, (.*) of them are (.*) eyes")]
        public void WhenOutTheDicesOfThemAreEyes(int p0, int p1)
        {
            _resultPoints = _application.GetDiceValue(p1, StringArrayConverter.MakeStingArrayToString(p1, p0));
        }

        [Then(@"it counts to (.*) points")]
        public void ThenItCountsToPoints(int p0)
        {
            _resultPoints.Should().Be(p0);
        }

       
    }
}
