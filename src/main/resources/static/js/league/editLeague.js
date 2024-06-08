async function editLeague(modal, id) {
    let oneLeague = await leagueFetch.findOneLeague(id);
    let league = oneLeague.json();

    modal.find('.modal-title').html('Изменение лиги');

    let editButton = `<button  class="btn btn-info" id="editLeagueButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    let temp = '';
    await countryFetch.getAllCountries()
        .then(res => res.json())
        .then(countries => {
            countries.forEach(country => {
                temp += `
                      <option value="${country.id}">${country.nameCountry}</option>
            `;
            })
        })
    temp += `</select>
            </div>
        </form>`;
    league.then(league => {
        let bodyForm = `
            <form class="form-group text-center" id="editLeague">
               <div class="form-group">
                    <label for="leagueId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="leagueId" value="${league.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameLeague" class="col-form-label">Название лиги</label>
                    <input type="text" class="form-control username" id="nameLeague" value="${league.nameLeague}">
               </div>
               <div class="form-group">
                    <label for="countryLeague" class="com-form-label">Страна</label>
                    <select id="countryLeague" size="10" class="form-control" style="max-height: 100px">
        `;
        modal.find('.modal-body').append(bodyForm + temp);
    })

    $("#editLeagueButton").on('click', async () => {
        let selectedCountryLeague = $('#countryLeague').val();

        if (!selectedCountryLeague || selectedCountryLeague.length === 0) {
            alert('Выберите страну!');
            return;
        }
        let leagueId = modal.find("#leagueId").val().trim();
        let nameLeague = modal.find("#nameLeague").val().trim();
        let data = {
            leagueId: leagueId,
            nameLeague: nameLeague,
            countryLeague: selectedCountryLeague
        }
        const response = await leagueFetch.updateLeague(data, id);

        if (response.ok) {
            await getLeagues();
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