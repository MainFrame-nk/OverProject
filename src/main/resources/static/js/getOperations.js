async function getUser() {
    let temp = '';
    const table = document.querySelector('#tableUser tbody');
    await userFetch.findUserByUsername()
        .then(res => res.json())
        .then(user => {
            temp = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(e => " " + e.role.substring(5))}</td>
                </tr>
            `;
            table.innerHTML = temp;

            $(function (){
                let role = ""
                for (let i = 0; i < user.roles.length; i++) {
                    role = user.roles[i].role
                    if (role === "ROLE_ADMIN") {
                        isUser = false;
                    }
                }
                if (isUser) {
                    $("#userTable").addClass("show active");
                    $("#userTab").addClass("show active");
                } else {
                    $("#adminTable").addClass("show active");
                    $("#adminTab").addClass("show active");
                }
            })
        })
}

async function tittle() {
    let temp = ''
    const h1a1 = document.querySelector('#h1a1');
    if (isUser) {
        temp = `
            <h1 className="h1 a1" id="h1a1">Страница пользователя</h1>
            `;
        h1a1.innerHTML = temp;
    } else {
        temp = `
            <h1 className="h1 a1" id="h1a1">Админ панель</h1>
            `;
        h1a1.innerHTML = temp;
    }
}

async function getUsers() {
    let temp = '';
    const table = document.querySelector('#tableAllUsers tbody');
    await userFetch.getAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                temp += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(e => " " + e.role.substring(5))}</td>
                    <td>
                        <button type="button" data-id="${user.id}" data-action="edit" class="btn btn-info"
                            className data-toggle="modal" data-target="#editModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${user.id}" data-action="delete" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;

        })

    $("#tableAllUsers").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewUserForm() {
    let button = $(`#addUser`);
    let form = $(`#addForm`)
    button.on('click', () => {
        form.show()
    })
}

async function getDefaultModal() {
    $('#defaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let id = thisModal.attr('data-id');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, id);
                break;
            case 'delete':
                deleteUser(thisModal, id);
                break;
            case 'editTeam':
                editTeam(thisModal, id);
                break;
            case 'deleteTeam':
                deleteTeam(thisModal, id);
                break;
            case 'editLeague':
                editLeague(thisModal, id);
                break;
            case 'deleteLeague':
                deleteLeague(thisModal, id);
                break;
            case 'editCountry':
                editCountry(thisModal, id);
                break;
            case 'deleteCountry':
                deleteCountry(thisModal, id);
                break;
            case 'editQuotation':
                editQuotation(thisModal, id);
                break;
            case 'deleteQuotation':
                deleteQuotation(thisModal, id);
                break;
            case 'editEvent':
                editEvent(thisModal, id);
                break;
            case 'deleteEvent':
                deleteEvent(thisModal, id);
                break;
            case 'editMatch':
                editMatch(thisModal, id);
                break;
            case 'deleteMatch':
                deleteMatch(thisModal, id);
                break;
            case 'eventsMatch':
                getEventsMatch(id);
                break;
            case 'createEventMatch':
                createEvent(id);
                break;
            case 'analyseMatch':
                analyseMatch(id);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}
async function getTeams() {
    let temp = '';
    const table = document.querySelector('#tableAllTeams tbody');
    await teamFetch.getAllTeams()
        .then(res => res.json())
        .then(teams => {
            teams.forEach(team => {
                temp += `
                <tr>
                    <td>${team.id}</td>
                    <td>${team.name}</td>
                    <td>${team.leagueTeam.map(e => " " + e.nameLeague)}</td>
                    <td>${team.levelTeam}</td>
                    <td>${team.formTeam}</td>
                    <td>
                        <button type="button" data-id="${team.id}" data-action="editTeam" class="btn btn-info"
                            className data-toggle="modal" data-target="#editTeamModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${team.id}" data-action="deleteTeam" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteTeamModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;

        })

    $("#tableAllTeams").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNamesTeams() {
    let temp = '';
    const table = document.querySelector('#namesTeamsHomeMatch select');
    const table2 = document.querySelector('#namesTeamsGuestMatch select');
    await teamFetch.getAllTeams()
        .then(res => res.json())
        .then(teams => {
            teams.forEach(team => {
                temp += `
                    <option value="${team.id}">${team.name}</option>
               `;
            })
            table.innerHTML = temp;
            table2.innerHTML = temp;
        })
}

async function getNameTeam(matchId) {
    let tempHome = '';
    let tempGuest = '';
    const radioHome = document.querySelector('#nameTeamHomeEvent');
    const radioGuest = document.querySelector('#nameTeamGuestEvent');
    let teamHome;
    let teamGuest;
    await matchFetch.findOneMatch(matchId)
        .then(res => res.json())
        .then(match => {
            teamHome = match.homeTeam;
            teamGuest = match.guestTeam;
        })
    tempHome += `
        <input type="radio" class="form-control" name="teamEventCreate" value="${teamHome.id}" required>${teamHome.name}
   `;
    tempGuest += `
        <input type="radio" class="form-control" name="teamEventCreate" value="${teamGuest.id}" required>${teamGuest.name}
   `;
    radioHome.innerHTML = tempHome;
    radioGuest.innerHTML = tempGuest;
}

async function getNewTeamForm() {
    let button = $(`#addTeam`);
    let form = $(`#addTeamForm`)
    button.on('click', () => {
        form.show()
    })
}
async function getLeagues() {
    let temp = '';
    const table = document.querySelector('#tableAllLeagues tbody');
    await leagueFetch.getAllLeagues()
        .then(res => res.json())
        .then(leagues => {
            leagues.forEach(league => {
                temp += `
                <tr>
                    <td>${league.id}</td>
                    <td>${league.nameLeague}</td>
                    <td>${league.countryLeague.nameCountry}</td>
                    <td>
                        <button type="button" data-id="${league.id}" data-action="editLeague" class="btn btn-info"
                            className data-toggle="modal" data-target="#editLeagueModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${league.id}" data-action="deleteLeague" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteLeagueModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableAllLeagues").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewLeagueForm() {
    let button = $(`#addLeague`);
    let form = $(`#addLeagueForm`)
    button.on('click', () => {
        form.show()
    })
}

async function getNamesLeagues() {
    let temp = '';
    const table = document.querySelector('#namesLeaguesTeam select');
    const tableMatch = document.querySelector('#namesLeaguesMatch select');
    await leagueFetch.getAllLeagues()
        .then(res => res.json())
        .then(leagues => {
            leagues.forEach(league => {
                temp += `
                    <option value="${league.id}">${league.nameLeague}</option>
               `;
            })
            table.innerHTML = temp;
            tableMatch.innerHTML = temp;
        })
}

async function getCountries() {
    let temp = '';
    const table = document.querySelector('#tableAllCountries tbody');
    await countryFetch.getAllCountries()
        .then(res => res.json())
        .then(countries => {
            countries.forEach(country => {
                temp += `
                <tr>
                    <td>${country.id}</td>
                    <td>${country.nameCountry}</td>
                    <td>${country.flag}</td>
                    <td>
                        <button type="button" data-id="${country.id}" data-action="editCountry" class="btn btn-info"
                            className data-toggle="modal" data-target="#editCountryModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${country.id}" data-action="deleteCountry" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteCountryModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableAllCountries").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewCountryForm() {
    let button = $(`#addCountry`);
    let form = $(`#addCountryForm`)
    button.on('click', () => {
        form.show()
    })
}

async function getNamesCountries() {
    let temp = '';
    const table = document.querySelector('#namesCountries select');
    await countryFetch.getAllCountries()
        .then(res => res.json())
        .then(countries => {
            countries.forEach(country => {
                temp += `
                    <option value="${country.id}">${country.nameCountry}</option>
               `;
            })
            table.innerHTML = temp;
        })
}

async function getMatches() {
    let temp = '';
    const table = document.querySelector('#tableAllMatches tbody');
    await matchFetch.getAllMatches()
        .then(res => res.json())
        .then(matches => {
            matches.forEach(match => {
                temp += `
                <tr>
                    <td>${match.id}</td>
                    <td>${match.dateTimeMatch}</td>
                    <td>${match.leagueMatch.nameLeague}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.guestTeam.name}</td>
                    <td>
                        <button type="button" data-id="${match.id}" data-action="eventsMatch" class="btn btn-light"
                            className>События</button> 
                    </td>
                    <td>
                        <button type="button" data-id="${match.id}" data-action="createEventMatch" class="btn btn-light"
                            className>Добавить событие</button> 
                    </td>
                    <td>
                        <button type="button" data-id="${match.id}" data-action="analyseMatch" class="btn btn-light"
                            className>Статистика</button> 
                    </td>
                    <td>
                        <button type="button" data-id="${match.id}" data-action="editMatch" class="btn btn-info"
                            className data-toggle="modal" data-target="#editMatchModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${match.id}" data-action="deleteMatch" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteMatchModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableAllMatches").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewMatchForm() {
    let button = $(`#addMatch`);
    let form = $(`#addMatchForm`)
    button.on('click', () => {
        form.show()
    })
}

async function getQuotes() {
    let temp = '';
    const table = document.querySelector('#tableAllQuotes tbody');
    await quotationFetch.getAllQuotes()
        .then(res => res.json())
        .then(quotes => {
            quotes.forEach(quotation => {
                temp += `
                <tr>
                    <td>${quotation.id}</td>
                    <td>${quotation.nameQuotation}</td>
                    <td>
                        <button type="button" data-id="${quotation.id}" data-action="editQuotation" class="btn btn-info"
                            className data-toggle="modal" data-target="#editQuotationModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${quotation.id}" data-action="deleteQuotation" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteQuotationModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableAllQuotes").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewQuotationForm() {
    let button = $(`#addQuotation`);
    let form = $(`#addQuotationForm`)
    button.on('click', () => {
        form.show()
    })
}

async function getNamesQuotes() {
    let temp = '';
    const table = document.querySelector('#namesQuotesEvent select');
    await quotationFetch.getAllQuotes()
        .then(res => res.json())
        .then(quotes => {
            quotes.forEach(quotation => {
                temp += `
                    <option value="${quotation.id}">${quotation.nameQuotation}</option>
               `;
            })
            table.innerHTML = temp;
        })
}

async function getEvents() {
    let temp = '';
    const table = document.querySelector('#tableEventsMatch tbody');
    await eventFetch.getAllEvents()
        .then(res => res.json())
        .then(events => {
            events.forEach(event => {
                temp += `
                <tr>
                    <td>${event.id}</td>
                    <td>${event.teamEvent.name}</td>
                    <td>${event.periodMatch}</td>
                    <td>${event.quotationEvent.nameQuotation}</td>
                    <td>${event.valueEvent}</td>
                    <td>
                        <button type="button" data-id="${event.id}" data-action="editEvent" class="btn btn-info"
                            className data-toggle="modal" data-target="#editEventModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${event.id}" data-action="deleteEvent" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteEventModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableAllEvents").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getEventsMatch(matchId) {
    let temp = '';
    const table = document.querySelector('#tableEventsMatch tbody');
    await eventFetch.findEventsByMatch(matchId)
        .then(res => res.json())
        .then(events => {
            events.forEach(event => {
                temp += `
                <tr>
                    <td>${event.id}</td>
                    <td>${event.teamEvent.name}</td>
                    <td>${event.periodMatch}</td>
                    <td>${event.quotationEvent.nameQuotation}</td>
                    <td>${event.valueEvent}</td>
                    <td>
                        <button type="button" data-id="${event.id}" data-action="editEvent" class="btn btn-info"
                            className data-toggle="modal" data-target="#editEventModal">Изменить</button>
                    </td>
                    <td>
                        <button type="button" data-id="${event.id}" data-action="deleteEvent" class="btn btn-danger"
                            className data-toggle="modal" data-target="#deleteEventModal">Удалить</button>
                    </td>
                </tr>
               `;
            })
            table.innerHTML = temp;
        })

    $("#tableEventsMatch").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');

        let targetButton = $(event.target);
        let buttonId = targetButton.attr('data-id');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-id', buttonId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

async function getNewEventForm() {
    let button = $(`#addEvent`);
    let form = $(`#addEventForm`)
    button.on('click', () => {
        form.show()
    })
}

// async function getAnalyse(matchId) {
//     let temp = '';
//     const table = document.querySelector('#tableAnalyse tbody');
//     await matchFetch.findOneMatch(matchId)
//     await eventFetch.findEventsByMatch(matchId)
//         .then(res => res.json())
//         .then(quotation => {
//             temp +=
//                 <tr>
//                     <td>${quotation.id}</td>
//                     <td>${quotation.name}</td>
//                 </tr>
//         })
// }