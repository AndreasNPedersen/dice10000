function SaveGameLocaly() {
    window.localStorage.setItem("player1", document.getElementById("in_total1").value);
    window.localStorage.setItem("player2", document.getElementById("in_total2").value);
    alert("The Game is saved");
}

function LoadGameFromLocalStorage() {
    document.getElementById("in_total1").value = window.localStorage.getItem("player1");
    document.getElementById("in_total2").value = window.localStorage.getItem("player2");
    alert("The Game is ready");
}

function getLocalStats() {
    document.getElementById("P1wonNumber").innerHTML = window.localStorage.getItem("P1wonNumber");
    document.getElementById("AIwonNumber").innerHTML = window.localStorage.getItem("AIwonNumber");
}

function setLocalStats(thePlayerWon) {
    if(thePlayerWon){
        document.getElementById("P1wonNumber").innerHTML = Number(document.getElementById("P1wonNumber").innerHTML)+1;
        window.localStorage.setItem("P1wonNumber",document.getElementById("P1wonNumber").innerHTML);
    }
    else {
        document.getElementById("AIwonNumber").innerHTML = Number(document.getElementById("AIwonNumber").innerHTML)+1 ;
        window.localStorage.setItem("AIwonNumber",document.getElementById("AIwonNumber").innerHTML);
    }
    
}