let generation = [0,0,0,0,0,0];
let structCost = [0,0,0,0,0,0];





export function structuresCost(index){
  return structCost[index];
}

export function structuresGen(own) {
  let value = 0;
  generation[0] = own[0] * 1  ;
  generation[1] = own[1] * 5  ; 
  generation[2] = own[2] * 25 ;
  generation[3] = own[3] * 125;
  generation[4] = own[4] * 750;
//value += Owned  * Base * Upgrades >>...
  value = generation.reduce((a, b) => a + b, 0);
  return value;
}

export function structuresDisplay(own, mode){
  switch(mode){
    case "cost":
      structCost[0] = 10   + Math.floor(own[0]**1.1 * 1)      ;
      structCost[1] = 20   + Math.floor(own[1]**1.2 * 4)      ;
      structCost[2] = 50   + Math.floor(own[2]**1.3 * 16)     ;
      structCost[3] = 125  + Math.floor(own[3]**1.4 * 64)     ;
      structCost[4] = 500  + Math.floor(own[4]**1.5 * 256)    ;


      return structCost;
      break;

    case "gen":
      return generation
      break;
    
    case "own":
      return own;
      break;

    default:
      break;
  }

}