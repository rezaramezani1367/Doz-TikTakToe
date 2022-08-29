const mainBox = document.querySelector(".main-box");
const box = document.getElementsByClassName("box");
let statusWin = false;
let suggestComputer = { you: [], computer: [] };
let typeWin = Object.keys(suggestComputer);
let winner = "";

//console.log(box);
let a = [];
let winState = [
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
  a = [];
  suggestComputer = { you: [], computer: [] };
  let temp = "";
  statusWin = false;
  winner = "";
  for (let i = 0; i < 9; i++) {
    a.push(0);
    temp += `<div onclick="change(${i})" class="box"></div>`;
  }
  mainBox.innerHTML = temp;
}

//<i class="far fa-circle circle-icon"></i>
//<i class="far fa-close close-icon"></i>
window.addEventListener("load", createBox);

function change(index) {
  //console.log(index);
  if (a[index] === 0) {
    box[index].innerHTML = `<i class="fas fa-close close-icon"></i>`;
    a[index] = 1;
    win(index, typeWin[0]);

    if (winner != "you") {
      selectComputer();
    }
    // checkTwoElement(index);
  }
}

function selectComputer() {
  let b = [];
  a.forEach((item, index) => {
    if (item == 0) {
      b.push(index);
    }
  });
  if (b.length) {
    let randomComputer = b[Math.floor(Math.random() * b.length)];
    // if(a[4] == 0){
    //   randomComputer = 4;
    // }
    // else
    let count=0;
    if (suggestComputer.computer.length) {
      for (let i = 0; i < suggestComputer.computer.length; i++) {
        if (a[suggestComputer.computer[i]] == 0) {
          randomComputer = suggestComputer.computer[i];
          suggestComputer.computer.splice(i, 1);
          count++;
          break;
        } else {
          suggestComputer.computer.splice(i, 1);
        }
      }
    } 
      if (suggestComputer.you.length && count==0) {
      console.log("you")
      for (let i = 0; i < suggestComputer.you.length; i++) {
        if (a[suggestComputer.you[i]] == 0) {
          randomComputer = suggestComputer.you[i];
          suggestComputer.you.splice(i, 1);
          break;
        } else {
          suggestComputer.you.splice(i, 1);
        }
      }
    }
    //console.log(b)
    box[randomComputer].innerHTML = `<i class="far fa-circle circle-icon"></i>`;
    a[randomComputer] = 2;
    win(randomComputer, typeWin[1]);
    console.log(suggestComputer);
  }
  // console.log(a);
}

function win(index, typeWin) {
  let result = [];
  winState.forEach((item) => {
    item.forEach((x) => {
      if (x === index) {
        result.push(item);
      }
    });
  });
  result.forEach((item) => {
    let count = 0;
    //console.log(item)
    item.forEach((x) => {
      //console.log(x)
      if (a[x] === a[index]) {
        count++;
      }
    });
    switch (count) {
      case 2:
        item.forEach((x) => {
          if (a[x] == 0) {
            typeWin == "computer"
              ? suggestComputer.computer.push(x)
              : suggestComputer.you.push(x);
          }

        });

        break;
      case 3:
        statusWin = true;
        typeWin == "you" ? (winner = "you") : "";
        item.forEach((x) => {
          box[x].style.background = "#cc2";
        });
        console.log("win " + typeWin);
        Swal.fire({
          title: `win : ${typeWin}`,
          position: "top-end",

          confirmButtonText: "OK",
        }).then((result) => {
          createBox();
        });
        break;
    }
  });

  if (!statusWin) {
    let z = a.filter((x) => x == 0);
    if (!z.length) {
      Swal.fire({
        title: `win : NoBody`,
        position: "top-end",
        confirmButtonText: "OK",
      }).then((result) => {
        createBox();
      });
    }
  }
}
