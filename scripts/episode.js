document.addEventListener('DOMContentLoaded', function () {

    (async () => {
        const episodesFromAPI = await API.getEpisodes();
        console.log('Episodes from API:', episodesFromAPI); // L�gg till denna logg

        let episodesFromLocalStorage = JSON.parse(localStorage.getItem('episodes')) || [];
        console.log('Episodes from LocalStorage:', episodesFromLocalStorage); // L�gg till denna logg

        // Kombinera avsnitten fr�n API:et och local storage
        const allEpisodes = [...episodesFromLocalStorage, ...episodesFromAPI];
        console.log(allEpisodes);
        // Sortera den kombinerade arrayen
        const sortedEpisodes = sortEpisodes(allEpisodes);

        // Rendera de sorterade avsnitten
        sortedEpisodes.forEach(addEpisodeToFrontPage);
    })();

    const episodesContainer = document.getElementById("episodesList");
    //window.addEventListener('DOMContentLoaded', renderEpisodes);

    async function addEpisodeToFrontPage(episode) {
        const episodeElement = document.createElement("div");

        const episodeNumber = parseInt(episode.number.split(" ")[0]);
        let season = "";
        let episodeNumberInSeason = 0;

        if (!episode.title || !episode.season || !episode.number) {
            const { season: calculatedSeason, episodeNumberInSeason: calculatedEpisode } = calculateSeasonAndEpisode(episodeNumber);
            season = calculatedSeason;
            episodeNumberInSeason = calculatedEpisode;
        } else {
            season = episode.season;
            episodeNumberInSeason = episode.number;
        }

        episodeElement.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Season: ${season}</h4>
        <h4>Episode: ${episodeNumberInSeason}</h4>
        <hr>`;

        const episodeButton = document.createElement("button");
        episodeButton.textContent = "Show Episode";
        episodeButton.classList.add("open-button");

        episodeButton.addEventListener("click", () => {
            showSingleEpisode(episode);
        });

        episodeElement.appendChild(episodeButton);

        // Kontrollera om avsnittet �r sparad i localstorage och l�gg till uppdateringsknappen endast f�r dessa avsnitt
        const isInLocalStorage = JSON.parse(localStorage.getItem('episodes') || '[]').some(localEpisode => localEpisode.title === episode.title && localEpisode.season === episode.season && localEpisode.number === episode.number);
        // Skapa en uppdateringsknapp f�r varje avsnitt om det finns i local storage
        if (isInLocalStorage) {
            const updateEpisodeButton = document.createElement("button");
            updateEpisodeButton.textContent = "Update Episode";
            updateEpisodeButton.classList.add("update-button");

            updateEpisodeButton.addEventListener("click", () => {
                // �ppna modalen f�r att uppdatera avsnittet och fyll formul�ret med aktuell avsnittsdata
                openUpdateModal(episode);
            });

            episodeElement.appendChild(updateEpisodeButton);
        }
        episodesContainer.appendChild(episodeElement);
    }

    function calculateSeasonAndEpisode(episodeNumber) {
        let season = "";
        let episodeNumberInSeason = 0;

        if (episodeNumber >= 1 && episodeNumber <= 9) {
            season = "1";
            episodeNumberInSeason = episodeNumber;
        } else if (episodeNumber >= 10 && episodeNumber <= 29) {
            season = "2";
            episodeNumberInSeason = episodeNumber - 9;
        } else if (episodeNumber >= 30 && episodeNumber <= 44) {
            season = "3";
            episodeNumberInSeason = episodeNumber - 29;
        } else if (episodeNumber >= 45 && episodeNumber <= 56) {
            season = "4";
            episodeNumberInSeason = episodeNumber - 44;
        } else if (episodeNumber >= 57 && episodeNumber <= 72) {
            season = "5";
            episodeNumberInSeason = episodeNumber - 56;
        } else if (episodeNumber >= 73 && episodeNumber <= 76) {
            season = "6";
            episodeNumberInSeason = episodeNumber - 72;
        } else if (episodeNumber >= 77 && episodeNumber <= 80) {
            season = "6";
            episodeNumberInSeason = episodeNumber - 76 + 1;
        } else if (episodeNumber >= 81 && episodeNumber <= 84) {
            season = "6";
            episodeNumberInSeason = episodeNumber - 80 + 2;
        } else if (episodeNumber >= 85 && episodeNumber <= 88) {
            season = "6";
            episodeNumberInSeason = episodeNumber - 84 + 3;
        } else if (episodeNumber >= 89 && episodeNumber <= 101) {
            season = "7";
            episodeNumberInSeason = episodeNumber - 88;
        } else if (episodeNumber >= 102 && episodeNumber <= 114) {
            season = "8";
            episodeNumberInSeason = episodeNumber - 101;
        } else if (episodeNumber >= 115 && episodeNumber <= 127) {
            season = "9";
            episodeNumberInSeason = episodeNumber - 114;
        } else if (episodeNumber >= 128 && episodeNumber <= 140) {
            season = "10";
            episodeNumberInSeason = episodeNumber - 127;
        } else {
            season = "Unknown";
            episodeNumberInSeason = episodeNumber;
        }

        return { season, episodeNumberInSeason };
    }

    function showSingleEpisode(episode) {
        const previousEpisode = document.getElementById("single-episode");
        if (previousEpisode) {
            previousEpisode.remove();
        }

        const episodeContainer = document.createElement("div");
        episodeContainer.id = "single-episode";


        const episodeNumber = parseInt(episode.number.split(" ")[0]);

        // Anropa calculateSeasonAndEpisode f�r att best�mma s�songen och avsnittsnumret
        const { season, episodeNumberInSeason } = calculateSeasonAndEpisode(episodeNumber);

        episodeContainer.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Season: ${season}</h4>
        <h4>Episode: ${episodeNumberInSeason}</h4>
        <h4>Air Date: ${episode.originalAirDate}</h4>
        <h4>Description:<p> ${episode.desc}</p></h4>
        <h4>Writers: ${episode.writers}</h4>
    `;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("close-button");

        closeButton.addEventListener("click", () => {
            episodeContainer.remove();
        });

        episodeContainer.appendChild(closeButton);
        document.body.appendChild(episodeContainer);
    }

    document.getElementById('episodeForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // H�mta v�rdena fr�n formul�ret
        const title = document.getElementById('episodeTitle').value;
        const season = document.getElementById('seasonNumber').value;
        const episodeNumber = document.getElementById('episodeNumber').value;
        const releaseDate = document.getElementById('releaseDate').value;

        // Generera ett unikt ID f�r det nya avsnittet
        //const id = generateUniqueId();

        const newEpisode = {
            //id: id, // Tilldela det unika ID:t till det nya avsnittet
            title: title,
            season: season,
            number: episodeNumber,
            originalAirDate: releaseDate
        };

        let episodes = JSON.parse(localStorage.getItem('episodes')) || [];
        episodes.push(newEpisode);
        episodes = sortEpisodes(episodes);
        localStorage.setItem('episodes', JSON.stringify(episodes));

        // D�lj modalen efter skapandet av det nya avsnittet
        const modal = document.getElementById("newEpisodeModal");
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.hide();

        // Rendera om avsnitten p� sidan f�r att visa det nya avsnittet
        location.reload();
    });

    // Function to sort episodes
    function sortEpisodes(episodes) {
        return episodes.sort((a, b) => {
            const episodeNumberA = parseInt(a.number);
            const episodeNumberB = parseInt(b.number);
            return episodeNumberA - episodeNumberB;
        });
    }

    function openUpdateModal(episode) {
        // Fyll i formul�ret med avsnittets befintliga data
        document.getElementById('updateEpisodeTitle').value = episode.title;
        document.getElementById('updateSeasonNumber').value = episode.season;
        document.getElementById('updateEpisodeNumber').value = episode.number;
        document.getElementById('updateReleaseDate').value = episode.originalAirDate;

        // S�tt de gamla v�rdena i de g�mda f�lten
        document.getElementById('oldEpisodeTitle').value = episode.title;
        document.getElementById('oldSeasonNumber').value = episode.season;
        document.getElementById('oldEpisodeNumber').value = episode.number;

        const modal = document.getElementById("updateEpisodeModal");
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
});

// Uppdatera ett avsnitt i localStorage f�r att �ndra s�song, avsnitt och releasedate
function updateEpisode(oldTitle, oldSeasonNumber, oldEpisodeNumber, newTitle, newSeasonNumber, newEpisodeNumber, releaseDate) {
    const episodes = JSON.parse(localStorage.getItem('episodes')) || []; // H�mta avsnitt fr�n localStorage
    const index = episodes.findIndex((episode) => episode.title === oldTitle && episode.season === oldSeasonNumber && episode.number === oldEpisodeNumber);
    if (index === -1) {
        // Avsnittet hittades inte, visa ett felmeddelande
        alert('Episode not found.');
    } else {
        // Uppdatera avsnittet med nya v�rden
        episodes[index] = {
            title: newTitle,
            season: newSeasonNumber,
            number: newEpisodeNumber,
            originalAirDate: releaseDate
        };

        // Spara uppdaterade avsnitt till localStorage
        localStorage.setItem('episodes', JSON.stringify(episodes));

        // Rendera om avsnitten p� sidan f�r att visa uppdateringen
        location.reload();
    }
}


// H�ndelselyssnare f�r att uppdatera ett avsnitt
document.getElementById("updateEpisodeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // F�rhindra formul�rins�ndning
    const oldTitle = document.getElementById("oldEpisodeTitle").value;
    const oldSeasonNumber = document.getElementById("oldSeasonNumber").value;
    const oldEpisodeNumber = document.getElementById("oldEpisodeNumber").value;
    const newTitle = document.getElementById("updateEpisodeTitle").value;
    const newSeasonNumber = document.getElementById("updateSeasonNumber").value;
    const newEpisodeNumber = document.getElementById("updateEpisodeNumber").value;
    const releaseDate = document.getElementById("updateReleaseDate").value;

    console.log("Old Title:", oldTitle);
    console.log("Old Season:", oldSeasonNumber);
    console.log("Old Episode:", oldEpisodeNumber);
    console.log("New Title:", newTitle);
    console.log("New Season:", newSeasonNumber);
    console.log("New Episode:", newEpisodeNumber);
    console.log("Release Date:", releaseDate);

    updateEpisode(oldTitle, oldSeasonNumber, oldEpisodeNumber, newTitle, newSeasonNumber, newEpisodeNumber, releaseDate);

    // Rensa inmatningsf�lten efter uppdatering f�r att undvika att beh�va klicka tv� g�nger
    document.getElementById("oldEpisodeTitle").value = "";
    document.getElementById("oldSeasonNumber").value = "";
    document.getElementById("oldEpisodeNumber").value = "";
    document.getElementById("updateEpisodeTitle").value = "";
    document.getElementById("updateSeasonNumber").value = "";
    document.getElementById("updateEpisodeNumber").value = "";
    document.getElementById("updateReleaseDate").value = "";
});
