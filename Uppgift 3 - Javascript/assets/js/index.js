import { getData } from "./api.js";

const originalTable = document.getElementById('table');
//skapa nytt table element 
const newTable = document.createElement('table');
//skapar table header med samma struktur som originaltable
const headerRow = document.createElement('tr');
const headerCells = [
  document.createElement('th'),
  document.createElement('th'),
  document.createElement('th'),
  document.createElement('th'),
  document.createElement('th'),
];
headerCells[0].textContent = 'Rad:';
headerCells[1].textContent = 'Lag:';
headerCells[2].textContent = '1';
headerCells[3].textContent = 'X';
headerCells[4].textContent = '2';
headerRow.append(...headerCells);
newTable.appendChild(headerRow);

// Fetchar data från API
getData()
  .then(data => {
    //skapar en ny rad för varje match och sätter i rätt data och checkmarks
    data.playedGames.forEach((game, index) => {
      const row = document.createElement('tr');
      const numberCell = document.createElement('td');
      numberCell.textContent = index + 1;
      row.appendChild(numberCell);
      //sätter in lagnamn i formatet "Team1 -VS- Team2"
      const teamCell = document.createElement('td');
      const team1Link = `<a href="${game.teams[1].homepage}">${game.teams[1].name}</a>`;
      const team2Link = `<a href="${game.teams[2].homepage}">${game.teams[2].name}</a>`;
      teamCell.innerHTML = `${team1Link} -VS- ${team2Link}`;
      row.appendChild(teamCell);
      //sätter outcome celler med checkmark i rätt position
      for (let i = 1; i <= 3; i++) {
        const outcomeCell = document.createElement('td');
        if (i == 1 && game.outcome == '1') {
          outcomeCell.innerHTML = '<span class="checkmark"><div class="stem"></div><div class="kick"></div></span>';
        } else if (i == 2 && game.outcome == 'X') {
          outcomeCell.innerHTML = '<span class="checkmark"><div class="stem"></div><div class="kick"></div></span>';
        } else if (i == 3 && game.outcome == '2') {
          outcomeCell.innerHTML = '<span class="checkmark"><div class="stem"></div><div class="kick"></div></span>';
        }
        row.appendChild(outcomeCell);
      }
      newTable.appendChild(row);
    });
    // byt original table med nytt table
    originalTable.parentNode.replaceChild(newTable, originalTable);
  })
