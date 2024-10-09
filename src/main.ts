import "./style.css";


const framerate = 30;

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


let incrementalDivisor = 0;
//button2
const button2 = document.createElement("button");
button2.innerHTML = "auto-button";
button2.style.position = "absolute";
button2.style.top = "550px";
app.append(button2);

button2.onclick = () =>{
    incrementalDivisor++;
    button2.innerHTML = `auto-button: (${incrementalDivisor})`
};


let increaseCooldown = framerate;



setInterval(go, framerate);
function go(){
    if(incrementalDivisor != 0){
        increaseCooldown = increaseCooldown - incrementalDivisor;
        if(increaseCooldown < 0){
            num_clicks++;
            increaseCooldown = framerate;
        }
        
    }
    
    displayScore.innerHTML = num_clicks.toString();
};

