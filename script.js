let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross";
let gameEnd = 0;

const crossSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80">
  <style>
    .line {
      stroke-dasharray: 28;
      stroke-dashoffset: 28;
      animation: draw 1s forwards;
    }
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  </style>
  <line class="line" x1="2" y1="2" x2="22" y2="22" stroke="#ffaa00" stroke-width="2"/>
  <line class="line" x1="22" y1="2" x2="2" y2="22" stroke="#ffaa00" stroke-width="2"/>
</svg>
`;

const circleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80">
  <style>
    .circle {
      stroke-dasharray: 63;
      stroke-dashoffset: 63;
      animation: draw 1s forwards;
    }
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  </style>
  <circle class="circle" cx="12" cy="12" r="10" stroke="#00aaff" stroke-width="2" fill="none"/>
</svg>
`;

function renderCell(index) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (fields[index] !== null) {
    cell.innerHTML = fields[index] === "cross" ? crossSVG : circleSVG;
    cell.classList.add(fields[index]);
  }
  cell.addEventListener("click", () => handleCellClick(index));
  return cell;
}

function render() {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear previous content

  for (let i = 0; i < 9; i++) {
    content.appendChild(renderCell(i));
  }

  const playerElement = document.getElementById("player");
  playerElement.innerHTML = ""; // Clear previous content
  playerElement.innerHTML = currentPlayer === "cross" ? crossSVG : circleSVG;
  playerElement.className = currentPlayer;
}

function handleCellClick(index) {
  if (fields[index] !== null || gameEnd === 1) return; // Ignore if cell is already filled

  fields[index] = currentPlayer;

  currentPlayer = currentPlayer === "cross" ? "circle" : "cross";

  // Update only the clicked cell and the current player display
  const content = document.getElementById("content");
  content.replaceChild(renderCell(index), content.childNodes[index]);

  const playerElement = document.getElementById("player");
  playerElement.innerHTML = ""; // Clear previous content
  playerElement.innerHTML = currentPlayer === "cross" ? crossSVG : circleSVG;
  playerElement.className = currentPlayer;

  if (checkWin()) {
    displayMessage(`${currentPlayer === "cross" ? "x" : "o"} gewinnt!`);
    gameEnd = 1;
    return;
  } else if (fields.every((field) => field !== null)) {
    displayMessage("Unentschieden!");
    return;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]
    );
  });
}

function displayMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

function init() {
  render();
}
