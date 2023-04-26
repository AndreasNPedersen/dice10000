using System.Text;

namespace dice10000.Models
{
    /// <summary>
    /// Not In Use, testing purpose
    /// </summary>
    public static class StringArrayConverter
    {
        
        public static string MakeStingArrayToString(int diceValue, int lengthOfString)
        {
            StringBuilder moqString = new StringBuilder();
            for (int i = 0; i < lengthOfString; i++)
            {
                moqString.Append(diceValue + ",");
            }
            moqString.Remove(moqString.Length - 1, 1); //removes the last ","
            return moqString.ToString();
        }
    }
}
