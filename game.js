import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
//import kaboom from "https://unpkg.com/kaboom@2000.2.9/dist/kaboom.mjs"
import {loadAssets} from "./load.js"
import * as helper from "./helper.js"

kaboom({
  global: true,
  background: [0,0,0,],
});

loadAssets();

let animals = ["ant","bee","beetle","butterfly","caterpillar","dragonfly","firefly","grasshopper","ladybug","stickbug","ant","bee","beetle","butterfly","caterpillar","dragonfly","firefly","grasshopper","ladybug","stickbug"]
let counter = 0;
let finCounter = Math.trunc(animals.length/2);

const xOffset = ((width()/2) - 300);
const yOffset = ((height()/2) - 200);
const xSize = 150;
const ySize = 130;

let selectOne = null;
let selectTwo = null;

function getAnimalName(a) {
  let name = "";

  animals.forEach((animal) => {
    if (a.is(animal)) name = animal;
  });

  return name;
}

function closeTiles() {
  if (!(selectOne===null) && !(selectTwo===null)) {
    selectOne.use(sprite("back"));
    selectTwo.use(sprite("back"));
  }
}

scene("main", (args = {}) => {
  let tiles = [];
  let gameArray = [...animals];
  let count = 0;
  let isClickable = true;

  helper.shuffleArray(gameArray);


  for (let j=0; j<5; j++) {
    for (let i=0; i<4; i++) {      
      let anim = add ([
        sprite("back"),
        pos((j*xSize)+xOffset,(i*ySize)+yOffset),
        scale(0.25),
        origin("center"),
        area(),
        gameArray[count],
        "tile"
      ]);
      tiles.push(anim);
      count++;
    }
  }

  onClick("tile", (t) => {
    let name = sprite(getAnimalName(t));

    selectOne===null ? console.log("null") : console.log(selectOne._id);
    selectTwo===null ? console.log("null") : console.log(selectTwo._id);

    if (isClickable) {
      t.use(name);
    }

    if (selectOne===null) {
      selectOne = t;
    } else if (selectTwo===null && t != selectOne) {
      selectTwo = t;
      isClickable = false;
    }

    if (!isClickable) {
      wait(1, () => {
        closeTiles();
        selectOne = null;
        selectTwo = null;
        isClickable = true;
      });
    }
  })
});

go("main");