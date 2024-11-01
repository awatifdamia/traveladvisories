document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById('btnCreateEntry');
  const btnRead = document.getElementById('btnReadEntry');
  const btnDelete = document.getElementById('btnDeleteEntry');
  const btnUpdate = document.getElementById('btnUpdateEntry');
  const savedEntriesList = document.getElementById('savedEntriesList');
  const fileContentDisplay = document.getElementById('fileContentDisplay');

  // New form elements for itinerary details
  const titleInput = document.getElementById('title');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const descriptionInput = document.getElementById('description');
  const activitiesInput = document.getElementById('activities');

  // Create an itinerary entry
  btnCreate.addEventListener('click', () => {
    const entryData = {
      title: titleInput.value,
      date: dateInput.value,
      time: timeInput.value,
      description: descriptionInput.value,
      activities: activitiesInput.value,
    };

    localStorage.setItem(entryData.title, JSON.stringify(entryData));
    alert(`Itinerary "${entryData.title}" has been saved.`);
    updateSavedEntriesList();
    clearForm();
  });

  // Read an itinerary entry
  btnRead.addEventListener('click', () => {
    const savedData = JSON.parse(localStorage.getItem(titleInput.value));
    if (savedData) {
      dateInput.value = savedData.date;
      timeInput.value = savedData.time;
      descriptionInput.value = savedData.description;
      activitiesInput.value = savedData.activities;
      displayEntryContent(savedData);
    } else {
      alert("No itinerary found with that title.");
    }
  });

  // Update an itinerary entry
  btnUpdate.addEventListener('click', () => {
    const entryTitle = titleInput.value.trim();
    if (!entryTitle) {
      alert("Please enter a title for the itinerary.");
      return;
    }

    const entryData = {
      title: entryTitle,
      date: dateInput.value,
      time: timeInput.value,
      description: descriptionInput.value,
      activities: activitiesInput.value,
    };

    localStorage.setItem(entryTitle, JSON.stringify(entryData));
    alert(`Itinerary "${entryTitle}" has been updated.`);
    updateSavedEntriesList();
    clearForm();
  });

  // Delete an itinerary entry
  btnDelete.addEventListener('click', () => {
    const entryTitle = titleInput.value.trim();
    if (!entryTitle) {
      alert("Please enter a title to delete the itinerary.");
      return;
    }

    localStorage.removeItem(entryTitle);
    alert(`Itinerary "${entryTitle}" has been deleted.`);
    updateSavedEntriesList();
    clearForm();
  });

  // Function to update the list of saved entries
  function updateSavedEntriesList() {
    savedEntriesList.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const li = document.createElement('li');
      li.textContent = key;

      // Display content when clicking a list item
      li.addEventListener('click', () => {
        const savedData = JSON.parse(localStorage.getItem(key));
        displayEntryContent(savedData);
      });

      savedEntriesList.appendChild(li);
    }
  }

  // Function to show itinerary content in display area
  function displayEntryContent(entryData) {
    fileContentDisplay.innerHTML = `
      <h3>${entryData.title}</h3>
      <p><strong>Date:</strong> ${entryData.date}</p>
      <p><strong>Time:</strong> ${entryData.time}</p>
      <p><strong>Description:</strong> ${entryData.description}</p>
      <p><strong>Activities:</strong> ${entryData.activities}</p>
    `;
  }

  // Clear the form fields
  function clearForm() {
    titleInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    descriptionInput.value = "";
    activitiesInput.value = "";
  }

  // Initialize the saved entries list on page load
  updateSavedEntriesList();
});


// Home button navigation
document.getElementById("home-button").addEventListener("click", function() {
  window.location.href = "index.html"; // Change to your homepage URL
});

// Itinerary button navigation
document.getElementById('itinerary-button').addEventListener('click', function() {
  window.location.href = "itinerary.html";
});
