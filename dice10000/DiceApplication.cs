using dice10000.Interfaces;

namespace dice10000
{
    public class DiceApplication : IDiceApplication
    {
        public int CheckValuesForSingleCasesRule(string DicesThisRoundString)
        {
            int currentRound = 0;
            if (DicesThisRoundString.Length > 0)
            {
                if (DicesThisRoundString == "1,2,3,4,5,6") // straight
                    currentRound += 1000;
                else if (DicesThisRoundString == "1,1,5")
                    currentRound += 250;
                else if (DicesThisRoundString == "1,1,5,5")
                    currentRound += 300;
                else if (DicesThisRoundString == "1,5,5")
                    currentRound += 200;
                else if (DicesThisRoundString == "1,1")
                    currentRound += 200;
                else if (DicesThisRoundString == "1,5")
                    currentRound += 150;
                else if (DicesThisRoundString == "5,5")
                    currentRound += 100;
                else if (DicesThisRoundString == "5")
                    currentRound += 50;
                else if (DicesThisRoundString == "1")
                    currentRound += 100;
            }
            return currentRound;
        }
    }
}
