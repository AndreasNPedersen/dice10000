function GetAllDicesWithPoints() {
    // console.log("AI" + DiceOnHold)
    var NoPoints = true;
    var DicesToHold = [];
   
    for (var i = 1; i <= 6; i++) //diceValues Checking for 3 or more.
    {
        if (CheckFor3orMore(i)) {
            DicesToHold.push(i);
            //   console.log(DicesToHold);
        }

    }
    // console.log("DicesToHold " +DicesToHold);
    for (var i = 1; i <= 6; i++) //dices position set on hold
    {
        Dice = document.getElementById("dice" + i);
        if (DiceOnHold.indexOf(Dice.id) < 0) {
            //if the dice gives points choose it
            var diceValue = Number(Dice.className.slice(4, 5));
            //console.log("diceValue = " +diceValue)
            if (diceValue == 1 || diceValue == 5 || DicesToHold.indexOf(diceValue) >= 0) {
                SetDiceONOFFHold(Dice,true);
                NoPoints = false;
            }
        }
    }
    //console.log("roundScorer = "+Number(document.getElementById("currentRound").value) + " DiceOnHold.length " +(DiceOnHold.length+DiceOnHoldThisRound.length))

    var AIRoundValue = checkForPointsForOneRound(true);
    // console.log("AIRoundValue =" + AIRoundValue)
    // console.log("currentRound = " + Number(document.getElementById("currentRound").value))
    var totalForRound = AIRoundValue + Number(document.getElementById("currentRound").value);
    // console.log("totalForRound= " + totalForRound)

   
    if ((DiceOnHold.length + DiceOnHoldThisRound.length) >= 6) {
        AnimateClick(document.getElementById("btn_Role"));
        roleTheDice();
        return;
    } else if (totalForRound >= 1000 || NoPoints) {

        if (!NoPoints)
            console.log("endTurn because need > 1000 ")
        else
            console.log("endTurn *** NoPoints ***" + NoPoints)

        AnimateClick(document.getElementById("btn_endTurn"));
        endTurn();
        return;
    } else if (totalForRound >= 300 &&
        Number(document.getElementById("in_total" + currentPlayer).value) > 0 
        ) {
       
        if (totalForRound >= 500)
        { 
            AnimateClick(document.getElementById("btn_endTurn"));
            endTurn();
            console.log("endTurn because of 500+ ")
            return;        }
           var otherPlayer = 1;
            if(currentPlayer == 1)
                otherPlayer = 2;
            if(Number(document.getElementById("in_total" + currentPlayer).value)-
            Number(document.getElementById("in_total" + otherPlayer).value) <= -1000) 
            {
                AnimateClick(document.getElementById("btn_Role"));
                roleTheDice();
                console.log("roll dice because of more than 1000 behind")
                return;
            }
            else
            {
                AnimateClick(document.getElementById("btn_endTurn"));
                endTurn();
                console.log("end turn because of less than 1000 behind")
                return;
            }
        
    } else {
        AnimateClick(document.getElementById("btn_Role"));
        roleTheDice();
        return;
    }


}

function CheckFor3orMore(DiceValue) {
    var AI_DiceValuesThisRound = [];
    for (var i = 1; i <= 6; i++) { //running through the dices
        var dice = document.getElementById("dice" + i);
        if (DiceOnHold.indexOf("dice" + i) < 0) { //if dice is not on hold it will role
            var currentDiceValue = dice.className.slice(4, 5);
            AI_DiceValuesThisRound.push(currentDiceValue);
        }
    }
    AI_DiceValuesThisRound.sort();
    var DicesThisRoundString = AI_DiceValuesThisRound.toString();
    //console.log("DicesThisRoundString " +DicesThisRoundString);
    if (DicesThisRoundString.indexOf(DiceValue + "," + DiceValue + "," + DiceValue) >= 0 || DicesThisRoundString=="1,2,3,4,5,6" ) {
        return true;
    }
    return false;
}

function AnimateClick(obj) {
    // console.log(obj)
    var originalColor = obj.style.backgroundColor;
    setTimeout("document.getElementById('" + obj.id + "').style.backgroundColor = 'blue';", 100);
    setTimeout("document.getElementById('" + obj.id + "').style.backgroundColor = '" + originalColor + "';", 400);
    setTimeout("document.getElementById('" + obj.id + "').style.backgroundColor = 'blue';", 600);
    setTimeout("document.getElementById('" + obj.id + "').style.backgroundColor = '" + originalColor + "';", 1000);
}