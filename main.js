import { Game } from "./game.js";
import { Texts } from "./texts.js";
import * as Constructs from "./constructures.js";


let Displays = {};
let Buttons = {};

$(document).ready(function() {
    console.log("Debug message");
    init();
    setInterval(tick, 10);
    
    //setInterval(tick,50);
});

function init() {

    window.game = new Game();
    window.texts = new Texts();

    //Displays
    Displays.Body = $("#body");

        //Scores
            Displays.DisplayScorePoint = $("#pointScore");
            Displays.DisplayScoreLimit = $("#limitScore");


        //Progress Bars
            Displays.BarLimit  = $("#barLimit");
            Displays.BarExtend = $("#barExtend");

            Displays.BarLimitProgress  = $("#barLimitProgress");
            Displays.BarExtendProgress = $("#barExtendProgress");


        //Structures
        Displays.StructureContainer = $("#structures");

            Displays.StructureCosts = 
            [$("#genL1cost"), $("#genL2cost"), $("#genL3cost"),
             $("#genL4cost"), $("#genL5cost")];

            Displays.StructureGeneration = 
            [$("#genL1gen"), $("#genL2gen"), $("#genL3gen"),
             $("#genL4gen"), $("#genL5gen")];

            Displays.StructureOwn = 
            [$("#genL1own"), $("#genL2own"), $("#genL3own"),
             $("#genL4own"), $("#genL5own")];

        //Upgrades
        Displays.LimitUpgradesContainer = $("#upgradesL");
        Displays.LimitUpgradesDescription = $("#upgradeDescriptionBox");




    //Buttons

        //Gains
            Buttons.GainLimit = $("#btnLimitGain");
    


        //Structures
            Buttons.Structures = 
            [$("#genL1"), $("#genL2"), $("#genL3"), $("#genL4"), $("#genL5")]
    
        //Upgrades
            Buttons.Upgrades =
            [$("#upgL11")];




        //Saving
            Buttons.Save = $("#btnSave");
            Buttons.Load = $("#btnLoad");
            Buttons.Export = $("#btnExport");
            Buttons.Import = $("#btnImport");    

        //Options
            Buttons.Monospace = $("#monospace");


    //Tabs
        Displays.TabLimit   = $("#tabLimit");
        Displays.TabExtend  = $("#tabExtend");

        Displays.TabOptions = $("#tabOptions");
        Displays.TabVersion = $("#tabVersion");


        Buttons.Limit   = $("#btnLimitTab");
        Buttons.Extend  = $("#btnExtendTab");

        Buttons.Options = $("#btnOptionsTab");
        Buttons.Version = $("#btnVersion");
    

//Click Functions go here. :D

    Buttons.GainLimit.click(function(){
        if (game.pointScore >= game.limits.Score){
            game.limits.Score += game.limits.Gain;
            game.limitScoreTotal += game.limits.Gain;
            game.pointScore = 0;
        }
    });







//Structure Buttons
Buttons.Structures[0].click(function(){
    let cost = Constructs.structuresCost(0)
    if (game.limits.Score >= cost){
        game.limits.Score -= cost;
        game.structures[0] += 1;
    }
})

Buttons.Structures[1].click(function(){
    let cost = Constructs.structuresCost(1)
    if (game.limits.Score >= cost){
        game.limits.Score -= cost;
        game.structures[1] += 1;
    }
})

Buttons.Structures[2].click(function(){
    let cost = Constructs.structuresCost(2)
    if (game.limits.Score >= cost){
        game.limits.Score -= cost;
        game.structures[2] += 1;
    }

})

Buttons.Structures[3].click(function(){
    let cost = Constructs.structuresCost(3)
    if (game.limits.Score >= cost){
        game.limits.Score -= cost;
        game.structures[3] += 1;
    }

})

Buttons.Structures[4].click(function(){
    let cost = Constructs.structuresCost(4)
    if (game.limits.Score >= cost){
        game.limits.Score -= cost;
        game.structures[4] += 1;
    }

})








//Upgrades :O

Buttons.Upgrades[0].hover(function(){
    Displays.LimitUpgradesDescription.text("Test Text");
})









//Tab Buttons
    Buttons.Limit.click(function(){
        game.options.tabIndex = 0;

    });
    Buttons.Extend.click(function(){
        game.options.tabIndex = 1;

    });

    Buttons.Options.click(function(){
        game.options.tabIndex = 8;

    })
    Buttons.Version.click(function(){
        game.options.tabIndex = 9;

    })



//Options Buttons
    Buttons.Monospace.click(function(){
        game.options.monospace = !game.options.monospace;
        // if (game.options.monospace == true){
        //     game.options.monospace = false;
        // }
        // else{
        //     game.options.monospace = true;
        // }
        })

//Saving
        Buttons.Save.click(function() {
            game.saveGame();
        });
    
        Buttons.Load.click(function() {
            game.loadGame();
        });
    
        Buttons.Export.click(function() {
            game.exportGame();
        });
    
        Buttons.Import.click(function() {
            game.importGame();
        });
    
    




//end init
    game.loadGame();
    texts.versionGame(Displays.TabVersion);
    game.frameSaveCount = 0;

}









function updateGeneration(game){
    let generation = (1 + Constructs.structuresGen(game.structures))/100;
    game.pointScore = game.pointScore + generation;
    //game.scoreTotal = game.scoreTotal + generation;







    if (game.pointScore > game.limits.Score){
        game.pointScore = game.limits.Score;
    }

    updateConditions(game);
}





function updateConditions(game){
    let points = game.pointScore;
    let limits = game.limitScoreTotal;

    condenseConditions(false, true, Buttons.Extend);
    condenseConditions(false, true, Displays.BarExtend);

    condenseConditions(limits,   4, Displays.StructureContainer);
    condenseConditions(limits,  24, Buttons.Structures[1]);
    condenseConditions(limits,  84, Buttons.Structures[2]);
    condenseConditions(limits, 224, Buttons.Structures[3]);
    condenseConditions(limits, 794, Buttons.Structures[4]);

    condenseConditions(false, 9, Displays.LimitUpgradesContainer);


    function condenseConditions(score, minScore, button){//button can be display
        if(score > minScore){
            button.show();
        }
        else { button.hide(); }
    }

    function condenseBought(button, bought){
        if(bought == true) { button.addClass("bought"); }
        else { button.removeClass("bought"); }
    }




//Tab Stuff
    switch(game.options.tabIndex){
        case 0: //limit
            Displays.TabLimit.show();
            Buttons.Limit.addClass("inTab");
            Displays.TabExtend.hide();
            Buttons.Extend.removeClass("inTab");
            Displays.TabOptions.hide();
            Buttons.Options.removeClass("inTab");
            Displays.TabVersion.hide();
            break;

        case 1: //extend
            Displays.TabLimit.hide();
            Buttons.Limit.removeClass("inTab");
            Displays.TabExtend.show();
            Buttons.Extend.addClass("inTab");
            Displays.TabOptions.hide();
            Buttons.Options.removeClass("inTab");
            Displays.TabVersion.hide();
            break;

        case 8: //options
            Displays.TabLimit.hide();
            Buttons.Limit.removeClass("inTab");
            Displays.TabExtend.hide();
            Buttons.Extend.removeClass("inTab");
            Displays.TabOptions.show();
            Buttons.Options.addClass("inTab");
            Displays.TabVersion.hide();
            break;

        case 9: //version
            Displays.TabLimit.hide();
            Buttons.Limit.removeClass("inTab");
            Displays.TabExtend.hide();
            Buttons.Extend.removeClass("inTab");
            Displays.TabOptions.hide();
            Buttons.Options.removeClass("inTab");
            Displays.TabVersion.show();
            break;

        default:
            Displays.TabLimit.show();
            Buttons.Limit.addClass("inTab");
            Displays.TabExtend.hide();
            Buttons.Extend.removeClass("inTab");
            Displays.TabOptions.hide();
            Buttons.Options.removeClass("inTab");
            Displays.TabVersion.hide();
            break;

    }

}


function updateData(Displays, game){ //(Displays, game)
    updateGeneration(game);

    condenseDisplayFormat(Displays.DisplayScorePoint, game.pointScore, 5);
    condenseDisplayFormat(Displays.DisplayScoreLimit, game.limits.Score, 5);

    condenseArrayDisplayFormat(Displays.StructureCosts, 
        Constructs.structuresDisplay(game.structures, "cost"), 5);

    condenseArrayDisplayFormat(Displays.StructureGeneration,
        Constructs.structuresDisplay(game.structures, "gen"), 5);

    condenseArrayDisplayFormat(Displays.StructureOwn,
        Constructs.structuresDisplay(game.structures, "own"),10);





    condenseProgressBar("barLimitProgress", game.pointScore, game.limits.Score);
    Buttons.Save.text("Save  ( " + game.frameSaveCount + " / 1000 )")

    function condenseDisplayFormat(display, score, precision){
        if(score >= 1e10){
            display.text(Math.floor(score.toExponential(precision)).toLocaleString("en-US"));
        }
        else{
            display.text(score.toLocaleString("en-US"));
        }
    }

    function condenseProgressBar(display, score1, score2){
        let width = ((score1 / score2) * 100);
                if (score2 == 0) { width = 100; }

        document.getElementById(display).innerText = Math.floor(width*100)/100 + "%";
        document.getElementById(display).style.width = width*0.96 + "%";
    }

    function condenseArrayDisplayFormat(display, score, precision){
        for(let i=0; i<display.length; i++){
            condenseDisplayFormat(display[i], score[i], precision);
        }
    }



    if (game.options.monospace == true){
            Displays.Body.addClass("monospace");
    }else { Displays.Body.removeClass("monospace"); }
}



function tick() {
    game.frameCount++;
    game.frameSaveCount++;

    updateData(Displays, game);

    if(game.frameSaveCount >= 1000){
        game.saveGame();
        //notification("Auto Saved.")

        game.frameSaveCount = 0;
    }
}