// Function to fetch characters from the API
async function fetchAndDisplayCharacters() {
    try {
        const response = await fetch('https://da-demo.github.io/api/futurama/characters');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiCharacters = await response.json();
        
        // Fetch characters from localStorage
        const localCharacters = getCharactersFromStorage();

        // Transform localStorage characters to match the API structure and avoid the error message TypeError: Cannot read properties of undefined (reading 'main')
        const transformedLocalCharacters = localCharacters.map(character => ({
            name: character.name,
            homePlanet: character.homePlanet,
            images: { main: 'default-image-url' } // Assuming you want a default image for local characters
        }));

        // Combine API characters with transformed local characters
        const characters = [...apiCharacters, ...transformedLocalCharacters];

        // Hide the loading indicator when the data is fetched
        document.getElementById('loadingIndicator').style.display = 'none'; 
        displayCharacters(characters);
    } catch (error) {
        console.error('Fetch error:', error);
        // Hide the loading indicator when there is an error
        document.getElementById('loadingIndicator').style.display = 'none';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Ett fel uppstod när data skulle hämtas. Försök igen senare.';
        // Adding errormessage to the errorMessages div
        document.getElementById('errorMessages').appendChild(errorMessage);
    }
}

// Function to display characters
function displayCharacters(characters) {
    const characterList = document.getElementById('character-list');
    characters.forEach(character => {
        const listItem = document.createElement('li');

        //Fetching the image of each character
        const img = document.createElement('img');
        img.src = character.images.main; // Main property for the image URL
        img.alt = character.name; // Character's name as the alt text
        img.addEventListener('click', () => showCharacterInfo(character)); // Add click event listener to show character info
        listItem.appendChild(img);

        // Fetching the character's full name, occupation and home planet
        const fullNameAndDetails = `${character.name.first} ${character.name.middle} ${character.name.last} - Home Planet: ${character.homePlanet}, Occupation: ${character.occupation}`;
        const nameAndDetailsText = document.createElement('p');
        nameAndDetailsText.textContent = fullNameAndDetails;
        listItem.appendChild(nameAndDetailsText);

        characterList.appendChild(listItem);
    });
}

// Function to fetch characters from localStorage
function getCharactersFromStorage() {
    const charactersString = localStorage.getItem('characters');
    console.log('Characters from localStorage:', charactersString);
    return charactersString ? JSON.parse(charactersString) : [];
    
}

// Function to save characters to localStorage
function saveCharactersToStorage(characters) {
    localStorage.setItem('characters', JSON.stringify(characters));
}

// Function to add a character
function addCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage();
    const newCharacter = { id: characters.length + 1, name, homePlanet };
    characters.push(newCharacter);
    saveCharactersToStorage(characters);
    console.log('Character added:', newCharacter);
}

    // Function to handle form submission
    document.getElementById('characterForm').addEventListener('submit', function(event) {
        console.log('Form submitted');
        event.preventDefault(); // Prevent form submission
        const nameInput = document.getElementById('name');
        const homePlanetInput = document.getElementById('homePlanet');
        const name = nameInput.value;
        const homePlanet = homePlanetInput.value;
        addCharacter(name, homePlanet);
        nameInput.value = ''; // Clear input fields after submission
        homePlanetInput.value = '';
      });

       // Function to delete a character by name
       function deleteCharacterByName(name) {
        const characters = getCharactersFromStorage();
        const updatedCharacters = characters.filter(character => character.name !== name);
        saveCharactersToStorage(updatedCharacters);
        console.log('Character with name', name, 'deleted.');
    }
  
      // When clicking the delete button
      document.getElementById('deleteButton').addEventListener('click', function() {
        const characterNameToDelete = document.getElementById(characterName);
        deleteCharacterByName(characterNameToDelete);
      });

// Call fetchAndDisplayCharacters to load characters from API and display them
fetchAndDisplayCharacters();
