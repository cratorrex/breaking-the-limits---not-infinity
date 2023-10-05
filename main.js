import { Game } from "./game.js";
import { Texts } from "./texts.js";
import { Constructures as Constructs } from "./constructures.js";


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


        //Costs




        //Effects





    //Buttons

        //Gains
            Buttons.GainLimit = $("#btnLimitGain");
    


        //Structures
    
    
        //Upgrades





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
        if (game.options.monospace == true){
            game.options.monospace = false;
        }
        else{
            game.options.monospace = true;
        }
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
    let generation = (1)/100;
    game.pointScore = game.pointScore + generation;
    //game.scoreTotal = game.scoreTotal + generation;







    if (game.pointScore > game.limits.Score){
        game.pointScore = game.limits.Score;
    }

    updateConditions(game);
}





function updateConditions(game){
    let points = game.pointScore;
    let limits = game.limitScore;

    condenseConditions(limits, true, Buttons.Extend);
    condenseConditions(limits, true, Displays.BarExtend);





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

    condenseProgressBar("barLimitProgress", game.pointScore, game.limits.Score);


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
        document.getElementById(display).style.width = width*0.95 + "%";
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