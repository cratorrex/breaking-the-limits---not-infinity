export class Game {
    constructor() {
        this.version = "0.0.2";

        //this.gameFrame = 0;
        this.frameCount = 0;
        this.frameSaveCount = 0;


        this.pointScore = 0;
        this.limitScoreTotal = 0;
        this.extendScoreTotal = 0;



        this.limits = 
        {
            Score: 0,
            Gain: 1,
        };

        this.structures = [0,0,0,0,0,0];
        





        
        this.options =
        {
            tabIndex: 0,
            monospace: false,

        };

    }







    saveGame() {
        let gameData = JSON.stringify(this);
        localStorage.setItem("gameData", gameData);
        console.log("saved");
    }

    loadGame() {
        let gameData = localStorage.getItem("gameData");
        let savedGame = JSON.parse(gameData);

        if(savedGame!=null){
            if (savedGame.version !== this.version) {
                for (const key in savedGame) {
                    if (savedGame.hasOwnProperty(key) && !this.hasOwnProperty(key)) {
                        this[key] = savedGame[key];
                    }
               }
            }
        }
        Object.assign(this, savedGame);
        //this.convertDecimal();
        console.log(this);
        console.log("loaded");
    }

    exportGame() {
        let gameData = JSON.stringify(this);
        localStorage.setItem("gameData", gameData);
        prompt("Exported Game Data:",gameData);
    }

    importGame() {
        let gameData = prompt("Input your save data.");
        let savedGame = JSON.parse(gameData);
        Object.assign(this, savedGame);
        console.log(this);
        localStorage.setItem("gameData", gameData);

        console.log("imported");
        
    }

}