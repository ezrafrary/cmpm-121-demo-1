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

const framerate = 60;
const frames = 1000 / framerate;
let num_sand = 0;
const autoSandCooldown = 60;
let autoSandCooldownCurrentValue = autoSandCooldown;
let sandPerSecond = 0;
let oneSecondTimer = framerate;
let previousNumSand = 0;
let clickIncrease = 1;





//data driven design
interface Item {
  name: string,
  cost: number,
  rate: number,
  numberPurchaced: number,
  addCostIncrease: number,
  multplyCostIncrease: number,
};

const avalibleItems : Item[] = [
  {name: "auto-sander", cost: 10, rate: 1, numberPurchaced: 0, addCostIncrease: 5, multplyCostIncrease: -1},
  {name: "strong auto-sander", cost: 100, rate: 10, numberPurchaced: 0, addCostIncrease: -1, multplyCostIncrease: 2},
  {name: "super strong auto-sander", cost: 1000, rate: 100, numberPurchaced: 0, addCostIncrease: -1, multplyCostIncrease: 10},
];


//autosander text
const autoSanderText = document.createElement("h3");
autoSanderText.innerHTML = `auto-sand: ${avalibleItems[0].numberPurchaced}`;
autoSanderText.style.position = "absolute";
autoSanderText.style.top = "180px";
autoSanderText.style.left = "10px";
app.append(autoSanderText);

//strongAutoSander text
const strongAutoSanderText = document.createElement("h3");
strongAutoSanderText.innerHTML = `strong auto-sand: ${avalibleItems[1].numberPurchaced}`;
strongAutoSanderText.style.position = "absolute";
strongAutoSanderText.style.top = "280px";
strongAutoSanderText.style.left = "10px";
app.append(strongAutoSanderText);

//superstrongAutoSander text
const superstrongAutoSanderText = document.createElement("h3");
superstrongAutoSanderText.innerHTML = `super strong auto-sand: ${avalibleItems[2].numberPurchaced}`;
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
  num_sand = num_sand + clickIncrease;
};




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


//button5 strong auto sand for _____
const button5 = document.createElement("button");
button5.style.position = "absolute";
button5.style.top = "330px";
button5.style. left = "10px";
app.append(button5);
button5.innerHTML = `1 strong auto-sand for ${avalibleItems[1].cost}`;
button5.onclick = () => {
  if (num_sand >= avalibleItems[1].cost){
    buyStrongAutoSander();
  }
}


//button 6 super strong auto sand for ___
const button6 = document.createElement("button");
button6.style.position = "absolute";
button6.style.top = "430px";
button6.style.left = "10px";
app.append(button6);
button6.innerHTML = `1 super strong auto-sand for ${avalibleItems[2].cost}`
button6.onclick = () => {
  if(num_sand >= avalibleItems[2].cost){
    buySuperStrongAutoSander();
  }
}


function costOfAutoSanders(numAutoSanders: number) {
  let totalCost = 0;
  for (let i = 0; i < numAutoSanders; i++) {
    totalCost = totalCost + avalibleItems[0].cost + avalibleItems[0].addCostIncrease * i;
  }
  return totalCost;
}


function buyAutoSander() {
  avalibleItems[0].numberPurchaced++;
  num_sand = num_sand - avalibleItems[0].cost;
  avalibleItems[0].cost = avalibleItems[0].cost + avalibleItems[0].addCostIncrease;
  autoSanderText.innerHTML = `auto-sand: ${avalibleItems[0].numberPurchaced}`;
  button2.innerHTML = `1 auto-sand for ${avalibleItems[0].cost}`;
  button3.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
  button4.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
}


function buyStrongAutoSander(){
  avalibleItems[1].numberPurchaced++;
  num_sand = num_sand - avalibleItems[1].cost;
  strongAutoSanderText.innerHTML = `strong auto-sand: ${avalibleItems[1].numberPurchaced}`;
  avalibleItems[1].cost = avalibleItems[1].cost * avalibleItems[1].multplyCostIncrease;
  button5.innerHTML = `1 strong auto-sand: ${avalibleItems[1].cost}`;
}


function buySuperStrongAutoSander(){
  avalibleItems[2].numberPurchaced++;
  num_sand = num_sand - avalibleItems[2].cost;
  superstrongAutoSanderText.innerHTML = `super strong auto-sand: ${avalibleItems[2].numberPurchaced}`;
  avalibleItems[2].cost = avalibleItems[2].cost * avalibleItems[2].multplyCostIncrease;
  button6.innerHTML = `1 super strong auto-sand ${avalibleItems[2].cost}`;
}


function framerateLockedGame() {
  autoSandCooldownCurrentValue--;
  if (autoSandCooldownCurrentValue < 0) {
    num_sand = num_sand + (avalibleItems[0].numberPurchaced * avalibleItems[0].rate) + (avalibleItems[1].numberPurchaced * avalibleItems[1].rate) + (avalibleItems[2].numberPurchaced * avalibleItems[2].rate);
    autoSandCooldownCurrentValue = autoSandCooldown;
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
