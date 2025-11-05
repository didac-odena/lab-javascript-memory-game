const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

// Bind the click event of each element to a function
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    // 0. si ya hay 2 cartas en juego, no dejamos clicar más
    if (memoryGame.pickedCards.length === 2) return;

    // 1. girar
    card.classList.add("turned");

    // 2. guardar
    memoryGame.pickedCards.push(card);

    // 3. si solo hay 1, no hacemos nada más
    if (memoryGame.pickedCards.length !== 2) return;

    // 4. ya hay 2, las sacamos
    const firstCard = memoryGame.pickedCards[0];
    const secondCard = memoryGame.pickedCards[1];

    const firstName = firstCard.getAttribute("data-card-name");
    const secondName = secondCard.getAttribute("data-card-name");

    const isPair = memoryGame.checkIfPair(firstName, secondName);

    // 5. actualizar marcador
    document.querySelector("#pairs-clicked").textContent = memoryGame.pairsClicked;
    document.querySelector("#pairs-guessed").textContent = memoryGame.pairsGuessed;

    // 6. actuar según sea pareja o no
    if (isPair) {
      // no quitamos .turned
      memoryGame.pickedCards = [];     // vaciamos para poder seguir
      // aquí podrías mirar si ha terminado:
      if (memoryGame.checkIfFinished()) {
        alert("You won!");
      }
    } else {
      // esperar un poco y girarlas de nuevo
      setTimeout(() => {
        firstCard.classList.remove("turned");
        secondCard.classList.remove("turned");
        memoryGame.pickedCards = [];   // ahora sí, listo para el siguiente turno
      }, 800);
    }
  });
});
})


//**algo como:
// si es pareja:  */