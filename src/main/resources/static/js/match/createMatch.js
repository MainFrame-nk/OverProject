async function createMatch() {
    $('#addMatch').click(async () =>  {
        let addMatchForm = $('#addMatchForm')
        let dateTimeMatch = addMatchForm.find('#dateTimeMatchCreate').val().trim();
        let selectedLeagueMatch = addMatchForm.find('#leagueMatchCreate').val();
        let selectedHomeTeamMatch = addMatchForm.find('#homeTeamCreate').val();
        let selectedGuestTeamMatch = addMatchForm.find('#guestTeamCreate').val();

        if (!selectedLeagueMatch || selectedLeagueMatch.length === 0) {
            alert('Выберите лигу!');
            return;
        }

        if (!selectedHomeTeamMatch || selectedHomeTeamMatch.length === 0) {
            alert('Выберите команду-хозяев!');
            return;
        }

        if (!selectedGuestTeamMatch || selectedGuestTeamMatch.length === 0) {
            alert('Выберите команду-гостей!');
            return;
        }

        let data = {
            dateTimeMatch: dateTimeMatch,
            leagueMatch: selectedLeagueMatch,
            homeTeam: selectedHomeTeamMatch,
            guestTeam: selectedGuestTeamMatch
        }

        const response = await matchFetch.addNewMatch(data);
        if (response.ok) {
            let data1 = {
                periodMatch: 0,
                valueEvent: 0,
                teamEvent: selectedHomeTeamMatch,
                quotationEvent: 1
            }
            const response1 = await eventFetch.addNewEvent(data1);

            let data2 = {
                periodMatch: 0,
                valueEvent: 0,
                teamEvent: selectedGuestTeamMatch,
                quotationEvent: 1
            }
            const response2 = await eventFetch.addNewEvent(data2);

            if (response1.ok && response2.ok) {
                await getEvents();
            }
            await getMatches();
            addMatchForm.find('#dateTimeMatchCreate').val('');
            addMatchForm.find(selectedLeagueMatch()).val('');
            addMatchForm.find(selectedHomeTeamMatch()).val('');
            addMatchForm.find(selectedGuestTeamMatch()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Матч успешно создан!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addMatchForm.prepend(alert);
            $('.nav-tabs a[href="#matchTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка в создании матча!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addMatchForm.prepend(alert);
        }
    });
}