async function createTeam() {
    $('#addTeam').click(async () =>  {
        let addTeamForm = $('#addTeamForm')
        let name = addTeamForm.find('#nameCreate').val().trim();
        let levelTeam = addTeamForm.find('#levelTeamCreate').val().trim();
        let formTeam = addTeamForm.find('#formTeamCreate').val().trim();
        let selectedLeagueTeam = addTeamForm.find('#leagueTeamCreate').val();

        if (!selectedLeagueTeam || selectedLeagueTeam.length === 0) {
            alert('Выберите лигу.');
            return;
        }

        let data = {
            name: name,
            leagueTeam: selectedLeagueTeam,
            levelTeam: levelTeam,
            formTeam: formTeam
        }

        const response = await teamFetch.addNewTeam(data);
        if (response.ok) {
            await getTeams();
            addTeamForm.find('#nameCreate').val('');
            addTeamForm.find(selectedLeagueTeam()).val('');``
            addTeamForm.find('#levelTeamCreate').val('');
            addTeamForm.find('#formTeamCreate').val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Команда успешно создана!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addTeamForm.prepend(alert);
            $('.nav-tabs a[href="#teamTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка при создании!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addTeamForm.prepend(alert);
        }
    });
}