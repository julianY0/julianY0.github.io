
console.log("Hello");

document.addEventListener("DOMContentLoaded", function() {
    var slider = document.getElementById("Input_EnemyLVL");
    var output = document.getElementById("EnemyLVLDisplay");
    output.innerText = slider.value; // Set the initial value

    slider.oninput = function() {
    output.innerText = this.value; // Update the value when the slider changes
    console.log("SliderUpdated!" + this.value)
    }
});

function calcEHP(){
    var HP = parseFloat(document.getElementById("inputHP").value);
    var DEF = parseFloat(document.getElementById("inputDEF").value);
    var DMGReduction = parseFloat(document.getElementById("inputDMGReduction").value);
    var DMGRES = parseFloat(document.getElementById("inputDMGRES").value);
    var EnemyLVL = parseInt(document.getElementById("Input_EnemyLVL").value);

    var DEFReductionPerc = parseFloat(document.getElementById("inputDEFReductionPerc").value);
    var DEFReductionFlat = parseFloat(document.getElementById("inputDEFReductionFlat").value);
    var DEFBonusPerc = parseFloat(document.getElementById("inputDEFBonusPerc").value);
    var DEFBonusFlat = parseFloat(document.getElementById("inputDEFBonusFlat").value);

    var output = document.getElementById("output");

    var values = [HP, DEF, DMGReduction, DMGRES, EnemyLVL, DEFReductionPerc, DEFReductionFlat, DEFBonusPerc, DEFBonusFlat];
    var allZero = values.some(isNaN);
    if (!allZero) {
        var DEF_modified = (DEF * ((1-DEFReductionPerc+DEFBonusPerc) + DEFBonusFlat - DEFReductionFlat));
        var EDR_DEF = (DEF_modified/(DEF_modified+200+(10*EnemyLVL)));
        var EHP = HP / (1-EDR_DEF) / (1-DMGReduction) / (1-DMGRES);

        console.log(EHP);
        output.innerText = EHP;
    } else {
        alert("Please ensure all fields have valid numbers!")
    }
}