//Get characters from localStorage
function getCharactersFromStorage() {
    const charactersString = localStorage.getItem('characters');
    console.log('Characters from localStorage:', charactersString);
    return charactersString ? JSON.parse(charactersString) : [];
}


//add a character to localStorage
function addCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage();
    const newCharacter = { id: characters.length + 1, name, homePlanet };
    characters.push(newCharacter);
    saveCharactersToStorage(characters);
    console.log('Character added:', newCharacter);
}

// Update the characters in localStorage
function updateCharacter(name, homePlanet) {
    const index = characters.findIndex(character => character.name === name);
    if (index !== -1) {
       characters[index].homePlanet = homePlanet;
       localStorage.setItem('characters', JSON.stringify(characters));
    }
   }

   // Delete a character from localStorage
   function removeCharacter(name) {
    const index = characters.findIndex(character => character.name === name);
    if (index !== -1) {
       characters.splice(index, 1);
       localStorage.setItem('characters', JSON.stringify(characters));
    }
   }
   