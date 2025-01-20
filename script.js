// Check if the page is being loaded fresh or reloaded
if (!sessionStorage.getItem("isReloaded")) {
    // If it's not reloaded, mark it as reloaded and set the redirect
    sessionStorage.setItem("isReloaded", "true");

    // Redirect after a set timeout
    setTimeout(() => {
        window.location.href = "splashscreen.html"; // Adjust path as needed
    }); // Redirect after 5 seconds
} else {
    // Clear the session storage once the page has been loaded after the redirect
    sessionStorage.removeItem("isReloaded");
}

const home = document.getElementById('title');

home.addEventListener('click', () => {
    window.location.reload();
});

document.addEventListener('DOMContentLoaded', async () => {
    const competitionsDiv = document.getElementById('competitions');
    const matchesDiv = document.getElementById('matches');
    const upcomingMessage = document.getElementById('search-results');
    const competitionMessage = document.getElementById('comps');
    const loadingMatches = document.getElementById('loadingmatches');
    const loadButton = document.getElementById('searchByCompetitions');
    const mainmenudiv = document.getElementById('mainmenu');
    const searchByTeamsButton = document.getElementById('searchByTeams');
    const teamSearchContainer = document.getElementById('team-search-container');
    const searchTeamButton = document.getElementById('search-team-button');
    const teamsearchresults = document.getElementById('search-results');
    const searchbox = document.getElementById('team-search-box');


    searchbox.addEventListener('input', async () => {
        setTimeout(async () => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = `<p style="font-family: Poppins, sans-serif;">
        <img src="loading/loading.gif" alt="Loading" style="vertical-align: middle; height:48px"> 
        Loading teams and competitions...
      </p>
      `;
            const searchTerm = document.getElementById('team-search-box').value.trim();

            if (searchTerm) {
                try {

                    const tresponse = await fetch(`https://api-server-dkr1.onrender.com/teams/search?name=${searchTerm}`);
                    const teamData = await tresponse.json();
                    const cresponse = await fetch(`https://api-server-dkr1.onrender.com/competitions/search?name=${searchTerm}`);
                    const competitionData = await cresponse.json().then(
                        resultsContainer.innerHTML = ''
                    );

                    // Create sections for teams and competitions
                    const teamsSection = document.createElement('div');
                    teamsSection.classList.add('results-section');
                    const compsSection = document.createElement('div');
                    compsSection.classList.add('results-section');

                    // Display teams
                    if (teamData.length > 0) {
                        const teamsList = document.createElement('div');
                        teamsList.classList.add('team-list');

                        const displayTeams = (teams) => {
                            teamsList.innerHTML = '';
                            teams.forEach(team => {
                                const button = document.createElement('button');
                                button.classList.add('team-result');

                                const crestImg = document.createElement('img');
                                crestImg.src = team.crest || 'default.png';
                                crestImg.alt = `${team.name} Crest`;
                                crestImg.style.width = '30px';
                                crestImg.style.height = '30px';
                                button.appendChild(crestImg);

                                const teamNameElement = document.createElement('span');
                                teamNameElement.textContent = team.name;
                                button.appendChild(teamNameElement);

                                button.addEventListener('click', () => fetchTeamDetails(team.id));
                                teamsList.appendChild(button);
                            });
                        };

                        displayTeams(teamData.slice(0, 5));
                        teamsSection.appendChild(teamsList);

                        if (teamData.length > 5) {
                            const moreTeamsBtn = document.createElement('button');
                            moreTeamsBtn.textContent = 'More Teams';
                            moreTeamsBtn.classList.add('more-button');
                            moreTeamsBtn.addEventListener('click', () => {
                                displayTeams(teamData);
                                moreTeamsBtn.remove();
                            });
                            teamsSection.appendChild(moreTeamsBtn);
                        }
                    }

                    // Display competitions
                    if (competitionData.length > 0) {
                        const compsList = document.createElement('div');
                        compsList.classList.add('team-list');
                    
                        const displayComps = (competitions) => {
                            compsList.innerHTML = '';
                            competitions.forEach(comp => {
                                const button = document.createElement('button');
                                button.classList.add('team-result');
                    
                                const emblemImg = document.createElement('img');
                                emblemImg.src = comp.emblem || 'default.png';
                                emblemImg.alt = `${comp.name} Emblem`;
                                emblemImg.style.width = '30px';
                                emblemImg.style.height = '30px';
                                button.appendChild(emblemImg);
                    
                                const compNameElement = document.createElement('span');
                                compNameElement.textContent = comp.name;
                                button.appendChild(compNameElement);
                    
                                button.addEventListener('click', () => fetchMatches(comp.id));
                                compsList.appendChild(button);
                            });
                        };

                        displayComps(competitionData.slice(0, 5));
                        compsSection.appendChild(compsList);

                        if (competitionData.length > 5) {
                            const moreCompsBtn = document.createElement('button');
                            moreCompsBtn.textContent = 'More Competitions';
                            moreCompsBtn.classList.add('more-button');
                            moreCompsBtn.addEventListener('click', () => {
                                displayComps(competitionData);
                                moreCompsBtn.remove();
                            });
                            compsSection.appendChild(moreCompsBtn);
                        }
                    }

                    // Add sections to results container
                    if (teamData.length > 0) resultsContainer.appendChild(teamsSection);
                    if (competitionData.length > 0) resultsContainer.appendChild(compsSection);

                    // Show message if no results found
                    if (teamData.length === 0 && competitionData.length === 0) {
                        resultsContainer.innerHTML = '<p>No results found!</p>';
                    }

                } catch (error) {
                    console.error('Error fetching data:', error);
                    resultsContainer.innerHTML = '<p>Error loading results</p>';
                }
            }
        }, 1000);
    });


    async function fetchTeamDetails(teamId) {
        try {
            const response = await fetch(`https://api-server-dkr1.onrender.com/teams/${teamId}`);
            const teamDetails = await response.json();
            const res = await fetch(`https://api-server-dkr1.onrender.com/teams/${teamId}/matches`);
            const matchesData = await res.json();
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Clear previous results

            const detailsElement = document.createElement('div');
            detailsElement.classList.add('team-details');



            detailsElement.innerHTML = `
    <div class="team-details">
        <div class="team-header">
            <h2>${teamDetails.name}</h2>
            <a href="${teamDetails.website}" target="_blank" class="team-crest">
                <img src="${teamDetails.crest || 'default.png'}" alt="${teamDetails.name}">
            </a>
        </div>
        
        <div class="team-info">
            <div class="info-item">
                <span class="label">Founded:</span>
                <span class="value">${teamDetails.founded}</span>
            </div>
            <div class="info-item">
                <span class="label">Venue:</span>
                <span class="value">${teamDetails.venue}</span>
            </div>
            <div class="info-item">
                <span class="label">Coach:</span>
                <span class="value">${teamDetails.coach.name} (since ${teamDetails.coach.contract.start})</span>
            </div>
        </div>

        <div class="competitions-section">
            <h3>Current Competitions</h3>
            <div class="competitions-compact">
                ${teamDetails.runningCompetitions.map(competition => `
                    <div class="competition-item">
                        <img src="${competition.emblem || 'default.png'}" alt="${competition.name}">
                        <span>${competition.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
`;
            resultsContainer.appendChild(detailsElement);

            // Fetch and display matches
            await fetchTeamMatches(teamId);
            const formattedLast5Matches = formatLast5Matches(matchesData.last5, teamId);
            detailsElement.innerHTML += `<h3>Team Form: ${formattedLast5Matches}</h3>`;
        } catch (error) {
            console.error('Error fetching team details:', error);
        }
    }

    async function fetchTeamMatches(teamId) {
        try {
            const response = await fetch(`https://api-server-dkr1.onrender.com/teams/${teamId}/matches`);
            const matchesData = await response.json();
            const resultsContainer = document.getElementById('search-results');

            if (matchesData.inplay != null) {
                const response = await fetch(`https://api-server-dkr1.onrender.com/teams/${teamId}/matches`);
                const matchesData = await response.json();
                const activematch = document.createElement('div');
                const activematchbutton = document.createElement('button');
                activematchbutton.classList.add('team-match-button-active');
                const matchDate = new Date(matchesData.inplay.utcDate);
                const formattedDate = 'Started at: ' + matchDate.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                const func = async () => {
                    const response = await fetch(`https://api-server-dkr1.onrender.com/teams/${teamId}/matches`);
                    const matchesData = await response.json();
                    activematchbutton.innerHTML = `
                <div class="team-match-info-active">
                    <h1 class="hoverred">Active Match</h1>
                    <div class="team-match-teams">
                        <img src="${matchesData.inplay.homeTeam.crest || 'default.png'}" alt="Home Team Logo" class="team-logo">
                        <div class="match-teams">
                            <p><strong>${matchesData.inplay.homeTeam.shortName}</strong></p>
                            <p><strong>vs</strong></p>
                            <p><strong>${matchesData.inplay.awayTeam.shortName}</strong></p>
                        </div>
                        <img src="${matchesData.inplay.awayTeam.crest || 'default.png'}" alt="Away Team Logo" class="team-logo">
                    </div>
                    <div class="team-match-score-active">${matchesData.inplay.score.fullTime.home} - ${matchesData.inplay.score.fullTime.away}</div>
                    <div class="team-match-date-active">
                    ${formattedDate}
                        <div class="competition-emblem-container-active">
                            <img src="${matchesData.inplay.competition.emblem || 'default.png'}" alt="${matchesData.inplay.competition.name}" class="competition-emblem">
                        </div>
                    </div>
                </div>`;
                };
                func();
                setInterval(func, 1000 * 60);
                activematch.appendChild(activematchbutton);
                resultsContainer.appendChild(activematch);
            }


            const matchesElement = document.createElement('div');
            matchesElement.classList.add('team-matches-container');



            if (matchesData.next5.length === 0 && matchesData.last5.length === 0) {
                matchesElement.innerHTML = '<p>No matches found.</p>';
            } else {
                const now = new Date();
                const oneDayInMillis = 24 * 60 * 60 * 1000;

                const formatMatch = (match) => {
                    const matchDate = new Date(match.utcDate);
                    const timeDifference = matchDate - now;
                    const isWithin24Hours = timeDifference > 0 && timeDifference <= oneDayInMillis;

                    let countdown = '';
                    const updateCountdown = () => {
                        const now = new Date();
                        const timeDifference = matchDate - now;
                        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                        countdown = `<p>Countdown: ${hours}h ${minutes}m ${seconds}s</p>`;
                    };

                    const formattedDate = matchDate.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    }) + ' at ' + matchDate.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    let isPastMatch = false;
                    if (match.status === 'FINISHED') {
                        isPastMatch = true;
                    }



                    const score = (isPastMatch && match.score.fullTime.home != null && match.score.fullTime.away != null) ? ` <p> ${match.score.fullTime.home} - ${match.score.fullTime.away}</p>` : '';

                    const matchButton = document.createElement('button');
                    matchButton.classList.add('team-match-button');
                    if (isWithin24Hours) {
                        const func = () => {
                            matchButton.innerHTML = `
                        <div class="team-match-info">
                            <div class="team-match-teams">
                                <img src="${match.homeTeam.crest || 'default.png'}" alt="Home Team Logo" class="team-logo">
                                <div class="match-teams">
                                    <p><strong>${match.homeTeam.shortName}</strong></p>
                                    <p><strong>vs</strong></p>
                                    <p><strong>${match.awayTeam.shortName}</strong></p>
                                </div>
                                <img src="${match.awayTeam.crest || 'default.png'}" alt="Away Team Logo" class="team-logo">
                            </div>
                            ${score}
                            <div class="team-match-date">
                                ${formattedDate}
                                ${countdown}
                                <div class="competition-emblem-container">
                                    <img src="${match.competition.emblem || 'default.png'}" alt="${match.competition.name}" class="competition-emblem">
                                </div>
                            </div>
                        </div>`;
                        };

                        setInterval(updateCountdown, 1000);
                        setInterval(func, 1000);
                    } else {
                        matchButton.innerHTML = `
                        <div class="team-match-info">
                            <div class="team-match-teams">
                                <img src="${match.homeTeam.crest || 'default.png'}" alt="Home Team Logo" class="team-logo">
                                <div class="match-teams">
                                    <p><strong>${match.homeTeam.shortName}</strong></p>
                                    <p><strong>vs</strong></p>
                                    <p><strong>${match.awayTeam.shortName}</strong></p>
                                </div>
                                <img src="${match.awayTeam.crest || 'default.png'}" alt="Away Team Logo" class="team-logo">
                            </div>
                            ${score}
                            <div class="team-match-date">
                                ${formattedDate}
                                ${countdown}
                                <div class="competition-emblem-container">
                                    <img src="${match.competition.emblem || 'default.png'}" alt="${match.competition.name}" class="competition-emblem">
                                </div>
                            </div>
                        </div>`;
                    }
                    matchButton.onclick = () => {
                        localStorage.setItem('selectedMatch', JSON.stringify(match));
                        window.location.href = 'match-details.html';
                    };
                    return matchButton;
                };

                const last5Matches = matchesData.last5.map(match => formatMatch(match, true));
                const next5Matches = matchesData.next5.map(match => formatMatch(match, false));

                matchesElement.innerHTML = `
                    <div class="team-matches-container">
                        <div class="team-matches-column">
                            <h1>Last 5 Matches</h1>
                            <div class="team-matches-list"></div>
                        </div>
                        <div class="team-matches-column">
                            <h1>Next 5 Matches</h1>
                            <div class="team-matches-list"></div>
                        </div>
                    </div>
                `;

                matchesElement.querySelector('.team-matches-column:nth-child(1) .team-matches-list').append(...last5Matches);
                matchesElement.querySelector('.team-matches-column:nth-child(2) .team-matches-list').append(...next5Matches);
            }

            resultsContainer.appendChild(matchesElement);
        } catch (error) {
            console.error('Error fetching team matches:', error);
        }
    }

    function formatLast5Matches(last5Matches, teamId) {
        const revarr = last5Matches.reverse();
        return revarr.map(match => {
            if (teamId === match.homeTeam.id) {
                const homet = match.score.fullTime.home;
                const awayt = match.score.fullTime.away;
                if (homet > awayt) {
                    return '<mark style="background-color:rgb(0,152,95);color:white;padding:5px;border-radius:2px;margin:3px;border:2px none;">W </mark>';
                } else if (homet === awayt) {
                    return '<mark style="background-color:rgb(141,148,153);color:white;padding:5px;border-radius:2px;margin:3px;border:2px none;">D </mark>';
                } else if (homet < awayt) {
                    return '<mark style="background-color:rgb(221,54,54);color:white;padding:5px;border-radius:2px;margin:3px;border:2px none;">L </mark>';
                } else {
                    return '';
                }
            } else if (teamId === match.awayTeam.id) {
                const homet = match.score.fullTime.home;
                const awayt = match.score.fullTime.away;
                if (homet < awayt) {
                    return '<mark style="background-color:rgb(0,152,95);color:white;padding:5px;border-radius:2px;margin:3px;">W </mark>';
                } else if (homet === awayt) {
                    return '<mark style="background-color:rgb(141,148,153);color:white;padding:5px;border-radius:2px;margin:3px;">D </mark>';
                } else if (homet > awayt) {
                    return '<mark style="background-color:rgb(221,54,54);color:white;padding:5px;border-radius:2px;margin:3px;">L </mark>';
                } else {
                    return '';
                }
            }

        }).join('');
    }

    async function fetchMatches(competitionId) {
        try {
            upcomingMessage.innerHTML = `
                <p style="font-family: Poppins, sans-serif;">
                    <img src="loading/loading.gif" alt="Loading" style="vertical-align: middle; height:48px"> 
                    Loading matches...
                </p>
            `;
            const response = await fetch(`https://api-server-dkr1.onrender.com/matches/${competitionId}`);
            const data = await response.json();
            console.log(`Competition match data: ${data}`);
    
            if (data.matches === 'No upcoming matches.') {
                upcomingMessage.innerHTML = 'No upcoming matches for this competition.';
            } else {
                upcomingMessage.innerHTML = "✦ Upcoming Matches ✦";
                matchesDiv.innerHTML = '';
    
                if (data.message) {
                    const noMatchesMessage = document.createElement('p');
                    noMatchesMessage.textContent = data.message;
                    matchesDiv.appendChild(noMatchesMessage);
                    return;
                }
    
                if (loadingMatches) {
                    loadingMatches.textContent = '';
                }
    
                data.forEach(match => {
                    const matchButton = document.createElement('button');
                    matchButton.classList.add('match-button');
    
                    const matchDate = new Date(match.utcDate);
                    const formattedDate = matchDate.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    }) + ' at ' + matchDate.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
    
                    matchButton.innerHTML = `
                        <div class="match-info">
                            <img src="${match.homeTeam.logo || 'default.png'}" alt="Home Team Logo">
                            <div class="match-teams">
                                <p><strong>${match.homeTeam.shortName}</strong></p>
                                <p><strong>vs</strong></p>
                                <p><strong>${match.awayTeam.shortName}</strong></p>
                            </div>
                            <img src="${match.awayTeam.logo || 'default.png'}" alt="Away Team Logo">
                        </div>
                        <p class="match-time"><strong>${formattedDate}</strong></p>
                    `;
    
                    matchButton.onclick = () => {
                        localStorage.setItem('selectedMatch', JSON.stringify(match));
                        window.location.href = 'match-details.html';
                    };
    
                    matchesDiv.appendChild(matchButton);
                });
            }
        } catch (error) {
            console.error('Error fetching matches:', error.message);
            upcomingMessage.innerHTML = 'Error loading matches.';
        }
    }
});