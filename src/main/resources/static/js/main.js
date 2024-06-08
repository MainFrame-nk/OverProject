// let roleList = [
//     {id: 1, role: "ROLE_USER"},
//     {id: 2, role: "ROLE_ADMIN"}
// ]
let isUser = true;

$(async function () {
    // Пользователи и основное
    await getUser();
    await infoUser();
    await tittle();
    await getUsers();
    await getNewUserForm();
    await getDefaultModal();
    await createUser();
    // Команды
    await getTeams();
    await getNewTeamForm();
    await createTeam();
    await getNamesTeams();
    // Лиги
    await getLeagues();
    await getNewLeagueForm();
    await createLeague();
    await getNamesLeagues();
    // Страны
    await getCountries();
    await getNewCountryForm();
    await createCountry();
    await getNamesCountries();
    // Матчи
    await getMatches();
    await getNewMatchForm();
    await createMatch();
    // Котировки
    await getQuotes();
    await getNewQuotationForm();
    await createQuotation();
    await getNamesQuotes();
    // События
    //await getEvents();
    await getNewEventForm();
    //await createEvent();
    //await getEventsMatch();
})

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllUsers: async () => await fetch('/admin/users'),
    findUserByUsername: async () => await fetch(`/admin/user`),
    findOneUser: async (userId) => await fetch(`/admin/user/${userId}`),
    addNewUser: async (user) => await fetch('/admin/newUser', {method: 'POST', headers: userFetch.head, body: JSON.stringify(user)}),
    updateUser: async (user, userId) => await fetch(`/admin/user/update/${userId}`, {method: 'PATCH', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUser: async (userId) => await fetch(`/admin/user/delete/${userId}`, {method: 'DELETE', headers: userFetch.head}),
}

const teamFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllTeams: async () => await fetch('/admin/teams'),
    findOneTeam: async (teamId) => await fetch(`/admin/team/${teamId}`),
    addNewTeam: async (team) => await fetch('/admin/newTeam', {method: 'POST', headers: teamFetch.head, body: JSON.stringify(team)}),
    updateTeam: async (team, teamId) => await fetch(`/admin/team/update/${teamId}`, {method: 'PATCH', headers: teamFetch.head, body: JSON.stringify(team)}),
    deleteTeam: async (teamId) => await fetch(`/admin/team/delete/${teamId}`, {method: 'DELETE', headers: teamFetch.head})
}

const leagueFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllLeagues: async () => await fetch('/admin/leagues'),
    findOneLeague: async (leagueId) => await fetch(`/admin/league/${leagueId}`),
    addNewLeague: async (league) => await fetch('/admin/newLeague', {method: 'POST', headers: leagueFetch.head, body: JSON.stringify(league)}),
    updateLeague: async (league, leagueId) => await fetch(`/admin/league/update/${leagueId}`, {method: 'PATCH', headers: leagueFetch.head, body: JSON.stringify(league)}),
    deleteLeague: async (leagueId) => await fetch(`/admin/league/delete/${leagueId}`, {method: 'DELETE', headers: leagueFetch.head})
}

const countryFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllCountries: async () => await fetch('/admin/countries'),
    findOneCountry: async (countryId) => await fetch(`/admin/country/${countryId}`),
    addNewCountry: async (country) => await fetch('/admin/newCountry', {method: 'POST', headers: countryFetch.head, body: JSON.stringify(country)}),
    updateCountry: async (country, countryId) => await fetch(`/admin/country/update/${countryId}`, {method: 'PATCH', headers: countryFetch.head, body: JSON.stringify(country)}),
    deleteCountry: async (countryId) => await fetch(`/admin/country/delete/${countryId}`, {method: 'DELETE', headers: countryFetch.head})
}

const matchFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllMatches: async () => await fetch('/admin/matches'),
    findOneMatch: async (matchId) => await fetch(`/admin/match/${matchId}`),
    addNewMatch: async (match) => await fetch('/admin/newMatch', {method: 'POST', headers: matchFetch.head, body: JSON.stringify(match)}),
    updateMatch: async (match, matchId) => await fetch(`/admin/match/update/${matchId}`, {method: 'PATCH', headers: matchFetch.head, body: JSON.stringify(match)}),
    deleteMatch: async (matchId) => await fetch(`/admin/match/delete/${matchId}`, {method: 'DELETE', headers: matchFetch.head})
}

const quotationFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllQuotes: async () => await fetch('/admin/quotes'),
    findOneQuotation: async (quotationId) => await fetch(`/admin/quotation/${quotationId}`),
    // findQuotationByName: async (quotationName) => await fetch(`/admin/quotation?=${quotationName}`),
    addNewQuotation: async (quotation) => await fetch('/admin/newQuotation', {method: 'POST', headers: quotationFetch.head, body: JSON.stringify(quotation)}),
    updateQuotation: async (quotation, quotationId) => await fetch(`/admin/quotation/update/${quotationId}`, {method: 'PATCH', headers: quotationFetch.head, body: JSON.stringify(quotation)}),
    deleteQuotation: async (quotationId) => await fetch(`/admin/quotation/delete/${quotationId}`, {method: 'DELETE', headers: quotationFetch.head})
}

const eventFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllEvents: async () => await fetch('/admin/events'),
    findEventsByMatch: async (matchId) => await fetch(`/admin/match/${matchId}/events`),
    findEventsByTeam: async (teamId) => await fetch(`/admin/team/${teamId}/events`),
    findEventsByQuotation: async (quotationId) => await fetch(`/admin/quotation/${quotationId}/events`),
    findEventsByMatchAndTeamAndQuotation: async (matchId, teamId, quotationId) => await fetch(`/admin/events/${matchId}/${teamId}/${quotationId}`),
    findEventByMatchAndTeamAndQuotationAndPeriod: async (matchId, teamId, quotationId, periodMatch) => await fetch(`/admin/events/${matchId}/${teamId}/${quotationId}/${periodMatch}`),
    findOneEvent: async (eventId) => await fetch(`/admin/event/${eventId}`),
    addNewEvent: async (matchId, event) => await fetch(`/admin/match/${matchId}/newEvent`, {method: 'POST', headers: eventFetch.head, body: JSON.stringify(event)}),
    updateEvent: async (event, eventId) => await fetch(`/admin/event/update/${eventId}`, {method: 'PATCH', headers: eventFetch.head, body: JSON.stringify(event)}),
    deleteEvent: async (eventId) => await fetch(`/admin/event/delete/${eventId}`, {method: 'DELETE', headers: eventFetch.head})
}

async function infoUser() {
    let temp = '';
    const info = document.querySelector('#info');
    await userFetch.findUserByUsername()
        .then(res => res.json())
        .then(user => {
            temp += `
             <span style="color: white">
                <span style="color: aqua">${user.roles.map(e => " " + e.role.substring(5))}</span>: ${user.username}
                </div>
            </span>
                </tr>
            `;
        });
    info.innerHTML = temp;
}