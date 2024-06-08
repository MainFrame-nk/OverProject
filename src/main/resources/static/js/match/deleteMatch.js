async function deleteMatch(modal, id) {
    let oneMatch = await matchFetch.findOneMatch(id);
    let match = oneMatch.json();

    modal.find('.modal-title').html('Удаление матча');

    let deleteButton = `<button  class="btn btn-danger" id="deleteMatchButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    match.then(match => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteMatch">
               <div class="form-group">
                    <label for="matchId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="matchId" value="${match.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="dateTimeMatch" class="col-form-label">Дата</label>
                    <input type="text" class="form-control username" id="dateTimeMatch" value="${match.dateTimeMatch}" readonly>
               </div>
                <div class="form-group">
                    <label for="leagueMatch" class="com-form-label">Лига</label>
                    <input type="text" class="form-control" id="leagueMatch" value="${match.leagueMatch.nameLeague}" readonly>
                </div>
                <div class="form-group">
                    <label for="homeTeam" class="com-form-label">Хозяева</label>
                    <input type="text" class="form-control" id="homeTeam" value="${match.homeTeam.name}" readonly>
                </div>
                 <div class="form-group">
                    <label for="guestTeam" class="com-form-label">Гости</label>
                    <input type="text" class="form-control" id="guestTeam" value="${match.guestTeam.name}" readonly>
                </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteMatchButton").on('click', async () => {
        const response = await matchFetch.deleteMatch(id);

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