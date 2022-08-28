const mainBox = document.querySelector(".main-box");
const playerBox = document.querySelector(".player");
const myBox = document.getElementsByClassName("box");
// let win = "";
let currentPlayer = "";
const playes = ["player1", "player2"];
let a = [];
const winState = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
function createBox() {
  currentPlayer = playes[Math.floor(Math.random() * 2)];
  // console.log(currentPlayer);
  playerIcon(currentPlayer);

  a = [];
  let content = "";
  for (let i = 0; i < 9; i++) {
    a.push(0);
    content += `<div onclick="change(${i})" class="box"></div>`;
  }
  mainBox.innerHTML = content;
}

window.addEventListener("load", createBox);

function change(index) {
  if (a[index] === 0) {
    currentPlayer == playes[0]
      ? (myBox[index].innerHTML = '<i class="fas fa-close close-icon"></i>') &&
        (a[index] = 1)
      : (myBox[index].innerHTML =
          '<i class="far fa-circle circle-icon"></i>') && (a[index] = 2);

    winCheck(index, currentPlayer);
    currentPlayer = currentPlayer == playes[0] ? playes[1] : playes[0];
    playerIcon(currentPlayer);
  }
}

function winCheck(index, type) {
  let statusWin=false;
  let result = [];
  let count = 0;
  winState.forEach((item) => {
    // console.log(item)
    item.forEach((x) => {
      if (x == index) {
        result.push(item);
      }
    });
  });
  // console.log(result);
  result.forEach((item) => {
    
    count = 0;
    item.forEach((x) => {
      if (a[x] == a[index]) {
        count++;
      }
      if (count === 3) {
        statusWin=true
        item.forEach((w) => {
          myBox[w].style.background = "#cc3";
        });
        win = type;
        console.log("win " + win);
        type =
          type == playes[0]
            ? '<i class="fas fa-close close-icon"></i>'
            : '<i class="far fa-circle circle-icon"></i>';
        Swal.fire({
          title: `Win : ${type}`,
          position: "bottom",
          confirmButtonText: "OK",
        }).then((result) => {
          createBox();
        });
      }
    });
    
  });
if(!statusWin){
  let checkZero = a.filter((item) => item == 0);
  console.log(checkZero);
  if (!checkZero.length) {
    Swal.fire({
      title: `Win :No Body`,
      position: "bottom",
      confirmButtonText: "OK",
    }).then((result) => {
      createBox();
    });
  }
}
  
 
}

function playerIcon(value) {
  value == playes[0]
    ? (playerBox.innerHTML = '<i class="fas fa-close close-icon"></i>')
    : (playerBox.innerHTML = '<i class="far fa-circle circle-icon"></i>');
}
