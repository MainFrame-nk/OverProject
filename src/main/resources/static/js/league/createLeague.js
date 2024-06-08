async function createLeague() {
    $('#addLeague').click(async () =>  {
        let addLeagueForm = $('#addLeagueForm')
        let nameLeague = addLeagueForm.find('#nameLeagueCreate').val().trim();
        let selectedCountryLeague = addLeagueForm.find('#countryLeagueCreate').val();

        if (!selectedCountryLeague || selectedCountryLeague.length === 0) {
            alert('Выберите страну!');
            return;
        }

        let data = {
            nameLeague: nameLeague,
            countryLeague: selectedCountryLeague
        }

        const response = await leagueFetch.addNewLeague(data);
        if (response.ok) {
            await getLeagues();
            addLeagueForm.find('#nameLeagueCreate').val('');
            addLeagueForm.find(selectedCountryLeague()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Лига успешно создана!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addLeagueForm.prepend(alert);
            $('.nav-tabs a[href="#leagueTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка в создании лиги!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addLeagueForm.prepend(alert);
        }
    });
}