import "./style.css";

let lastUpdatedTime = performance.now();

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "sand";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
header.style.position = "absolute";
header.style.top = "-30px";
header.style.left = "10px";

//controling window framerate
const framerate = 60;
const frames = 1000 / framerate; 

//how much sand the user has
let num_sand = 0;

//all used to check the sand per second of the user
const autoSandCooldown = 60;
let autoSandCooldownCurrentValue = autoSandCooldown;
let sandPerSecond = 0;
let oneSecondTimer = framerate;
let previousNumSand = 0;

//how much sand the user gets by clicking once

//data driven design
interface Item {
  name: string;
  cost: number;
  rate: number;
  numberPurchaced: number;
  addCostIncrease: number;
  multplyCostIncrease: number;
  textBox: string;
}

const avalibleItems: Item[] = [
  {
    name: "auto-sander",
    cost: 10,
    rate: 1,
    numberPurchaced: 0,
    addCostIncrease: 5,
    multplyCostIncrease: -1,
    textBox: "auto-sand: "
  },
  {
    name: "strong auto-sander",
    cost: 100,
    rate: 10,
    numberPurchaced: 0,
    addCostIncrease: -1,
    multplyCostIncrease: 2,
    textBox: "strong auto-sand: "
  },
  {
    name: "super strong auto-sander",
    cost: 1000,
    rate: 100,
    numberPurchaced: 0,
    addCostIncrease: -1,
    multplyCostIncrease: 10,
    textBox: "super strong auto-sand: ",
  },
  {
    name: "increased clicks",
    cost: 100,
    rate: 0,
    numberPurchaced: 0,
    addCostIncrease: 10,
    multplyCostIncrease: -1,
    textBox: "plus more sand: "
  },
  {
    name: "faster sanders",
    cost: 1000,
    rate: 0,
    numberPurchaced: 0,
    addCostIncrease: -1,
    multplyCostIncrease: 5,
    textBox: "all auto-sand work faster: "
  },
];


//faster auto-sand text
const fasterAutoSandText = document.createElement("h3");
fasterAutoSandText.innerHTML = `faster auto-sand: ${avalibleItems[4].numberPurchaced}`;
fasterAutoSandText.style.position = "absolute";
fasterAutoSandText.style.top = "480px";
fasterAutoSandText.style.left = "10px";
app.append(fasterAutoSandText);

//autosander text
const autoSanderText = document.createElement("h3");
autoSanderText.innerHTML = `${avalibleItems[0].textBox}${avalibleItems[0].numberPurchaced}`;
autoSanderText.style.position = "absolute";
autoSanderText.style.top = "180px";
autoSanderText.style.left = "10px";
app.append(autoSanderText);

//strongAutoSander text
const strongAutoSanderText = document.createElement("h3");
strongAutoSanderText.innerHTML = `${avalibleItems[1].textBox}${avalibleItems[1].numberPurchaced}`;
strongAutoSanderText.style.position = "absolute";
strongAutoSanderText.style.top = "280px";
strongAutoSanderText.style.left = "10px";
app.append(strongAutoSanderText);

//superstrongAutoSander text
const superstrongAutoSanderText = document.createElement("h3");
superstrongAutoSanderText.innerHTML = `${avalibleItems[2].textBox}${avalibleItems[2].numberPurchaced}`;
superstrongAutoSanderText.style.position = "absolute";
superstrongAutoSanderText.style.top = "380px";
superstrongAutoSanderText.style.left = "10px";
app.append(superstrongAutoSanderText);

//sandpersecond text
const sandPerSecondText = document.createElement("h4");
sandPerSecondText.innerHTML = `sand per second: 0`;
sandPerSecondText.style.position = "absolute";
sandPerSecondText.style.top = "90px";
sandPerSecondText.style.left = "10px";
app.append(sandPerSecondText);

//sand display
const displayScore = document.createElement("h2");
displayScore.innerHTML = "0";
app.append(displayScore);
displayScore.style.position = "absolute";
displayScore.style.top = "50px";
displayScore.style.left = "10px";

//button1 plus one sand
const button1 = document.createElement("button");
button1.innerHTML = "plus 1 sand";
button1.style.position = "absolute"; //this came from brace
button1.style.top = "140px";
button1.style.left = "10px";
app.append(button1);
button1.onclick = () => {
  num_sand = num_sand + avalibleItems[3].numberPurchaced + 1;
};
button1.title = "Creates 1 sand";

//button2 1 auto-sand for ____
const button2 = document.createElement("button");
button2.innerHTML = `1 auto-sand for ${avalibleItems[0].cost}`;
button2.style.position = "absolute";
button2.style.top = "230px";
button2.style.left = "10px";
app.append(button2);
button2.onclick = () => {
  if (num_sand >= avalibleItems[0].cost) {
    buyAutoSander();
  }
};
button2.title = "Creates 1 auto-sand";

//button3 10 auto sand for ____
const button3 = document.createElement("button");
button3.style.position = "absolute";
button3.style.top = "230px";
button3.style.left = "185px";
app.append(button3);
button3.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
button3.onclick = () => {
  if (num_sand >= costOfAutoSanders(10)) {
    for (let i = 0; i < 10; i++) {
      buyAutoSander();
    }
  }
};
button3.title = "Creates 10 auto-sand";

//button4 100 autosand for ____
const button4 = document.createElement("button");
button4.style.position = "absolute";
button4.style.top = "230px";
button4.style.left = "380px";
app.append(button4);
button4.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
button4.onclick = () => {
  if (num_sand >= costOfAutoSanders(100)) {
    for (let i = 0; i < 100; i++) {
      buyAutoSander();
    }
  }
};
button4.title = "Creates 100 auto-sand";

//button5 strong auto sand for _____
const button5 = document.createElement("button");
button5.style.position = "absolute";
button5.style.top = "330px";
button5.style.left = "10px";
app.append(button5);
button5.innerHTML = `1 strong auto-sand for ${avalibleItems[1].cost}`;
button5.onclick = () => {
  if (num_sand >= avalibleItems[1].cost) {
    buyStrongAutoSander();
  }
};
button5.title = `1 strong auto-sand is as strong as ${avalibleItems[1].rate} auto-sand`;

//button 6 super strong auto sand for ___
const button6 = document.createElement("button");
button6.style.position = "absolute";
button6.style.top = "430px";
button6.style.left = "10px";
app.append(button6);
button6.innerHTML = `1 super strong auto-sand for ${avalibleItems[2].cost}`;
button6.onclick = () => {
  if (num_sand >= avalibleItems[2].cost) {
    buySuperStrongAutoSander();
  }
};
button6.title = `1 super strong auto-sand is as strong as ${avalibleItems[2].rate} auto-sand`;


//button 7 plus more sand for __

const button7 = document.createElement("button");
button7.style.position = "absolute";
button7.style.top = "140px";
button7.style.left = "140px";
app.append(button7);
button7.innerHTML = `${avalibleItems[3].textBox}${avalibleItems[3].cost}`
button7.onclick = () => {
  if (num_sand >= avalibleItems[3].cost){
    buyPlusMoreSand();
  }
}
button7.title = "Increases how many sand per click";


//button8 all auto-sand work faster: ____
const button8 = document.createElement("button");
button8.style.position = "absolute";
button8.style.top = "530px";
button8.style.left = "10px";
app.append(button8);
button8.innerHTML = `${avalibleItems[4].textBox}${avalibleItems[4].cost}`;
button8.onclick = () => {
  if (num_sand >= avalibleItems[4].cost){
    buyAllAutoSandFaster();
  }
}
button8.title = "All types of auto-sand work 1 frame faster (max 60)";



function buyAllAutoSandFaster(){
  avalibleItems[4].numberPurchaced++;
  num_sand = num_sand - avalibleItems[4].cost;
  avalibleItems[4].cost = avalibleItems[4].cost * avalibleItems[4].multplyCostIncrease;
  button8.innerHTML = `${avalibleItems[4].textBox}${avalibleItems[4].cost}`;
  fasterAutoSandText.innerHTML = `faster auto-sand: ${avalibleItems[4].numberPurchaced}`;
}

function buyPlusMoreSand(){
  avalibleItems[3].numberPurchaced++;
  num_sand = num_sand - avalibleItems[3].cost;
  avalibleItems[3].cost = avalibleItems[3].cost + avalibleItems[3].addCostIncrease;
  button7.innerHTML = `${avalibleItems[3].textBox}${avalibleItems[3].cost}`
  button1.innerHTML = `plus ${avalibleItems[3].numberPurchaced + 1} sand`
}

function costOfAutoSanders(numAutoSanders: number) {
  let totalCost = 0;
  for (let i = 0; i < numAutoSanders; i++) {
    totalCost =
      totalCost + avalibleItems[0].cost + avalibleItems[0].addCostIncrease * i;
  }
  return totalCost;
}

function buyAutoSander() {
  avalibleItems[0].numberPurchaced++;
  num_sand = num_sand - avalibleItems[0].cost;
  avalibleItems[0].cost =
    avalibleItems[0].cost + avalibleItems[0].addCostIncrease;
  autoSanderText.innerHTML = `auto-sand: ${avalibleItems[0].numberPurchaced}`;
  button2.innerHTML = `1 auto-sand for ${avalibleItems[0].cost}`;
  button3.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
  button4.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
}

function buyStrongAutoSander() {
  avalibleItems[1].numberPurchaced++;
  num_sand = num_sand - avalibleItems[1].cost;
  strongAutoSanderText.innerHTML = `strong auto-sand: ${avalibleItems[1].numberPurchaced}`;
  avalibleItems[1].cost =
    avalibleItems[1].cost * avalibleItems[1].multplyCostIncrease;
  button5.innerHTML = `1 strong auto-sand: ${avalibleItems[1].cost}`;
}

function buySuperStrongAutoSander() {
  avalibleItems[2].numberPurchaced++;
  num_sand = num_sand - avalibleItems[2].cost;
  superstrongAutoSanderText.innerHTML = `super strong auto-sand: ${avalibleItems[2].numberPurchaced}`;
  avalibleItems[2].cost = avalibleItems[2].cost * avalibleItems[2].multplyCostIncrease;
  button6.innerHTML = `1 super strong auto-sand ${avalibleItems[2].cost}`;
}



function framerateLockedGame() {
  autoSandCooldownCurrentValue--;
  if (autoSandCooldownCurrentValue < 0) {


    for (const j of avalibleItems){
      num_sand = num_sand + j.numberPurchaced * j.rate;
    }
    autoSandCooldownCurrentValue = autoSandCooldown - avalibleItems[4].numberPurchaced;
  }

  displayScore.innerHTML = num_sand.toString();

  oneSecondTimer--;
  if (oneSecondTimer <= 0) {
    oneSecondTimer = framerate;
    sandPerSecond = num_sand - previousNumSand;
    if (sandPerSecond < 0) {
      sandPerSecond = 0;
    }
    sandPerSecondText.innerHTML = `sand per second: ${sandPerSecond}`;

    previousNumSand = num_sand;
  }
}

function go(currentTime: number) {
  const elapsedTime = currentTime - lastUpdatedTime;

  if (elapsedTime >= frames) {
    lastUpdatedTime = currentTime;
    framerateLockedGame();
  }
  requestAnimationFrame(go);
}
requestAnimationFrame(go);
