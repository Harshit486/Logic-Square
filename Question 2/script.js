function findCaliforniaCafes(searchTerm) {
  const cafes = [
    { "name": "Ashley's Cafe", "place_id": "12hydbdf76sljfts87sbfis" },
    { "name": "Avenue Bakery Cafe", "place_id": "jahgde7wgdiau8ewsahgosd" },
    { "name": "Avenue Cafe", "place_id": "skjd86svvfdrsv55svbvf3f" },
    { "name": "Bazaar Cafe", "place_id": "kjk234g4gcvfx8usg1l33pi" },
    { "name": "California Chicken Cafe", "place_id": "12hydbdf76sljfts87sbfis" },
    { "name": "Hi-Lo Cafe", "place_id": "mjdhgetr4pojfyts22fzfsh" },
    { "name": "Philz Coffee", "place_id": "urhw3837ehalod7w02b7835" }
  ];

  const places = [
    { "id": "12hydbdf76sljfts87sbfis", "street_no": "1B", "locality": "Macarthur Blvd", "postal_code": "20619", "lat": "38.1781 N", "long": "118.4171 W" },
    { "id": "jahgde7wgdiau8ewsahgosd", "street_no": "60H", "locality": "Solomos Island Road", "postal_code": "20688", "lat": "36.7783 N", "long": "119.4179 W" },
    { "id": "kjk234g4gcvfx8usg1l33pi", "street_no": "45250", "locality": "Worth Avenue, Unit A", "postal_code": "20619", "lat": "36.1152", "long": "117.521" },
    { "id": "saswe3s6yydtdr52hsd72yst", "street_no": "1X", "locality": "Macarthur Blvd", "postal_code": "20687", "lat": "36.7783", "long": "119.4179" },
    { "id": "skjd86svvfdrsv55svbvf3f", "street_no": "7S", "locality": "Three Notch Road", "postal_code": "20619", "lat": "36.83", "long": "119.6" },
    { "id": "mjdhgetr4pojfyts22fzfsh", "street_no": "22803", "locality": "Gunston Dr Lexington Park", "postal_code": "20688", "lat": "35.7788", "long": "119.979" },
    { "id": "urhw3837ehalod7w02b7835", "street_no": "225", "locality": "Macarthur Blvd", "postal_code": "20687", "lat": "35.77813", "long": "119.41791" }
  ];

  const results = [];

  for (const cafe of cafes) {
    const matchingPlaces = places.filter(place => place.id === cafe.place_id);
    if (matchingPlaces.length > 0 && cafe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        name: cafe.name,
        ...matchingPlaces[0]
      });
    }
  }

  return results;
}

function displayResults(results) {
  const outputContainer = document.getElementById('output');
  outputContainer.innerHTML = '';

  if (results.length === 0) {
    outputContainer.innerHTML = '<p>No matching cafes found.</p>';
    return;
  }

  results.forEach(cafe => {
    const cafeCard = document.createElement('div');
    cafeCard.classList.add('cafe-card');

    const cafeName = document.createElement('div');
    cafeName.classList.add('cafe-name');
    cafeName.textContent = cafe.name;

    const address = document.createElement('div');
    address.classList.add('address');
    address.textContent = `${cafe.street_no}, ${cafe.locality}, ${cafe.postal_code}`;

    const latLong = document.createElement('div');
    latLong.classList.add('lat-long');
    latLong.textContent = `Latitude: ${cafe.lat}, Longitude: ${cafe.long}`;

    cafeCard.appendChild(cafeName);
    cafeCard.appendChild(address);
    cafeCard.appendChild(latLong);

    outputContainer.appendChild(cafeCard);
  });
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const results = findCaliforniaCafes(searchTerm);
  displayResults(results);
});


const initialResults = findCaliforniaCafes('');
displayResults(initialResults);
