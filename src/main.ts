import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ezra's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

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
    displayScore.innerHTML = num_clicks.toString();
};



