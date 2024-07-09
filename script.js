let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "x";

function init() {
  render();
}

function render() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = fields[i];
    cell.addEventListener("click", () => handleCellClick(i));
    container.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (fields[index] !== null) return; // Ignore if cell is already filled

  fields[index] = currentPlayer;
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  render();
}
