import "./style.css";

const framerate = 60;
const frames = 1000/framerate

let lastUpdatedTime = performance.now();


const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ezra's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//button1
const button1 = document.createElement("button");
button1.innerHTML = "click";
button1.style.position = "absolute"; //this came from brace
button1.style.top = "500px";
app.append(button1);

const displayScore = document.createElement("h2");
displayScore.innerHTML = "0";
app.append(displayScore);

let num_clicks = 0;
button1.onclick = () => {
  num_clicks++;
};



//button2
const button2 = document.createElement("button");

const autobuttonCost = 10;
button2.innerHTML = `auto-button for ${autobuttonCost}`;
button2.style.position = "absolute";
button2.style.top = "550px";
app.append(button2);

let incrementalPlus = 0;
button2.onclick = () => {
    if(num_clicks >= autobuttonCost){

        incrementalPlus++;
        num_clicks = num_clicks - autobuttonCost;
        button2.innerHTML = `auto-button for ${autobuttonCost}: (${incrementalPlus})`;
    }
};

const autoClickCooldown = 60;
let autoClickCooldownCurrentValue = autoClickCooldown;





function framerateLockedGame(){
    
    autoClickCooldownCurrentValue--;
    if(autoClickCooldownCurrentValue < 0){

        num_clicks = num_clicks + incrementalPlus;
        autoClickCooldownCurrentValue = autoClickCooldown;
    }

    displayScore.innerHTML = num_clicks.toString();
}







function go(currentTime: number) {


    const elapsedTime = currentTime - lastUpdatedTime;

    if (elapsedTime >= frames) {
        lastUpdatedTime = currentTime;    
        framerateLockedGame();    
    }  
    requestAnimationFrame(go);
}
requestAnimationFrame(go)