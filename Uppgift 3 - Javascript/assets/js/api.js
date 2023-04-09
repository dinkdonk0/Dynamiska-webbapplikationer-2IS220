export async function getData() {
    const response = await fetch('https://stryk.herokuapp.com/strycket2022');
    const data = await response.json();
    return data;
  }