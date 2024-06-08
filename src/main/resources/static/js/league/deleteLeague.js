async function deleteLeague(modal, id) {
    let oneLeague = await leagueFetch.findOneLeague(id);
    let league = oneLeague.json();

    modal.find('.modal-title').html('Удаление лиги');

    let deleteButton = `<button  class="btn btn-danger" id="deleteLeagueButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    league.then(league => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteLeague">
               <div class="form-group">
                    <label for="leagueId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="leagueId" value="${league.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameLeague" class="col-form-label">Название лиги</label>
                    <input type="text" class="form-control username" id="nameLeague" value="${league.nameLeague}" readonly>
               </div>
                <div class="form-group">
                    <label for="countryLeague" class="com-form-label">Страна</label>
                    <input type="text" class="form-control" id="countryLeague" value="${league.countryLeague.nameCountry}" readonly>
                </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteLeagueButton").on('click', async () => {
        const response = await leagueFetch.deleteLeague(id);

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