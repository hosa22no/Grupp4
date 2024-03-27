

// Function to fetch characters from the API
async function fetchCharacters() {
    try {
        const response = await fetch('https://da-demo.github.io/api/futurama/characters');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const characters = await response.json();
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

function showCharacterInfo(character) {
    // Create a modal (popup)
    const modal = document.createElement('div');
    modal.style.display = 'block'; // Show the modal
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';

    // Add character's image
    const img = document.createElement('img');
    img.src = character.images.main;
    img.alt = `${character.name.first} ${character.name.middle} ${character.name.last}`;
    modalContent.appendChild(img);

    // Add character's name, home planet, and occupation
    const detailsText = document.createElement('p');
    detailsText.textContent = `Name: ${character.name.first} ${character.name.middle} ${character.name.last}, Home Planet: ${character.homePlanet}, Occupation: ${character.occupation}`;
    modalContent.appendChild(detailsText);

    // Adding five randomly generated sentences from the "sayings" property
    const sayingsText = document.createElement('p');
    const sayings = character.sayings; // Array of sayings
    const randomSayings = getRandomSayings(sayings, 5); // Function to get 5 random sayings
    //Adding a line break between each saying
    sayingsText.innerHTML = `Sayings:<br>${randomSayings.join('<br>')}`;
    modalContent.appendChild(sayingsText);

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = () => modal.style.display = 'none'; // Close the modal
    modalContent.appendChild(closeButton);

    // Append modal content to modal and modal to body
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to get random sayings from the sayings property
function getRandomSayings(sayings, count) {
    const randomSayings = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * sayings.length);
        randomSayings.push(sayings[randomIndex]);
    }
    return randomSayings;
}

/*Add new characters to the list but to the API and it doesnt work
document.getElementById('characterForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const homePlanet = document.getElementById('homePlanet').value;
   

    const characterData = {
        name,
        homePlanet
    };

    try {
        const response = await fetch('https://da-demo.github.io/api/futurama/characters', {
            method: 'POST',
            body: JSON.stringify(characterData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`'HTTP error! status:' ${response.status}`);
        }

        const add = await response.json();
        console.log('Added character:', add);
        alert('Character added successfully!');
    } catch (error) {
        console.error('Error adding character:', error);
    }
});*/



fetchCharacters();
