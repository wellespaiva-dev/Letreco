const LINE = 6;
const COLUMS = 6;
const URL_API = "https://uatuakefwg.execute-api.us-east-1.amazonaws.com/word";

const buttonQ = document.getElementById("buttonQ");
const buttonW = document.getElementById("buttonW");
const buttonE = document.getElementById("buttonE");
const buttonR = document.getElementById("buttonR");
const buttonT = document.getElementById("buttonT");
const buttonY = document.getElementById("buttonY");
const buttonU = document.getElementById("buttonU");
const buttonI = document.getElementById("buttonI");
const buttonO = document.getElementById("buttonO");
const buttonP = document.getElementById("buttonP");
const buttonA = document.getElementById("buttonA");
const buttonS = document.getElementById("buttonS");
const buttonD = document.getElementById("buttonD");
const buttonF = document.getElementById("buttonF");
const buttonG = document.getElementById("buttonG");
const buttonH = document.getElementById("buttonH");
const buttonJ = document.getElementById("buttonJ");
const buttonK = document.getElementById("buttonK");
const buttonL = document.getElementById("buttonL");
const buttonDEL = document.getElementById("buttonDEL");
const buttonZ = document.getElementById("buttonZ");
const buttonX = document.getElementById("buttonX");
const buttonC = document.getElementById("buttonC");
const buttonV = document.getElementById("buttonV");
const buttonB = document.getElementById("buttonB");
const buttonN = document.getElementById("buttonN");
const buttonM = document.getElementById("buttonM");
const buttonENTER = document.getElementById("buttonENTER");

let CURRENT_LINE = 0;
let CURRENT_COLUMS = 0;

let word = "";

let word_attempt = [];

let allColumnsGreen = false;

function alertSucess() {
  let modal = document.getElementById("modalAlert");
  modal.style.display = "block";

  let message = document.getElementById("messageAlert");
  message.textContent =
    "Parabéns! Você completou o desafio. Clique em comecar o jogo para jogar novamente.";

  let closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function alertError() {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";

  let message = document.getElementById("messageAlert");
  message.textContent =
    "Poxa! Você não completou o desafio. Clique em comecar o jogo para jogar novamente.";
  message.style.color = "red";

  let closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function cleanHtml() {
  for (let i = 0; i < LINE; i++) {
    for (let j = 0; j < COLUMS; j++) {
      const column =
        document.getElementById("tabuleiro").childNodes[i].childNodes[j];
      column.innerHTML = "";
      column.style.backgroundColor = "";
      column.style.color = "";
    }
  }
}

function getWordApi() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(URL_API, requestOptions)
    .then((resp) => {
      resp
        .json()
        .then((resp) => {
          word = resp.WELLES_word;
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function checkFinish() {
  let string = "";
  word_attempt.forEach((e) => {
    string += e;
  });

  if (word == string) {
    allColumnsGreen = true;
    alertSucess();
  } else if (LINE == CURRENT_LINE) {
    alertError();
  }
}

function buttonNewGame() {
  let containerButton = document.getElementById("button");
  let button = document.createElement("button");
  button.textContent = "Começar o jogo!";
  button.className = "buttonNewGame";
  containerButton.appendChild(button);

  button.addEventListener("click", function () {
    if (allColumnsGreen || CURRENT_LINE == LINE) {
      CURRENT_LINE = 0;
      CURRENT_COLUMS = 0;
      word_attempt = [];
      allColumnsGreen = false;
      cleanHtml();
      getWordApi();
    }
  });
}

function generateTable() {
  let table = document.getElementById("tabuleiro");

  for (let i = 0; i < LINE; i++) {
    let line = document.createElement("div");
    line.className = "line";
    for (let j = 0; j < COLUMS; j++) {
      let colums = document.createElement("div");
      colums.className = "colums";
      line.appendChild(colums);
    }
    table.appendChild(line);
  }
}

function checkWord() {
  word_attempt.forEach((element, index) => {
    const correctLetter = word[index];
    const column =
      document.getElementById("tabuleiro").childNodes[CURRENT_LINE].childNodes[
        index
      ];

    if (element === correctLetter) {
      column.style.backgroundColor = "green";
      column.style.color = "white";
    } else if (word.includes(element)) {
      column.style.backgroundColor = "orange";
    } else {
      column.style.backgroundColor = "red";
      column.style.color = "white";
    }
  });
  CURRENT_LINE++;
  CURRENT_COLUMS = 0;
  checkFinish();
}

function captureKey(event) {
  if (!allColumnsGreen) {
    let regex = /^[a-zA-Z]$/;
    let letter = event.key.toUpperCase();
    if (letter == "ENTER" && CURRENT_COLUMS == COLUMS) {
      checkWord();
      word_attempt = [];
    }
    if (letter == "BACKSPACE" && word_attempt.length > 0) {
      document.getElementById("tabuleiro").childNodes[CURRENT_LINE].childNodes[
        CURRENT_COLUMS - 1
      ].innerHTML = "";
      CURRENT_COLUMS--;
      word_attempt.pop();
    } else if (CURRENT_COLUMS < COLUMS && regex.test(letter)) {
      document.getElementById("tabuleiro").childNodes[CURRENT_LINE].childNodes[
        CURRENT_COLUMS
      ].innerHTML = letter;
      CURRENT_COLUMS++;
      word_attempt.push(letter);
    }
  }
}

function virtualKeyboard(event) {
  if (!allColumnsGreen) {
    let regex = /^[a-zA-Z]$/;
    let buttonKeyboard = event.target;
    let letter = buttonKeyboard.textContent.toUpperCase();
    if (letter == "ENTER" && CURRENT_COLUMS == COLUMS) {
      checkWord();
      word_attempt = [];
    } else if (letter == "DEL" && word_attempt.length > 0) {
      document.getElementById("tabuleiro").childNodes[CURRENT_LINE].childNodes[
        CURRENT_COLUMS - 1
      ].innerHTML = "";
      CURRENT_COLUMS--;
      word_attempt.pop();
    } else if (CURRENT_COLUMS < COLUMS && regex.test(letter)) {
      document.getElementById("tabuleiro").childNodes[CURRENT_LINE].childNodes[
        CURRENT_COLUMS
      ].innerHTML = letter;
      CURRENT_COLUMS++;
      word_attempt.push(letter);
    }
  }
}

getWordApi();

buttonNewGame();

generateTable();

document.addEventListener("keyup", captureKey);

buttonQ.addEventListener("click", virtualKeyboard);
buttonW.addEventListener("click", virtualKeyboard);
buttonE.addEventListener("click", virtualKeyboard);
buttonR.addEventListener("click", virtualKeyboard);
buttonT.addEventListener("click", virtualKeyboard);
buttonY.addEventListener("click", virtualKeyboard);
buttonU.addEventListener("click", virtualKeyboard);
buttonI.addEventListener("click", virtualKeyboard);
buttonO.addEventListener("click", virtualKeyboard);
buttonP.addEventListener("click", virtualKeyboard);
buttonA.addEventListener("click", virtualKeyboard);
buttonS.addEventListener("click", virtualKeyboard);
buttonD.addEventListener("click", virtualKeyboard);
buttonF.addEventListener("click", virtualKeyboard);
buttonG.addEventListener("click", virtualKeyboard);
buttonH.addEventListener("click", virtualKeyboard);
buttonJ.addEventListener("click", virtualKeyboard);
buttonK.addEventListener("click", virtualKeyboard);
buttonL.addEventListener("click", virtualKeyboard);
buttonDEL.addEventListener("click", virtualKeyboard);
buttonZ.addEventListener("click", virtualKeyboard);
buttonX.addEventListener("click", virtualKeyboard);
buttonC.addEventListener("click", virtualKeyboard);
buttonV.addEventListener("click", virtualKeyboard);
buttonB.addEventListener("click", virtualKeyboard);
buttonN.addEventListener("click", virtualKeyboard);
buttonM.addEventListener("click", virtualKeyboard);
buttonENTER.addEventListener("click", virtualKeyboard);
