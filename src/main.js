const fs = require('fs');
const path = require('path');

const btnCreate = document.getElementById('btnCreate');
const btnRead = document.getElementById('btnRead');
const btnDelete = document.getElementById('btnDelete');
const btnUpdate = document.getElementById('btnUpdate');
const fileName = document.getElementById('fileName');
const fileContents = document.getElementById('fileContents');


const pathName = path.join(__dirname, 'Files');

// Create File
btnCreate.addEventListener('click', function() {
  const filePath = path.join(pathName, fileName.value);
  const content = fileContents.value;
  fs.writeFile(filePath, content, (err) => {
    if (err) return console.log(err);
    alert(`${fileName.value} has been created.`);
  });
});

// Read File
btnRead.addEventListener('click', function() {
  const filePath = path.join(pathName, fileName.value);
  fs.readFile(filePath, (err, data) => {
    if (err) return console.log(err);
    fileContents.value = data;
  });
});

// Delete File
btnDelete.addEventListener('click', function() {
  const filePath = path.join(pathName, fileName.value);
  fs.unlink(filePath, (err) => {
    if (err) return console.log(err);
    alert(`${fileName.value} has been deleted.`);
    fileName.value = "";
    fileContents.value = "";
  });
});

// Update File
btnUpdate.addEventListener('click', function() {
    // Make sure to include the .txt extension when building the file path
    const filePath = path.join(pathName, `${fileName.value}.txt`);
    const content = fileContents.value;
  
    // Check if the filename input is empty
    if (!fileName.value) {
      return alert("Please enter a filename to update.");
    }
  
    // Write the updated content to the file
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        return console.error("Failed to update the file:", err); // Log error if any
      }
      alert(`${fileName.value} has been updated.`);
    });
  });

function searchWeather() {
  const countryDropdown = document.getElementById('countryDropdown');
  const selectedCountry = countryDropdown.value; // Get the selected country

  if (selectedCountry) {
      // Redirect to weather.html with the selected country as a query parameter
      window.location.href = `weather.html?country=${selectedCountry}`;
  } else {
      alert('Please select a country!'); // Alert if no country is selected
  }
}

function goToWeatherPage(country) {
  // Redirect to the weather page with the selected country as a query parameter
  window.location.href = `${country}.html?country=${country}`;
}


document.getElementById("home-button").addEventListener("click", function() {
  window.location.href = "index.html"; // Change this to your homepage URL
});

document.getElementById('itinerary-button').addEventListener('click', function() {
    mainWindow.loadFile(path.join(__dirname, 'itinerary.html'));
});

document.getElementById('update-button').addEventListener('click', function() {
    // Retrieve the current entry from local storage
    let currentEntry = localStorage.getItem('itineraryEntry');
    
    // Prompt the user for the updated entry
    let updatedEntry = prompt("Update your entry:", currentEntry);

    // Check if the user provided an update
    if (updatedEntry !== null) {
        // Save the updated entry back to local storage
        localStorage.setItem('itineraryEntry', updatedEntry);
        alert("Entry updated!");
    }
});

function displayItinerary() {
    const itineraryDisplay = document.getElementById('itinerary-display');
    itineraryDisplay.innerHTML = localStorage.getItem('itineraryEntry') || "No entries found.";
}

// Call this function after adding or updating an entry
displayItinerary();