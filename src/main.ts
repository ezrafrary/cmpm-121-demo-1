import "./style.css";


let lastUpdatedTime = performance.now();

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "sand";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);



const framerate = 60;
const frames = 1000 / framerate;
let incrementalPlus = 0;
let num_sand = 0;
let autobuttonCost = 10;
const autoSandCooldown = 60;
let autoSandCooldownCurrentValue = autoSandCooldown;
const sandCostIncrease = 5;
let sandPerSecond = 0;
let oneSecondTimer = framerate;
let previousNumSand = 0;

//autosander text
const autoSanderText = document.createElement("h3");
autoSanderText.innerHTML = `auto-sanders: ${incrementalPlus}`;
app.append(autoSanderText);

//sandpersecond text
const sandPerSecondText = document.createElement("h4");
sandPerSecondText.innerHTML = `sand per second: 0`;
app.append(sandPerSecondText);

//button1
const button1 = document.createElement("button");
button1.innerHTML = "plus 1 sand";
button1.style.position = "absolute"; //this came from brace
button1.style.top = "500px";
button1.style.left = "500px";
app.append(button1);

const displayScore = document.createElement("h2");
displayScore.innerHTML = "0";
app.append(displayScore);

button1.onclick = () => {
  num_sand = num_sand + 1;
};

//button2
const button2 = document.createElement("button");

button2.innerHTML = `1 auto-sand for ${autobuttonCost}`;
button2.style.position = "absolute";
button2.style.top = "550px";
button2.style.left = "500px";
app.append(button2);

button2.onclick = () => {
  if (num_sand >= autobuttonCost) {
    buyAutoSander();
  }
};


//button3
const button3 = document.createElement("button");
button3.style.position = "absolute";
button3.style.top = "550px";
button3.style.left = "685px";
app.append(button3);
button3.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
button3.onclick = () => {
  if(num_sand >= costOfAutoSanders(10)){
    for(let i = 0; i < 10; i++){
      buyAutoSander();
    }
  }
}


//button4
const button4 = document.createElement("button");
button4.style.position = "absolute";
button4.style.top = "550px";
button4.style.left = "900px";
app.append(button4);
button4.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
button4.onclick = () => {
  if(num_sand >= costOfAutoSanders(100)){
    for(let i = 0; i < 100; i++){
      buyAutoSander();
    }
  }
}









function costOfAutoSanders(numAutoSanders: number){
  let totalCost = 0;
  for(let i = 0; i < numAutoSanders; i++){
    totalCost = totalCost + autobuttonCost + (sandCostIncrease * i);
  }
  return totalCost;
}

function buyAutoSander(){
  incrementalPlus++;
  num_sand = num_sand - autobuttonCost;
  autobuttonCost = autobuttonCost + sandCostIncrease;
  autoSanderText.innerHTML = `auto-sanders: ${incrementalPlus}`;
  button2.innerHTML = `1 auto-sand for ${autobuttonCost}`;
  button3.innerHTML = `10 auto-sand for ${costOfAutoSanders(10)} `;
  button4.innerHTML = `100 auto-sand for ${costOfAutoSanders(100)}`;
}



function framerateLockedGame() {
  autoSandCooldownCurrentValue--;
  if (autoSandCooldownCurrentValue < 0) {
    num_sand = num_sand + incrementalPlus;
    autoSandCooldownCurrentValue = autoSandCooldown;
  }

  displayScore.innerHTML = num_sand.toString();

  oneSecondTimer--;
  if(oneSecondTimer <= 0){
    oneSecondTimer = framerate;
    sandPerSecond = num_sand - previousNumSand;
    if(sandPerSecond < 0){
      sandPerSecond = 0; 
    }
    sandPerSecondText.innerHTML = `sand per second: ${sandPerSecond}`;

    previousNumSand = num_sand
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
