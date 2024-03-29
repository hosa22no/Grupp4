(async () => {
    const characters = await API.getCharacters();
    characters.forEach(addCharacterToFrontPage)
   
})();     
    
    const charactersContainer = document.getElementById("charactersList");
    async function addCharacterToFrontPage(character){
    const characterElement = document.createElement("div");
    const fullName = `${character.name.first} ${character.name.middle} ${character.name.last}`;
        

        characterElement.innerHTML = 
        `<h4>Character Name: ${fullName}</h4><br>
        <h4>Home Planet: ${character.homePlanet}</h4><br>
        <h4>Occupation: ${character.occupation}</h4><br>
        <hr>`

    const characterButton = document.createElement("button");
    characterButton.textContent = "Show Character";
    characterButton.classList.add("open-button")
    


    characterButton.addEventListener("click", () => {
        showSingleCharacter(character);
    })

        characterElement.appendChild(characterButton);
        charactersContainer.appendChild(characterElement);
        
    }


    function showSingleCharacter(character){
        // Stäng tidigare visade characters (visa en i taget)
        const previousCharacter = document.getElementById("single-character");
        if (previousCharacter) {
            previousCharacter.remove();
        }
    
        
        const characterContainer = document.createElement("div");
        characterContainer.id = "single-character";
        const fullName = `${character.name.first} ${character.name.middle} ${character.name.last}`;
        const sayings = character.sayings.slice(0, 5).map(saying => `<li>${saying}</li>`).join("");

        characterContainer.innerHTML = `
            <h4>Character Name: ${fullName}</h4>
            <h4>Age: ${character.age}</h4>
            <h4>Gender: ${character.gender}</h4>
            <h4>Home Planet: ${character.homePlanet}</h4>
            <h4>Occupation: ${character.occupation}</h4>
            <h4>Species: ${character.species}</h4>
            <h4>Images:</h4>
            <img src="${character.images.main}" alt="Character Image" style="width: 150px;">
            <h4>Sayings:<p>
             ${sayings}
             </h4></p>
        `;
    
        // En close knapp för Div:en
        const closeButton = document.createElement("button")
        closeButton.textContent = "Close";
        closeButton.classList.add("close-button");
    
        closeButton.addEventListener("click", () =>{
            characterContainer.remove();
        });
    
        // 
        characterContainer.appendChild(closeButton);
    
        
        document.body.appendChild(characterContainer);
    }

/* ADD A CHARACTER
document.getElementById("addcharacter-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const homePlanet = document.getElementById("homeplanet").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;

    const newCharacter = {
        name: name,
        homePlanet: homePlanet,
        age: age,
        gender: gender
    };

    try {
        await API.addCharacter(newCharacter);

        // Display characters again to reflect the changes
        await API.getCharacters();

        this.innerHTML = "<p><b>Character has been Added!</b></p>";
        setDelayTimer();
    } catch (error) {
        console.log(error);
        this.innerHTML = `<p><b>${error}</b></p>`;
    }
});*/