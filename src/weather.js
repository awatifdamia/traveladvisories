async function displayWeather() {
    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');
  
    if (country) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${country}`);
  
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
  
            const data = await response.json();
            console.log('Weather Data:', data); // Log the data to inspect structure
  
            // Check if location and current data exist
            if (data && data.location && data.current) {
              const temperature = data.current.temp_c;
              const clothingRecommendation = getClothingRecommendation(temperature);
              const clothingImage = getClothingImage(temperature);
              const weatherIconUrl = data.current.condition.icon.startsWith('//') 
                  ? 'https:' + data.current.condition.icon 
                  : data.current.condition.icon;
          
                  document.getElementById('weather-info').innerHTML = `
                  <h2>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
                  <p>Local Time: ${data.location.localtime}</p>
                  <p class="temperature">${temperature}°C</p>
                  <p class="feels-like">Feels like: ${data.current.feelslike_c}°C</p>
                  <p class="condition">${data.current.condition.text}</p>
                  <img class="weather-icon" src="${weatherIconUrl}" alt="Weather Icon">
                  <div class="additional-info">
                      <p>Wind Speed: ${data.current.wind_kph} kph</p>
                      <p>Humidity: ${data.current.humidity}%</p>
                      <p>Sunrise: ${data.forecast?.forecastday[0]?.astro?.sunrise || 'N/A'}</p>
                      <p>Sunset: ${data.forecast?.forecastday[0]?.astro?.sunset || 'N/A'}</p>
                  </div>
                  <button class="clothing-button" onclick="openClothingModal('${clothingImage}', '${clothingRecommendation}')">Show Clothing Recommendation</button>
              `;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>Weather data not available for ${country}</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>Error loading weather data: ${error.message || error}</p>`;
        }
    } else {
        document.getElementById('weather-info').innerHTML = `<p>No country specified.</p>`;
    }
  }
  
  // Function to open the modal
  function openClothingModal(clothingImage, clothingRecommendation) {
    const modal = document.getElementById('clothingModal');
    modal.style.display = "block"; // Ensure this sets display to block
    document.getElementById('modal-image').src = clothingImage;
    document.getElementById('modal-description').textContent = clothingRecommendation;
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('clothingModal');
    modal.style.display = "none"; // Hide the modal
  }
  
  // Event listener to close modal when the close button is clicked
  document.querySelector('.close').onclick = closeModal;
  
  // Event listener to close modal when clicking outside the modal
  window.onclick = function(event) {
    const modal = document.getElementById('clothingModal');
    if (event.target == modal) {
        closeModal();
    }
  };
  
  // Call displayWeather when the page loads
  window.onload = displayWeather;
  
  function goBackToHome() {
    window.location.href = "index.html";
  }
  
  // Functions to get clothing recommendations and images based on temperature
  function getClothingRecommendation(temperature) {
    if (temperature < 0) {
        return "Brace for the chill! Layer up with a heavy winter coat, insulated gloves, and a thick scarf. Consider a fleece-lined hat and sturdy winter boots to protect against the biting cold. Thermal layers underneath can also keep you extra warm.";
    } else if (temperature >= 0 && temperature < 10) {
        return "It is chilly outside, so bundle up with a warm jacket, like a parka or down coat, paired with layers like sweaters or hoodies. A cozy scarf and a wool hat will help retain warmth, and insulated gloves are a good idea if it is windy.";
    } else if (temperature >= 10 && temperature < 20) {
        return "Mildly cool weather calls for a light jacket or sweater. You can wear comfortable layers such as shirts or hoodies underneath and pair them with jeans or trousers. A scarf can add warmth, but it is optional depending on the wind.";
    } else if (temperature >= 20 && temperature < 30) {
        return "Nice and warm! Casual clothes like a T-shirt with jeans or shorts work well. Choose breathable fabrics, and keep a light jacket or cardigan on hand if it cools down in the evening.";
    } else {
        return "Stay cool and comfortable with light, airy clothes. Opt for shorts, T-shirts, or flowy dresses. Sunglasses, a wide-brim hat, and sunscreen are essential to protect against the sun's heat.";
    }
  }
  
  function getClothingImage(temperature) {
    if (temperature < 0) {
        return "./images/winter.jpg"; // Replace with actual image path
    } else if (temperature >= 0 && temperature < 10) {
        return "./images/chilly.jpeg"; // Replace with actual image path
    } else if (temperature >= 10 && temperature < 20) {
        return "./images/cool.jpg"; // Replace with actual image path
    } else if (temperature >= 20 && temperature < 30) {
        return "./images/warm.jpeg"; // Replace with actual image path
    } else {
        return "./images/summer.jpeg"; // Replace with actual image path
    }
  }
  document.getElementById("home-button").addEventListener("click", function() {
    window.location.href = "index.html"; // Change this to your homepage URL
  });
  