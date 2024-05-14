const images = ['csharp.png', 'excel.png', 'html.png', 'illustrator.png', 'js.png', 'photoshop.png', 'pp.png', 'premiere.png', 'win11.png', 'word.png'];

let cards = images.concat(images); // Duplica as imagens para formar os pares
let flippedCards = [];
let matchedCards = [];
let timer; // Variável para armazenar o 

function buttonJogar() {
  window.location.href = "game.html";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  cards = shuffle(cards);
  const grid = document.querySelector('.memory-grid');
  grid.innerHTML = ''; // Limpa qualquer conteúdo anterior

  cards.forEach((card, index) => {
    const square = document.createElement('div');
    square.classList.add('memory-square');
    square.setAttribute('data-index', index);
    square.addEventListener('click', () => flipCard(square));

    // Adiciona a parte de trás da carta com a imagem da logo
    const back = document.createElement('div');
    back.classList.add('back');
    square.appendChild(back);

    // Adiciona a parte da frente da carta com a imagem do par
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${card})`;
    square.appendChild(front);

    grid.appendChild(square);
  });

  // Inicia o contador regressivo
  startTimer();
}


function flipCard(card) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
    flippedCards.push(card);
    card.classList.add('flipped');

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  } else if (flippedCards.includes(card)) {
    card.classList.remove('flipped');
    flippedCards = flippedCards.filter(item => item !== card);
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (cards[firstCard.dataset.index] === cards[secondCard.dataset.index]) {
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      clearInterval(timer); // Para o contador quando o jogo é vencido

      window.location.href = 'pontos.html';

      // Calcula a pontuação com base na quantidade de cartas e no tempo restante
      const totalCards = 20; // Altere conforme o número total de cartas no seu jogo
      const remainingTime = parseInt(document.querySelector('.time-circle p').textContent);
      const score = totalCards + remainingTime;

      // Obtém os scores salvos no localStorage ou inicializa um array vazio
      let scores = JSON.parse(localStorage.getItem('scores')) || [];

      // Obtém o nome do jogador
      const playerName = document.getElementById('player-name').value;

      // Adiciona o novo score ao array de scores
      scores.push({ name: playerName, score: score });

      // Ordena os scores do melhor para o pior
      scores.sort((a, b) => b.score - a.score);

      // Salva os scores atualizados no localStorage
      localStorage.setItem('scores', JSON.stringify(scores));

      // Redireciona para a página de pontos

    }

  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 500);
  }
}

function startTimer() {
  let seconds = 60; // Tempo inicial de 60 segundos

  timer = setInterval(() => {
    seconds--;
    document.querySelector('.time-circle p').textContent = `${seconds}s`;

    if (seconds === 0) {
      clearInterval(timer); // Para o contador quando o tempo acabar
      window.location.href = 'pontos.html';
    }
  }, 1000);
}

startGame();