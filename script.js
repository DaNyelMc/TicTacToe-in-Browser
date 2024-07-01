const markArray = ['<div id="mark1" class="markX"><div id="leftLeg"></div><div id="rightLeg"></div></div>', '<div id="mark2" class="markO"></div>', '<div id="mark3" class="markX"><div id="leftLeg"></div><div id="rightLeg"></div></div>', '<div id="mark4" class="markO"></div>', '<div id="mark5" class="markX"><div id="leftLeg"></div><div id="rightLeg"></div></div>', '<div id="mark6" class="markO"></div>', '<div id="mark7" class="markX"><div id="leftLeg"></div><div id="rightLeg"></div></div>', '<div id="mark8" class="markO"></div>', '<div id="mark9" class="markX"><div id="leftLeg"></div><div id="rightLeg"></div></div>'];
var i = 0, j = 0;
const buttonArray = [];
const winnerLineArray = [];
const winnerIsArray = [
    [],
    [],
    []
];
const button2dArray = [
    [],
    [],
    []
];

function button2d () {
    for (let w = 0, x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            button2dArray[x][y] = buttonArray[w];
            w++;
        }
    }
}

function buttonToArray (idButton) {
    buttonArray[j] = idButton; 

    digitArray (idButton);
    // console.log(buttonArray[j], idButton);
    
    const button = document.getElementById(idButton);
    button.setAttribute("disabled", "");
    
    j++;

    button2d ();
    winnerIs ();
}

function resetBoard () {
    for (let i = 1; i <= 9; i++)
    {
        const button = document.getElementById('b'+ i);
        button.removeAttribute("disabled");
    }
}

function iEquals0 () {
    i = 0; j = 0;
}

function returnMark (i) {
    while (i != 9)
    {
        if (i == 8) resetButtonAppear ();
        return markArray[i];
    }
    document.getElementById(buttonCon).style.display = 'none';
}

function myFunction(buttonPosition) {
    document.getElementById(buttonPosition).innerHTML = returnMark(i);
    buttonToArray(buttonPosition);
    i++;
}

function resetArray () {
    for (let y = 0; y < 3; y++)
        for (let x = 0; x < 3; x++)
            winnerIsArray[y][x] = ''; 
      
    for (y = 0; y < 9; y++)
        buttonArray[y] = ''; 
}

function resetFunction () {
    for (let y = 1; y <= 9; y++)
    {
        let idValue = 'b' + y;
        document.getElementById(idValue).innerHTML = '<div class="emptyMark"></div>';
    }
    resetBoard ();
    document.getElementById('resetButton').innerHTML = '';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('buttonCon').style.display = 'flex';
    resetArray ();

    iEquals0 ();

    y = 0;
}

function resetButtonAppear () {
    document.getElementById('resetButton').innerHTML = 'Reset';
    document.getElementById('resetButton').style.display = 'block';
}

// GAME BRAIN START

function XorO (incId, winVar) {
    if (winVar == 'X') document.getElementById(incId).innerHTML = '<div id="mark1" class="markX"><div id="leftLeg" style="background-color: #CC0909;"></div><div id="rightLeg" style="background-color: #CC0909;"></div></div>';
    else {
        const element = document.getElementById("boardContainer");

        if (element.offsetWidth == 300) document.getElementById(incId).innerHTML = '<div id="mark1" class="markO" style="border: 10.2px solid #CC0909;"></div>';
        else document.getElementById(incId).innerHTML = '<div id="mark1" class="markO" style="border: 17px solid #CC0909;"></div>';
    }
    

}

function winnerLine (incVar, winVar) {
    let incId;

    incId = 'b' + incVar;
    XorO (incId, winVar);
}

function digitArray (idButton) {
    let mK;
    
    if (i % 2 == 0) mK = 'X'; else mK = 'O';

    for (let y = 0; y < 9; y++){
        if (idButton == 'b' + (y + 1)) {
            if (y < 3) winnerIsArray[0][y] = mK;
            else if (y < 6) winnerIsArray[1][y - 3] = mK;
            else winnerIsArray[2][y - 6] = mK;
        }
    }
}

function diagonal () {
    let winVar = winnerIsArray[0][0];
    let countVar = 1;
    
    for (let y = 1; y < 3; y++){
        if ((winnerIsArray[y][y] == winVar) && (winVar == 'X' || winVar == 'O')) countVar++;
        else y = 3;
        }
        if (countVar == 3){

            // console.log(winVar, " Diagonal 1");

            winnerLine (1, winVar); 
            winnerLine (5, winVar); 
            winnerLine (9, winVar);  
            return 1;
        }
    
    winVar = winnerIsArray[0][2];
    countVar = 1;
    
    for (let y = 1, x = 1; y < 3; y++, x--){
        if ((winnerIsArray[y][x] == winVar) && (winVar == 'X' || winVar == 'O')) countVar++;
        else return 0;
        }
        if (countVar == 3){

            // console.log(winVar, " Diagonal 2");

            winnerLine (3, winVar); 
            winnerLine (5, winVar); 
            winnerLine (7, winVar);  
            return 1;
        }

    return 0;    
}

function vertical () {
    for (let y = 0; y < 3; y++){
        let winVar = winnerIsArray[0][y];
        let countVar = 1;
        
        for (let x = 1; x < 3; x++) {
            if ((winnerIsArray[x][y] == winVar) && (winVar == 'X' || winVar == 'O')) {
                countVar++;
            }
            else x = 3;
        }
        if (countVar == 3){

            // console.log(winVar, " Vertical");

            if (y == 0) {
                winnerLine (1, winVar); 
                winnerLine (4, winVar); 
                winnerLine (7, winVar); 
                return 1; 
            }
           
            if (y == 1) {
                winnerLine (2, winVar); 
                winnerLine (5, winVar); 
                winnerLine (8, winVar); 
                return 1;
            }

            winnerLine (3, winVar); 
            winnerLine (6, winVar); 
            winnerLine (9, winVar);  
            return 1;
        }
    }
    return 0;
}

function horizontal () {      
    for (let y = 0; y < 3; y++){
        let winVar = winnerIsArray[y][0];
        let countVar = 1;
        
        for (let x = 1; x < 3; x++) {
            if ((winVar == 'X' || winVar == 'O') && (winnerIsArray[y][x] == winVar)) {
                countVar++;
            }
            else x = 3;
        }
        
        if (countVar == 3){

            // console.log(winVar, " Horizontal");
            
            if (y == 0) {
                winnerLine (1, winVar); 
                winnerLine (2, winVar); 
                winnerLine (3, winVar); 
                return 1; 
            }
           
            if (y == 1) {
                winnerLine (4, winVar); 
                winnerLine (5, winVar); 
                winnerLine (6, winVar); 
                return 1;
            }

            winnerLine (7, winVar); 
            winnerLine (8, winVar); 
            winnerLine (9, winVar);  
            return 1;
        }
    }

    return 0;
}

function winnerIs () {
    if (diagonal ()) {
        resetButtonAppear (); 
        return 0;
    }
    if (vertical ()) {
        resetButtonAppear (); 
        return 0;
    }
    if (horizontal ()) {
        resetButtonAppear ();
        return 0;
    }
}


// GAME BRAIN END