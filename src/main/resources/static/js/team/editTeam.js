async function editTeam(modal, id) {
    let oneTeam = await teamFetch.findOneTeam(id);
    let team = oneTeam.json();

    modal.find('.modal-title').html('Изменение команды');

    let editButton = `<button  class="btn btn-info" id="editTeamButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    let temp = '';
    await leagueFetch.getAllLeagues()
        .then(res => res.json())
        .then(leagues => {
            leagues.forEach(league => {
            temp += `
                      <option value="${league.id}">${league.nameLeague}</option>
            `;
        })
    })
    temp += `</select>
            </div>
        </form>`;
    team.then(team => {
        let bodyForm = `
            <form class="form-group text-center" id="editTeam">
               <div class="form-group">
                    <label for="teamId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="teamId" value="${team.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="name" class="col-form-label">Название</label>
                    <input type="text" class="form-control username" id="name" value="${team.name}">
               </div>
                <div class="form-group">
                    <label for="levelTeam" class="com-form-label">Уровень команды</label>
                    <input type="number" class="form-control" id="levelTeam" value="${team.levelTeam}">
                </div>
                <div class="form-group">
                    <label for="formTeam" class="com-form-label">Форма команды</label>
                    <input type="number" class="form-control" id="formTeam" value="${team.formTeam}">
                </div>
                <div class="form-group">
                    <label for="leagueTeam" class="com-form-label">Лига</label>
                    <select multiple id="leagueTeam" size="10" class="form-control" style="max-height: 100px">
        `;
        modal.find('.modal-body').append(bodyForm + temp);
    })

    $("#editTeamButton").on('click', async () => {
        let selectedLeagueTeam = $('#leagueTeam').val();

        if (!selectedLeagueTeam || selectedLeagueTeam.length === 0) {
            alert('Выберите лигу.');
            return;
        }
        let teamId = modal.find("#teamId").val().trim();
        let name = modal.find("#name").val().trim();
        let levelTeam = modal.find("#levelTeam").val().trim();
        let formTeam = modal.find("#formTeam").val().trim();
        let data = {
            teamId: teamId,
            name: name,
            leagueTeam: selectedLeagueTeam,
            levelTeam: levelTeam,
            formTeam: formTeam
        }
        const response = await teamFetch.updateTeam(data, id);

        if (response.ok) {
            await getTeams();
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