//Get characters from localStorage
function getCharactersFromStorage() {
    const charactersString = localStorage.getItem("characters");
    console.log("Characters from localStorage:", charactersString);
    return charactersString ? JSON.parse(charactersString) : [];
  }
  
  // Function to render characters on the webpage
  function renderCharacters(characters) {
    const container = document.getElementById("charactersContainer");
    container.innerHTML = ""; // Clear previous characters
  
    characters.forEach((character) => {
      const characterElement = document.createElement("div");
      characterElement.textContent = `${character.name} - ${character.homePlanet}`;
      container.appendChild(characterElement);
    });
  }
  
  // Call renderCharacters with characters from localStorage to display them on page load
  document.addEventListener("DOMContentLoaded", function () {
    const characters = getCharactersFromStorage();
    renderCharacters(characters);
  });
  
  // Save characters to localStorage
  function saveCharactersToStorage(characters) {
    localStorage.setItem("characters", JSON.stringify(characters));
  }
  
  //add a character to localStorage
  function addNewCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage();
    // Check if a character with the same name already exists
    const existingCharacter = characters.find(
      (character) => character.name === name
    );
    if (existingCharacter) {
      // Display an error message if the character already exists
      alert("A character with this name already exists.");
    } else {
      const newCharacter = { id: characters.length + 1, name, homePlanet };
      characters.push(newCharacter);
      saveCharactersToStorage(characters);
      console.log("Character added:", newCharacter);
      renderCharacters(characters); // Render characters on the webpage
    }
  }
  // Event listener for adding a character
  document
    .getElementById("addCharacterBtn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      const name = document.getElementById("characterName").value;
      const homePlanet = document.getElementById("homePlanet").value;
      addNewCharacter(name, homePlanet);
    });
  
  // Update a character in localStorage
  function updateCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === name);
    if (index === -1) {
      // Character not found, display an error message
      alert('Character not found.');
  } else {
      characters[index].homePlanet = homePlanet;
      saveCharactersToStorage(characters); // Save updated characters back to localStorage
      renderCharacters(characters);
  }
  }
  // Event listener for updating a character
  document
    .getElementById("updateCharacterBtn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      const name = document.getElementById("characterName").value;
      const homePlanet = document.getElementById("homePlanet").value;
      updateCharacter(name, homePlanet);
      // Clear the input fields after updating to avoid having to click two times
      document.getElementById("characterName").value = "";
      document.getElementById("homePlanet").value = "";
      // Retrieve updated characters from localStorage and render them
      const updatedCharacters = getCharactersFromStorage();
      renderCharacters(updatedCharacters);
    });
  
  // Delete a character from localStorage
  function removeCharacter(name) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === name);
    if (index === -1) {
      // Character not found, display an error message
      alert('Character not found.');
  } else {
      characters.splice(index, 1);
      saveCharactersToStorage(characters); // Save updated characters back to localStorage
      renderCharacters(characters);
  }
  }
  
  // Event listener for delete button
  document
    .getElementById("deleteBtn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      const name = document.getElementById("characterName").value;
      removeCharacter(name);
      // Clear the input fields after deletion
      document.getElementById("characterName").value = "";
      document.getElementById("homePlanet").value = "";
    });
  