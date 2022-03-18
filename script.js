let order = [];
let clickCount = [];
let score = 0;
let time = 500;

/**
 * 0 = verde
 * 1 = vermelho
 * 2 = amarelo
 * 3 = azul
 */

// selecionando as div's
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

// criar ordem aleatória de cores
const lightOn = (elementColor) => {
  elementColor.classList.add("selected");
};

function lightOff(elementColor) {
  elementColor.classList.remove("selected");
}

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  setTimeout(() => {
    //tempo para inicio
    const blink = async () => {
      for (let i in order) {
        let elementColor = createColorElement(order[i]);
        await new Promise((cooldown) => setTimeout(cooldown, time)) //tempo ligado blink
          .then(new Promise((r) => lightOn(elementColor, r)));
        new Promise((reso) => lightOff(elementColor, reso));
        await new Promise((cooldown1) => setTimeout(cooldown1, time));
      }
    };
    blink();
  }, 500);
};

// confere a ordem dos cliques
let checkOrder = (color) => {
  let success = true;

  if (color != order[clickCount]) {
    success = false;
    return gameOver();
  } else {
    clickCount++;
  }

  if (clickCount == order.length && success) {
    score++;
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nivel`);
    return nextLevel();
  }
};

// função para o clique do usuário
let click = (color) => {
  if (clickCount <= order.length) {
    createColorElement(color).classList.add("selected");
  }

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder(color, clickCount);
  }, 250);
};

// função que retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

// função próximo nível
let nextLevel = () => {
  clickCount = 0;
  shuffleOrder();
};

// função para fim de jogo
let gameOver = () => {
  alert(`Pontuação: ${score}!\n 
          Você perdeu!\nClique em OK para reiniciar o jogo`);
  order = [];
  score = 0;
};

// função para início do jogo
let playGame = () => {
  alert("Bem-vindo ao Genesis! Iniciando novo jogo!");
  document.getElementById("home").style.display = "none";
  document.getElementById("main-game").style.display = "flex";
  order = [];
  score = 0;
  nextLevel();
};

// ativando os cliques nas cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
