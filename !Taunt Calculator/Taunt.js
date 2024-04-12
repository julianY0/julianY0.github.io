console.log("JS File Loaded!");

const tauntValues = [
                        ["NONE", 0], 
                        ["The Hunt", 75], 
                        ["The Erudition", 75], 
                        ["The Harmony", 100], 
                        ["The Nihility", 100], 
                        ["The Abundance", 100], 
                        ["The Destruction", 125], 
                        ["The Preservation", 150] 
                    ];

const invalidNumbersMessage = "Values input must be decimals! Ex. input 5 instead of 500%, input 0.03 instead of 3%"

function calcTaunt(){
    var TeammatePath = [];
    TeammatePath[0] = document.getElementById("teammate1").value;
    TeammatePath[1] = document.getElementById("teammate2").value;
    TeammatePath[2] = document.getElementById("teammate3").value;
    TeammatePath[3] = document.getElementById("teammate4").value;

    var TeammateBaseAggro = [];
    TeammateBaseAggro[0] = parseInt(document.getElementById("teammate1BaseAggro").value);
    TeammateBaseAggro[1] = parseInt(document.getElementById("teammate2BaseAggro").value);
    TeammateBaseAggro[2] = parseInt(document.getElementById("teammate3BaseAggro").value);
    TeammateBaseAggro[3] = parseInt(document.getElementById("teammate4BaseAggro").value);

    var TeammateNormalAggro = [];
    TeammateNormalAggro[0] = parseInt(document.getElementById("teammate1NormalAggro").value);
    TeammateNormalAggro[1] = parseInt(document.getElementById("teammate2NormalAggro").value);
    TeammateNormalAggro[2] = parseInt(document.getElementById("teammate3NormalAggro").value);
    TeammateNormalAggro[3] = parseInt(document.getElementById("teammate4NormalAggro").value);

    if (TeammateBaseAggro.some(isNaN)){
        warning(invalidNumbersMessage);
        return;
    };
    if (TeammateNormalAggro.some(isNaN)){
        warning(invalidNumbersMessage);
        return;
    };

    // get taunt value of paths
    for (let pathIteration = 0; pathIteration < TeammatePath.length; pathIteration++) {
        for (let iteration = 0; iteration < tauntValues.length; iteration++) {
            if (TeammatePath[pathIteration] === tauntValues[iteration][0]){
                TeammatePath[pathIteration] = tauntValues[iteration][1];
                console.log("FOUND: Path = " + tauntValues[iteration][0])
                console.log("Ending Check for Teammate " + pathIteration + " PATH = " + TeammatePath[pathIteration]);
                break;
            }
            console.log("PathCheck Teammate: "+ TeammatePath[pathIteration] + " Patchchecking if is " + tauntValues[iteration] + " Comparing: " + TeammatePath[pathIteration] + " " + tauntValues[iteration][0])
            if (iteration == (tauntValues.length - 1)){
                console.log("Ending Check for Teammate " + pathIteration);
            }
        };
    };

    console.log(TeammatePath)

    // actual taunt calcs
    var baseAggro = [];
    var realAggro = [];
    var finalOdds = [];
    for (let tauntIteration = 0; tauntIteration < TeammatePath.length; tauntIteration++) {
        baseAggro[tauntIteration] = (TeammatePath[tauntIteration] * (1 + parseInt(TeammateBaseAggro[tauntIteration])));
        realAggro[tauntIteration] = (baseAggro[tauntIteration] * (1 + parseInt(TeammateNormalAggro[tauntIteration])));

        console.log(baseAggro[tauntIteration] + " " + realAggro[tauntIteration]);
        console.log("C: " + TeammatePath[tauntIteration] + " * " + (1 + TeammateBaseAggro[tauntIteration]));
    };

    for (let x = 0; x < TeammatePath.length; x++) {
        finalOdds[x] = realAggro[x] / realAggro.reduce((a, b) => a + b, 0)
    };
    console.log(finalOdds)

    outputValues(finalOdds[0], finalOdds[1], finalOdds[2], finalOdds[3])
}

function outputValues(out1, out2, out3, out4){
    document.getElementById("output1").innerText = percentageFormatter(out1 * 100);
    document.getElementById("output2").innerText = percentageFormatter(out2 * 100);
    document.getElementById("output3").innerText = percentageFormatter(out3 * 100);
    document.getElementById("output4").innerText = percentageFormatter(out4 * 100);
}

function warning(message){
    alert(message);
}

function percentageFormatter(num) {
    return `${parseFloat(num).toFixed(2)}%`;
  }