document.addEventListener('DOMContentLoaded', function () {
    const episodeList = document.getElementById('episode-list');

    // Fetch episodes from API
    fetch('https://da-demo.github.io/api/futurama/episodes/')
        .then(response => response.json())
        .then(episodes => {
            episodes.forEach(episode => {
                const episodeDiv = createEpisodeElement(episode);
                episodeList.appendChild(episodeDiv);
            });
        });

    // Event listener for adding new episode
    document.getElementById('episodeForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('episodeTitle').value;
        const season = document.getElementById('seasonNumber').value;
        const episodeNumber = document.getElementById('episodeNumber').value;
        const releaseDate = document.getElementById('releaseDate').value;

        const newEpisode = {
            title: title,
            season: season,
            episode: episodeNumber,
            releaseDate: releaseDate
        };

        let episodes = JSON.parse(localStorage.getItem('episodes')) || [];
        episodes.push(newEpisode);
        localStorage.setItem('episodes', JSON.stringify(episodes));

        // Render episodes including the new one
        renderEpisodes();
    });

    // Render local episodes on page load
    renderEpisodes();

    function renderEpisodes() {
        episodeList.innerHTML = '';
        const episodes = JSON.parse(localStorage.getItem('episodes')) || [];
        episodes.forEach(episode => {
            const episodeDiv = createEpisodeElement(episode);
            episodeList.appendChild(episodeDiv);
        });
    }

    function createEpisodeElement(episode) {
        const episodeDiv = document.createElement('div');
        episodeDiv.classList.add('episode', 'border', 'p-3', 'm-3', 'col-md-2', 'col-6', 'd-inline-flex', 'flex-column', 'justify-content-center', 'align-items-center');
        const titleElement = document.createElement('p');
        titleElement.textContent = episode.title;
        titleElement.classList.add('mb-0', 'text-center');
        episodeDiv.appendChild(titleElement);
        const arrowIcon = document.createElement('i');
        arrowIcon.classList.add('mt-3', 'fa-solid', 'fa-arrow-right', 'course-item--icon');
        arrowIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const detailsElement = episodeDiv.querySelector('.episode-details');
            detailsElement.classList.toggle('visually-hidden');
            arrowIcon.classList.toggle('fa-arrow-right');
            arrowIcon.classList.toggle('fa-arrow-down');
        });
        episodeDiv.appendChild(arrowIcon);
        const detailsElement = document.createElement('div');
        detailsElement.classList.add('episode-details', 'visually-hidden', 'col-md-9');
        showEpisodeDetails(episode, detailsElement);
        episodeDiv.appendChild(detailsElement);
        return episodeDiv;
    }

    function showEpisodeDetails(episode, detailsElement) {
        var episodeNumber = parseInt(episode.number.split(" ")[0]);
        var season = "";
        var episodeNumberInSeason = parseInt(episode.number.split(" ")[2]);

        if (episodeNumber >= 1 && episodeNumber <= 9) {
            season = "1";
        } else if (episodeNumber >= 10 && episodeNumber <= 29) {
            season = "2";
        } else if (episodeNumber >= 30 && episodeNumber <= 44) {
            season = "3";
        } else if (episodeNumber >= 45 && episodeNumber <= 56) {
            season = "4";
        } else if (episodeNumber >= 57 && episodeNumber <= 72) {
            season = "5";
        } else if (episodeNumber >= 73 && episodeNumber <= 76) {
            season = "6";
            episodeNumberInSeason = 1;
        } else if (episodeNumber >= 77 && episodeNumber <= 80) {
            season = "6";
            episodeNumberInSeason = 2;
        } else if (episodeNumber >= 81 && episodeNumber <= 84) {
            season = "6";
            episodeNumberInSeason = 3;
        } else if (episodeNumber >= 85 && episodeNumber <= 88) {
            season = "6";
            episodeNumberInSeason = 4;
        } else if (episodeNumber >= 89 && episodeNumber <= 101) {
            season = "7";
        } else if (episodeNumber >= 102 && episodeNumber <= 114) {
            season = "8";
        } else if (episodeNumber >= 115 && episodeNumber <= 127) {
            season = "9";
        } else if (episodeNumber >= 128 && episodeNumber <= 140) {
            season = "10";
        } else {
            season = "Unknown";
        }

        detailsElement.innerHTML = `
      <p class="fs-6">Season: ${season}</p>
      <p class="fs-6">Episode: ${episodeNumberInSeason}</p>
      <p class="fs-6">Release Date: ${episode.releaseDate}</p>
    `;
    }
});

