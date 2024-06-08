async function editMatch(modal, id) {
    let oneMatch = await matchFetch.findOneMatch(id);
    let match = oneMatch.json();

    modal.find('.modal-title').html('Изменение матча');

    let editButton = `<button  class="btn btn-info" id="editMatchButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    let leag = '';
    await leagueFetch.getAllLeagues()
        .then(res => res.json())
        .then(leagues => {
            leagues.forEach(league => {
                leag += `
                      <option value="${league.id}">${league.nameLeague}</option>
            `;
            })
        })
    leag += `</select>
            </div>
            <div class="form-group">
                    <label for="homeTeam" class="com-form-label">Хозяева</label>
                    <select id="homeTeam" size="10" class="form-control" style="max-height: 100px">
            `;
    let hTeam = '';
    let gTeam = '';
    await teamFetch.getAllTeams()
        .then(res => res.json())
        .then(teams => {
            teams.forEach(team => {
                hTeam += `
                      <option value="${team.id}">${team.name}</option>
            `;
                gTeam += `
                      <option value="${team.id}">${team.name}</option>
            `;
            })
        })
    hTeam += `</select>
            </div>
             <div class="form-group">
                    <label for="guestTeam" class="com-form-label">Гости</label>
                    <select id="guestTeam" size="10" class="form-control" style="max-height: 100px">
            `;
    gTeam += `</select>
            </div>
        </form>`;
    match.then(match => {
        let bodyForm = `
            <form class="form-group text-center" id="editMatch">
               <div class="form-group">
                    <label for="matchId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="matchId" value="${match.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="dateTimeMatch" class="col-form-label">Дата</label>
                    <input type="datetime-local" class="form-control username" id="dateTimeMatch" value="${match.dateTimeMatch}">
               </div>
                <div class="form-group">
                    <label for="leagueMatch" class="com-form-label">Лига</label>
                    <select id="leagueMatch" size="10" class="form-control" style="max-height: 100px">
        `;
        modal.find('.modal-body').append(bodyForm + leag + hTeam + gTeam);
    })

    $("#editMatchButton").on('click', async () => {
        let selectedLeagueMatch = $('#leagueMatch').val();

        if (!selectedLeagueMatch || selectedLeagueMatch.length === 0) {
            alert('Выберите лигу!');
            return;
        }

        let selectedHomeTeam = $('#homeTeam').val();

        if (!selectedHomeTeam || selectedHomeTeam.length === 0) {
            alert('Выберите хозяев!');
            return;
        }

        let selectedGuestTeam = $('#guestTeam').val();

        if (!selectedGuestTeam || selectedGuestTeam.length === 0) {
            alert('Выберите гостей!');
            return;
        }

        let matchId = modal.find("#matchId").val().trim();
        let dateTimeMatch = modal.find("#dateTimeMatch").val().trim();
        let data = {
            matchId: matchId,
            dateTimeMatch: dateTimeMatch,
            leagueMatch: selectedLeagueMatch,
            homeTeam: selectedHomeTeam,
            guestTeam: selectedGuestTeam
        }
        const response = await matchFetch.updateMatch(data, id);

        if (response.ok) {
            await getMatches();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}