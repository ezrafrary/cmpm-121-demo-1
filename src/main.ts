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
    textBox: "auto-sand: ",
  },
  {
    name: "strong auto-sander",
    cost: 100,
    rate: 10,
    numberPurchaced: 0,
    addCostIncrease: -1,
    multplyCostIncrease: 2,
    textBox: "strong auto-sand: ",
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
    textBox: "plus more sand: ",
  },
  {
    name: "faster sanders",
    cost: 1000,
    rate: 0,
    numberPurchaced: 0,
    addCostIncrease: -1,
    multplyCostIncrease: 5,
    textBox: "all auto-sand work faster: ",
  },
];


function createTextElement(
  tagName: "h1" | "h2" | "h3" | "h4", // Restrict tags for semantics
  text: string,                       // Text content of the element
  top: string,                        // CSS 'top' position
  left: string,                       // CSS 'left' position
): HTMLElement {
  const element = document.createElement(tagName);
  element.innerHTML = text;
  element.style.position = "absolute";
  element.style.top = top;
  element.style.left = left;
  app.append(element);
  return element; // Return in case further modification is needed
}




const fasterAutoSandText = createTextElement(
  "h3",
  `faster auto-sand: ${avalibleItems[4].numberPurchaced}`,
  "480px",
  "10px"
);

const autoSanderText = createTextElement(
  "h3",
  `${avalibleItems[0].textBox}${avalibleItems[0].numberPurchaced}`,
  "180px",
  "10px"
);

const strongAutoSanderText = createTextElement(
  "h3",
  `${avalibleItems[1].textBox}${avalibleItems[1].numberPurchaced}`,
  "280px",
  "10px"
);

const superstrongAutoSanderText = createTextElement(
  "h3",
  `${avalibleItems[2].textBox}${avalibleItems[2].numberPurchaced}`,
  "380px",
  "10px"
);

const sandPerSecondText = createTextElement(
  "h4",
  `sand per second: 0`,
  "90px",
  "10px"
);

const displayScore = createTextElement(
  "h2",
  "0",
  "50px",
  "10px"
);



function createButton(
  label: string,                  // Button label (innerHTML)
  top: string,                    // CSS 'top' position
  left: string,                   // CSS 'left' position
  onclickHandler: () => void,     // Function to execute on button click
  title: string                   // Tooltip (title) for the button
): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = label;             // Button label
  button.style.position = "absolute";   // Apply absolute positioning
  button.style.top = top;               // Top position
  button.style.left = left;             // Left position
  button.title = title;                 // Set tooltip
  app.append(button);                   // Append the button to the app
  button.onclick = onclickHandler;      // Attach the event handler
  return button;                        // Return in case further adjustments are needed
}


// Button 1: plus one sand
const button_plus1sand = createButton(
  "plus 1 sand",
  "140px",
  "10px",
  () => {
    num_sand = num_sand + avalibleItems[3].numberPurchaced + 1;
  },
  "Creates 1 sand"
);

// Button 2: 1 auto-sand
const button_1autoSand = createButton(
  `1 auto-sand for ${avalibleItems[0].cost}`,
  "230px",
  "10px",
  () => {
    if (num_sand >= avalibleItems[0].cost) {
      buyAutoSander();
    }
  },
  "Creates 1 auto-sand"
);

// Button 3: 10 auto-sand
const button_10autoSand = createButton(
  `10 auto-sand for ${costOfAutoSanders(10)}`,
  "230px",
  "185px",
  () => {
    if (num_sand >= costOfAutoSanders(10)) {
      for (let i = 0; i < 10; i++) {
        buyAutoSander();
      }
    }
  },
  "Creates 10 auto-sand"
);


// Button 4: 100 auto-sand
const button_100autoSand = createButton(
  `100 auto-sand for ${costOfAutoSanders(100)}`,
  "230px",
  "380px",
  () => {
    if (num_sand >= costOfAutoSanders(100)) {
      for (let i = 0; i < 100; i++) {
        buyAutoSander();
      }
    }
  },
  "Creates 100 auto-sand"
);

// Button 5: 1 strong auto-sand
const button_1strongAutoSand = createButton(
  `1 strong auto-sand for ${avalibleItems[1].cost}`,
  "330px",
  "10px",
  () => {
    if (num_sand >= avalibleItems[1].cost) {
      buyStrongAutoSander();
    }
  },
  `1 strong auto-sand is as strong as ${avalibleItems[1].rate} auto-sand`
);

// Button 6: 1 super strong auto-sand
const button_1superStrongAutoSand = createButton(
  `1 super strong auto-sand for ${avalibleItems[2].cost}`,
  "430px",
  "10px",
  () => {
    if (num_sand >= avalibleItems[2].cost) {
      buySuperStrongAutoSander();
    }
  },
  `1 super strong auto-sand is as strong as ${avalibleItems[2].rate} auto-sand`
);

// Button 7: Plus more sand
const button_plusMoreSand = createButton(
  `${avalibleItems[3].textBox}${avalibleItems[3].cost}`,
  "140px",
  "140px",
  () => {
    if (num_sand >= avalibleItems[3].cost) {
      buyPlusMoreSand();
    }
  },
  "Increases how many sand per click"
);

// Button 8: All auto-sand work faster
const button_allAutoSandWorkFaster = createButton(
  `${avalibleItems[4].textBox}${avalibleItems[4].cost}`,
  "530px",
  "10px",
  () => {
    if (num_sand >= avalibleItems[4].cost) {
      buyAllAutoSandFaster();
    }
  },
  "All types of auto-sand work 1 frame faster (max 60)"
);






function buyAllAutoSandFaster() {
  avalibleItems[4].numberPurchaced++;
  num_sand = num_sand - avalibleItems[4].cost;
  avalibleItems[4].cost =
    avalibleItems[4].cost * avalibleItems[4].multplyCostIncrease;
    button_allAutoSandWorkFaster.innerHTML = `${avalibleItems[4].textBox}${avalibleItems[4].cost}`;
  fasterAutoSandText.innerHTML = `faster auto-sand: ${avalibleItems[4].numberPurchaced}`;
}

function buyPlusMoreSand() {
  avalibleItems[3].numberPurchaced++;
  num_sand = num_sand - avalibleItems[3].cost;
  avalibleItems[3].cost =
    avalibleItems[3].cost + avalibleItems[3].addCostIncrease;
    button_plusMoreSand.innerHTML = `${avalibleItems[3].textBox}${avalibleItems[3].cost}`;
  button_plus1sand.innerHTML = `plus ${avalibleItems[3].numberPurchaced + 1} sand`;
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
  button_1autoSand.innerHTML = `1 auto-sand for ${avalibleItems[0].cost}`;
  button_10autoSand.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
  button_100autoSand.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
}

function buyStrongAutoSander() {
  avalibleItems[1].numberPurchaced++;
  num_sand = num_sand - avalibleItems[1].cost;
  strongAutoSanderText.innerHTML = `strong auto-sand: ${avalibleItems[1].numberPurchaced}`;
  avalibleItems[1].cost =
    avalibleItems[1].cost * avalibleItems[1].multplyCostIncrease;
    button_1strongAutoSand.innerHTML = `1 strong auto-sand: ${avalibleItems[1].cost}`;
}

function buySuperStrongAutoSander() {
  avalibleItems[2].numberPurchaced++;
  num_sand = num_sand - avalibleItems[2].cost;
  superstrongAutoSanderText.innerHTML = `super strong auto-sand: ${avalibleItems[2].numberPurchaced}`;
  avalibleItems[2].cost =
    avalibleItems[2].cost * avalibleItems[2].multplyCostIncrease;
    button_1superStrongAutoSand.innerHTML = `1 super strong auto-sand ${avalibleItems[2].cost}`;
}

function framerateLockedGame() {
  autoSandCooldownCurrentValue--;
  if (autoSandCooldownCurrentValue < 0) {
    for (const j of avalibleItems) {
      num_sand = num_sand + j.numberPurchaced * j.rate;
    }
    autoSandCooldownCurrentValue =
      autoSandCooldown - avalibleItems[4].numberPurchaced;
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
