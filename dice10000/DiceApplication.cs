using dice10000.Interfaces;
using dice10000.Models;

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

        public int GetDiceValue(int diceValue, string dicesThisRound)
        {
            int roundValue = 0;
            if (dicesThisRound.IndexOf(diceValue + "," + diceValue + "," + diceValue) >= 0)
            {
                // 3 dices with same numbers
                roundValue = diceValue * 100;
                                               
                if (diceValue == 1)
                    roundValue = 1000;

                // 4 dices with same value
                if (dicesThisRound.IndexOf(diceValue + "," + diceValue + "," + diceValue + "," + diceValue) >= 0)
                {
                    roundValue = diceValue * 100 * 2;
                    if (diceValue == 1)
                        roundValue = 2000;
                }

                // 5 dices with same value
                if (dicesThisRound.IndexOf(diceValue + "," + diceValue + "," + diceValue + "," + diceValue + "," + diceValue) >= 0)
                {
                    roundValue = diceValue * 100 * 4;
                    if (diceValue == 1)
                        roundValue = 4000;
                }
                // 6 dices with same value
                if (dicesThisRound.IndexOf(diceValue + "," + diceValue + "," + diceValue + "," + diceValue + "," + diceValue + "," + diceValue) >= 0)
                {
                    roundValue = diceValue * 100 * 8;
                    if (diceValue == 1)
                        roundValue = 10000;
                }
            }
            return roundValue;
        }
    }
}
