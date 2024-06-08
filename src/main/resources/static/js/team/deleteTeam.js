async function deleteTeam(modal, id) {
    let oneTeam = await teamFetch.findOneTeam(id);
    let team = oneTeam.json();

    modal.find('.modal-title').html('Удаление команды');

    let deleteButton = `<button  class="btn btn-danger" id="deleteTeamButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    team.then(team => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteTeam"> 
               <div class="form-group">
                    <label for="teamId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="teamId" value="${team.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="name" class="col-form-label">Название</label>
                    <input type="text" class="form-control username" id="name" value="${team.name}" readonly>
               </div>
                <div class="form-group">
                    <label for="levelTeam" class="com-form-label">Уровень команды</label>
                    <input type="number" class="form-control" id="levelTeam" value="${team.levelTeam}" readonly>
                </div>
                <div class="form-group">
                    <label for="formTeam" class="com-form-label">Форма команды</label>
                    <input type="number" class="form-control" id="formTeam" value="${team.formTeam}"  readonly>
                </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteTeamButton").on('click', async () => {
        const response = await teamFetch.deleteTeam(id);

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