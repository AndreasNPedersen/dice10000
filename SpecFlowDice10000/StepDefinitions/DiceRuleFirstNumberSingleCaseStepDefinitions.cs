using dice10000;

namespace SpecFlowDice10000.StepDefinitions
{
    [Binding]
    public class DiceRuleFirstNumberSingleCaseStepDefinitions
    {
        int _eyeResult;
        DiceApplication _application;

        [Given(@"The dices gets rolled")]
        public void GivenTheDicesGetsRolled()
        {
            _application = new DiceApplication(); //When the API is called
        }

        [When(@"a single dice is (.*)")]
        public void WhenASingleDiceIs(int p0)
        {
            string convertEyeToStringAsWebSentsIt = p0.ToString();
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);

        }

        [Then(@"the current round score would be (.*)")]
        public void ThenTheCurrentRoundScoreWouldBe(int p0)
        {
            _eyeResult.Should().Be(p0);

        }

        [When(@"two dices is (.*), (.*)")]
        public void WhenTwoDicesIs(int p0, int p1)
        {
            string convertEyeToStringAsWebSentsIt = $"{p0},{p1}";
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);
        }

        [When(@"three dices is (.*), (.*), (.*)")]
        public void WhenThreeDicesIs(int p0, int p1, int p2)
        {
            string convertEyeToStringAsWebSentsIt = $"{p0},{p1},{p2}";
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);
        }

        [When(@"four dices is (.*), (.*), (.*), (.*)")]
        public void WhenFourDicesIs(int p0, int p1, int p2, int p3)
        {
            string convertEyeToStringAsWebSentsIt = $"{p0},{p1},{p2},{p3}";
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);
        }

        [When(@"all dices is (.*), (.*), (.*), (.*), (.*), (.*)")]
        public void WhenAllDicesIs(int p0, int p1, int p2, int p3, int p4, int p5)
        {
            string convertEyeToStringAsWebSentsIt = $"{p0},{p1},{p2},{p3},{p4},{p5}";
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);
        }

        [Given(@"The wrong input")]
        public void GivenTheWrongInput()
        {
            _application = new DiceApplication();
        }

        [When(@"it receives a dice with (.*) eyes")]
        public void WhenItReceivesADiceWithEyes(int p0)
        {
            string convertEyeToStringAsWebSentsIt = $"{p0}";
            _eyeResult = _application.CheckValuesForSingleCasesRule(convertEyeToStringAsWebSentsIt);
        }


    }
}
