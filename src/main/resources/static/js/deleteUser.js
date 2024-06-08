async function deleteUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Удаление пользователя');

    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="userId" value="${user.id}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="firstname" class="col-form-label">Имя</label>
                    <input type="text" class="form-control username" id="firstname" value="${user.firstname}" readonly>
               </div>

                <div class="form-group">
                    <label for="lastname" class="com-form-label">Фамилия</label>
                    <input type="text" class="form-control" id="lastname" value="${user.lastname}" readonly>
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Возраст</label>
                    <input type="number" class="form-control" id="age" value="${user.age}" readonly>
                    <div class="invalid-feedback">
                        Возраст должен быть указан
                    </div>
                </div>

                <div class="form-group">
                    <label for="email" class="com-form-label">E-mail</label>
                    <input type="text" class="form-control" id="email" value="${user.email}"  readonly>
                </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton").on('click', async () => {
        const response = await userFetch.deleteUser(id);

        if (response.ok) {
            await getUsers();
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