document.addEventListener('DOMContentLoaded', function () {

  // Função para carregar os scores do localStorage e exibi-los no ranking
  function loadScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Se houver mais de 10 scores, mantém apenas os 10 melhores
    scores = scores.slice(0, 10);

    const table = document.querySelector('.table');
    table.innerHTML = ''; // Limpa qualquer conteúdo anterior

    scores.forEach((score, index) => {
      const row = document.createElement('div');
      row.classList.add('row');

      const placeCell = document.createElement('div');
      placeCell.classList.add('cell');
      placeCell.textContent = `${index + 1}º`;
      row.appendChild(placeCell);

      const nameCell = document.createElement('div');
      nameCell.classList.add('cell');
      nameCell.textContent = score.name;
      row.appendChild(nameCell);

      const scoreCell = document.createElement('div');
      scoreCell.classList.add('cell');
      scoreCell.textContent = score.score;
      row.appendChild(scoreCell);

      table.appendChild(row);
    });
  }

  function addPlayerToRanking(playerData) {
    let ranking = localStorage.getItem('ranking');
    ranking = ranking ? JSON.parse(ranking) : [];

    ranking.push(playerData);

    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  function populateRanking() {
    let ranking = localStorage.getItem('ranking');
    ranking = ranking ? JSON.parse(ranking) : [];

    const table = document.querySelector('.table');
    table.innerHTML = '';

    ranking.forEach((player, index) => {
      const row = document.createElement('div');
      row.classList.add('row');

      const place = document.createElement('div');
      place.classList.add('cell');
      place.textContent = (index + 1) + 'º';
      row.appendChild(place);

      const name = document.createElement('div');
      name.classList.add('cell');
      name.textContent = player.name;
      row.appendChild(name);

      const points = document.createElement('div');
      points.classList.add('cell');
      points.textContent = player.score;
      row.appendChild(points);

      table.appendChild(row);
    });
  }

  populateRanking();

  // Chama a função para carregar os scores quando a página carregar
  window.onload = loadScores;

  const submitButton = document.querySelector('button');
  submitButton.addEventListener('click', function () {
    const playerName = document.getElementById('player-name').value;
    const totalCards = 20;
    const remainingTime = parseInt(document.querySelector('.time-circle p').textContent);
    const score = totalCards + remainingTime;

    // Adicione a pontuação e o nome do jogador ao ranking
    const playerData = { name: playerName, score: score };
    addPlayerToRanking(playerData);

    // Atualiza a tabela de ranking
    populateRanking();
  });
});
