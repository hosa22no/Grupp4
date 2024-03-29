const BASE_URL = 'https://da-demo.github.io/api/futurama/'

const API_URLS = {
    characters: `${BASE_URL}characters`,
    episodes: `${BASE_URL}episodes`
   
};

async function getJson(url){
    const response = await fetch(url);

   return await response.json()
}


const API = {
    async getCharacters(start = 0, end = 20) {
        return await getJson(API_URLS.characters, start, end);
    },

    async getEpisodes(start = 0, end = 10) {
        return await getJson(API_URLS.episodes, start, end);
    },

    async saveCharacters(characters) {
        localStorage.setItem('characters', JSON.stringify(characters));
    },

    async addCharacter(character) {
        let characters = await this.getCharacters(); // "this" refers to the API object
    
        // Generate a unique ID for the character
        const uniqueId = this.generateUniqueId();
    
        // Add the unique ID to the character object
        character.id = uniqueId;
    
        // Check if character with the same ID already exists
        const characterExists = characters.some(char => char.id === character.id);
    
        // If character with the same ID doesn't exist, add it
        if (!characterExists) {
            characters.push(character);
            await this.saveCharacters(characters);
        } else {
            console.log('Character with the same ID already exists.');
        }
    },
    
    generateUniqueId() {
        const timestamp = Date.now(); // Get current timestamp
        const random = Math.floor(Math.random() * 1000000); // Generate random number
        return `${timestamp}-${random}`; // Combine timestamp and random number
    }
};



API.getCharacters()
    .then(characters => {
        // Process charactersData as needed
        console.log(characters); // Example: logging charactersData
    })
    .catch(error => {
        // Handle errors if any
        console.error("Error fetching characters:", error);
    });

    API.getEpisodes()
    .then(episodes => {
        // Process charactersData as needed
        console.log(episodes); // Example: logging charactersData
    })
    .catch(error => {
        // Handle errors if any
        console.error("Error fetching characters:", error);
    });

function setDelayTimer() {
    setTimeout(function() {location.reload();
    }, 1000); 
        
}
