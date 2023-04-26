namespace dice10000.Interfaces
{
    public interface IDiceApplication
    {
        public int CheckValuesForSingleCasesRule(string DicesThisRoundString);
        public int GetDiceValue(int diceValue, string dicesThisRound);
    }
}
