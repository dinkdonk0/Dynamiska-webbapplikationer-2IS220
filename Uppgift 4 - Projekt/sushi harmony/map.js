function initMap() {
    // Platskoordinater för restaurangen
    var restaurantLocation = { lat: 59.8575, lng: 17.6479 };
  
    // Skapar  karta och centrerar den vid restaurangen
    var map = new google.maps.Map(document.getElementById('map'), {
      center: restaurantLocation,
      zoom: 14 
    });
  
    // Placerar en markör vid restaurangen
    var marker = new google.maps.Marker({
      position: restaurantLocation,
      map: map,
      title: 'Sushi Harmony'
    });
  }


