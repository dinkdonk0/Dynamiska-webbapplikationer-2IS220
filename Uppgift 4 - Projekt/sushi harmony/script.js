// Skapar en klass för att söka efter måltiderna
class MealSearch {
    // Konstruktor tar emot ID för sökinmatning och resultatdiv
    constructor(searchInputId, resultDivId) {
      // Hämta sökinmatning och resultatdiv elementen
      this.searchInput = document.getElementById(searchInputId);
      this.resultDiv = document.getElementById(resultDivId);
    }
  
    // Sök efter måltid och visar resultaten
    searchMeal(meal) {
      // Skapa URL för sökningen
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    
      // Gör en förfrågan till API:et
      fetch(url)
      .then(response => response.json())
      .then(data => {
        // Om inga måltider hittades, visa ett meddelande och avslutabeef
        if(data.meals === null) {
          alert('Inga resultat hittades');
          return;
        }
        
        // Väljer ett slumpmässigt måltid från resultatet
        let mealData = data.meals[Math.floor(Math.random() * data.meals.length)];

        // Visa resultatet i resultatdiven
        this.resultDiv.innerHTML = `
          <h2>${mealData.strMeal}</h2>
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" style="max-width: 300px;">
          <p>${mealData.strInstructions}</p>
        `;
      })
      // Om något går fel, skriv ut felet till konsolen
      .catch(error => {
        console.error('Error:', error);
      });
    }
}

// Skapar en instans av MealSearch klassen
let mealSearch = new MealSearch('search-input', 'result');

// Lägg till en händelselyssnare till sökknappen
// När knappen klickas, sök efter måltiden och visa resultaten
document.getElementById('search-button').addEventListener('click', function() {
    let meal = mealSearch.searchInput.value;
    mealSearch.searchMeal(meal);
});