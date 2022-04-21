import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
//import kaboom from "https://unpkg.com/kaboom@2000.2.9/dist/kaboom.mjs"
import {loadAssets} from "./load.js"
import * as helper from "./helper.js"

kaboom({
  global: true,
  background: [0,0,0,],
});

loadAssets();

let animals = ["ant","bee","beetle","butterfly","caterpillar","dragonfly","firefly","grasshopper","ladybug","stickbug"]

scene("main", (args = {}) => {
  const centerX = ((width()/2));
  const centerY = ((height()/2));

  const offsetX = 0;
  const offsetY = 0;

  let anim = animals[helper.getRandomInt(animals.length)]

  let card = add ([
    sprite("back"),
    pos(centerX,centerY),
    scale(0.25),
    origin("center")
  ]);

  card.onClick(() => {
    card.use(
      sprite("ant")
    );
  });
});

go("main");