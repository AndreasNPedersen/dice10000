var DiceOnHold = []; // Dices that is on Hold and can't be re-activated
var DiceOnHoldThisRound = []; // Dices that is on Hold but can be re-activated. Clicked on in current round
var DicesThisRound = []; // array with dices in current round set on hold
var currentRound = 0; //value of dices in current round not used.
var total = 0; //total value (might be local var)
var currentPlayer = 1; //Identify what player is playing.
var winner = null;
var DiceOnHoldThisRoundBeforeRemove;
var currentRoundValue = 0;
var AI = true;
var TheRemovedDiceValues = [];
var waitAfterClick = false;


function roleTheDice(Init) {

    ShowselectedDicesForTheRound(true);
    DiceOnHoldThisRoundBeforeRemove = DiceOnHoldThisRound;
    checkForPointsForOneRound(); //checking for points from dice values

    if (Init)
        getLocalStats();

    if (currentRound > 0 || Init) { //cheking if you get points. You need points to role again
        for (var i = 0; i < DiceOnHoldThisRoundBeforeRemove.length; i++) //Update the dices from last role
        {
            if (DiceOnHold.indexOf(DiceOnHoldThisRoundBeforeRemove[i]) < 0)
                DiceOnHold.push(DiceOnHoldThisRoundBeforeRemove[i]);
        }
        if (DiceOnHold.length == 6) //all dices gives points and therefor you can role all dices again
            InitNewRole();


        //  console.log("#"+DiceOnHold.toString()+"#");
        //adding current role value and adding it to the previous roles
        document.getElementById("currentRound").value = Number(document.getElementById("currentRound").value) + Number(currentRound);
        for (var i = 1; i <= 6; i++) { //running through the dices
            if (DiceOnHold.indexOf("dice" + i) < 0) { //if dice is not on hold it will role
                //var rndNumber = Math.floor((Math.random() * 6) + 1); // getting the random number 1-6
                var Dice = document.getElementById("dice" + i);
                MakeAnimation(Dice);
            }
        }

        DicesThisRound = []; //initialyze the array

        for (var i = 0; i < DiceOnHoldThisRound.length; i++) {
            if (DiceOnHold.indexOf(DiceOnHoldThisRound[i]) < 0) //something fishy here!!!
                DiceOnHold.push(DiceOnHoldThisRound[i]); //adding dices on hold from the round to the array where it can't be chaged
        }
        DiceOnHoldThisRound = []; //init round on hold
        currentRound = 0; //init round value
        currentRoundValue = 0;

    } else
        alert("Du skal have point pÃ¥ alle valgt terninger");
    if (AI && currentPlayer == 2)
        setTimeout("GetAllDicesWithPoints()", 3000);
}


async function ShowselectedDicesForTheRound(init) {
    var element = document.getElementById("d_currentRoundValue");
    if (init)
        element.innerHTML = "";
    else {

        var currentDiceValue = await checkForPointsForOneRound(true); //don't end turn
        element.innerHTML = currentDiceValue.toString();
    }
    console.log("end")
}

function RemoveDicesFromThisRound(DiceValue, DicesThisRoundArray) //removing dices from current round after the multiple dice values is counted
{
    // console.log("DicesThisRound" + DicesThisRound + " DiceValue " +DiceValue +"DicesThisRound.length-1 ="+(DicesThisRound.length-1) )//log

    for (var i = (DicesThisRoundArray.length - 1); i >= 0; i--) {
        // console.log("i="+ i + "DicesThisRound[i]" + DicesThisRound[i] + " DiceValue " +DiceValue )
        if (DicesThisRoundArray[i] == DiceValue) {
            DicesThisRoundArray.splice(i, 1);

        }
    }
    return DicesThisRoundArray;
}

function GetDiceValue(DiceValue, fromAI, DicesThisRoundArray) // get the value from dice values with 3 or more of the same > 1
{

    var DicesThisRoundString = DicesThisRoundArray.toString();

    if (DicesThisRoundString.indexOf(DiceValue + "," + DiceValue + "," + DiceValue) >= 0) {
        console.log("DicesThisRoundString=" + DicesThisRoundString);
        var RoundValue = DiceValue * 100; // 3 dices with same numbers
        //   console.log("DiceValue * 100 = " + DiceValue * 100);
        if (DiceValue == 1)
            RoundValue = 1000

        // 4 dices with same value
        if (DicesThisRoundString.indexOf(DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue) >= 0) {
            RoundValue = DiceValue * 100 * 2
            if (DiceValue == 1)
                RoundValue = 2000
        }

        // 5 dices with same value
        if (DicesThisRoundString.indexOf(DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue) >= 0) {
            RoundValue = DiceValue * 100 * 4
            if (DiceValue == 1)
                RoundValue = 4000
        }
        // 6 dices with same value
        if (DicesThisRoundString.indexOf(DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue + "," + DiceValue) >= 0) {
            RoundValue = DiceValue * 100 * 8
            if (DiceValue == 1)
                RoundValue = 10000
        }

        currentRoundValue += Number(RoundValue);
        // if (!fromAI) {
        return RemoveDicesFromThisRound(DiceValue, DicesThisRoundArray);
        //}
    }
    return DicesThisRoundArray;
}

function GetDiceValue2(fromAI) {
    var diceValues = [];
    DicesThisRound.forEach(element => {
        diceValues.push(element);
    });
    diceValues.sort();
    for (var i = 1; i <= 6; i++) // dices with same value check for each value 2-6, both included
    {
        diceValues = GetDiceValue(i, fromAI, diceValues);
    }
    return diceValues;
}

async function checkValueForSingleCases(DicesValuesThisRoundArray) {
    console.log("start")
    var DicesThisRoundString = DicesValuesThisRoundArray.toString();
    if (DicesThisRoundString.length > 0) {
        const responseRule = await fetch('http://localhost:5091/api/dice/singleCase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DicesThisRoundString)
        }).then(response => response.json())


        console.log("middel",responseRule)
        currentRound =+ responseRule


    }
}

async function checkForPointsForOneRound(fromAI) //check for points with dice value 1 and 5 and straight
{

    // check if dices of same value gives points 

    //checkValueForSingleCases(GetDiceValue2(0, fromAI));
    if (!fromAI)
        currentRound += currentRoundValue;
    else {
        var returnvalue = currentRoundValue;
        currentRoundValue = 0;
        DicesThisRound = [];
        for (var i = 0; i < DiceOnHoldThisRound.length; i++) {

            DicesThisRound.push(GetDiceValueFromDiceId(DiceOnHoldThisRound[i]));
        }
        currentRound = currentRoundValue;
        await checkValueForSingleCases(GetDiceValue2(0, fromAI));
        // console.log("logsingle=" + single.length);

        // console.log("logcurrentRoundValue=" + currentRoundValue);
        // console.log("logcurrentRoundBefore=" + currentRound);
        //  checkValueForSingleCases(DicesThisRound);
        //console.log("logcurrentRoundAfter=" + currentRound);
        // console.log("logreturnvalue=" + returnvalue);
        returnvalue = Number(currentRound) + Number(currentRoundValue);


        return returnvalue;
    }

}

function GetDiceValueFromDiceId(diceId) {
    var element = document.getElementById(diceId);
    var diceValue = element.className.slice(4, 5);
    return diceValue;

}

async function SetDiceONOFFHold(dice, fromAI) {
    if (waitAfterClick && !fromAI) {
        return;
    }
    waitAfterClick = true;
    setTimeout("waitAfterClick=false", 300)
    if (dice.style.opacity != '' && dice.style.opacity < '1') {
        if (DiceOnHoldThisRound.indexOf(dice.id) < 0) //dices from previous round can't be ativated
            alert("Not able to activate this dice. only dices in the same round can be activated");
        else // dice re-activate (white)
        {
            dice.style.opacity = 1;
            DiceOnHoldThisRound.splice(DiceOnHoldThisRound.indexOf(dice.id), 1)
            DicesThisRound = [];
            for (var i = 0; i < DiceOnHoldThisRound.length; i++) {
                DicesThisRound.push(GetDiceValueFromDiceId(DiceOnHoldThisRound[i]));
            }
            //DicesThisRound.splice(DicesThisRound.indexOf(dice.className.slice(4,5)), 1);
        }
    } else // dice set on hold
    {
        dice.style.opacity = '0.3';
        DiceOnHoldThisRound.push(dice.id);
        DicesThisRound.push(dice.className.slice(4, 5));

    }
    // console.log(DiceOnHoldThisRound);
    // console.log(DicesThisRound);
    await ShowselectedDicesForTheRound();


}

function endTurn() // ending turn and cleaning up
{
    // calculating the total
    DiceOnHoldThisRoundBeforeRemove = DiceOnHoldThisRound;
    checkForPointsForOneRound();

    document.getElementById("currentRound").value = Number(document.getElementById("currentRound").value) + Number(currentRound);
    if (currentRound <= 0) {
        total = Number(document.getElementById("in_total" + currentPlayer).value)
    } else
        total = Number(document.getElementById("currentRound").value) + Number(document.getElementById("in_total" + currentPlayer).value);
    var otherPlayer = document.getElementById("in_total1");
    //checking for winner
    if (currentPlayer == 1)
        otherPlayer = document.getElementById("in_total2");
    if (total >= 10000 || Number(otherPlayer.value) >= 10000) {
        if (winner == null) {
            winner = currentPlayer;
            if (Number(winner) == 1)
                setLocalStats(true);
            else
                setLocalStats(false);
        }
        else {
            if (total > Number(otherPlayer.value)) {
                winner = currentPlayer;
                if (Number(winner) == 1)
                    setLocalStats(true);
                else
                    setLocalStats(false);
            }

            alert("Player " + winner + " har vundet")
            InitNewGame();
        }
        // console.log("winner "+winner);   
    }
    //  console.log("total"+total)
    var element = document.getElementById("in_total" + currentPlayer)
    if (!DiceOnHoldThisRoundBeforeRemove.length > 0) {
        total = Number(document.getElementById("in_total" + currentPlayer).value)
    }
    if (total >= 1000) //first point entry must be 1000+
        element.value = total; //setting the total in field
    else {
        element.value = " > 1000 ";
        element.className = "inputAlert";
        setTimeout(function () {
            element.value = 0;
            element.className = ""
        }, 1500);
    }
    // cleanup and get ready for next turn
    currentRound = 0;
    currentRoundValue = 0;
    InitNewRole();
    document.getElementById("currentRound").value = 0; //init the current round value
    ChangePlayer(); // change player
    roleTheDice(true); // role the dices to start for the new player.
    //document.getElementById("btn_endTurn").style.
}

function InitNewRole() {
    DiceOnHold = [];
    DicesThisRound = [];
    DiceOnHoldThisRound = [];
    for (var i = 1; i <= 6; i++) //resetting the dices to active
    {
        var dice = document.getElementById("dice" + i);
        dice.style.opacity = 1;
    }
    ShowselectedDicesForTheRound(true);
}

function InitNewGame() {
    currentPlayer = 1;
    total = 0;
    document.getElementById("spn_player" + currentPlayer).className = "isActive";
    document.getElementById("currentRound").value = 0;
    document.getElementById("in_total1").value = 0;
    document.getElementById("in_total2").value = 0;
}

function ChangePlayer() {
    document.getElementById("spn_player" + currentPlayer).className = "isInactive";
    if (currentPlayer == 1)
        currentPlayer = 2;
    else
        currentPlayer = 1;
    document.getElementById("spn_player" + currentPlayer).className = "isActive";
}

function MakeAnimation(Dice) //Dice is the object I want to animate
{
    var id = setInterval(frame, 150); //interval is the time between each frame is showed
    var frames = 0 // initializing the frames/images to 0
    function frame() {
        if (frames > 8) //continue until you reach 24 frames/images
        {
            clearInterval(id); //this will stop the animation
            Dice.className = "dice" + rndNumber; //setting the class name/image to correct dice value
        }
        var rndNumber = Math.floor((Math.random() * 6) + 1); //setting the random number for the dice
        Dice.className = "dice" + Number(rndNumber); // changing image on dice to make animation

        frames++; //Adding to frames so it will stop when it reaches limit set above.
    };
}