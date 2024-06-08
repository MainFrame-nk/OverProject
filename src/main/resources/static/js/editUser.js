async function editUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Изменение пользователя');

    let editButton = `<button  class="btn btn-info" id="editButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="userId" value="${user.id}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="firstname" class="col-form-label">Имя</label>
                    <input type="text" class="form-control username" id="firstname" value="${user.firstname}">
               </div>

                <div class="form-group">
                    <label for="lastname" class="com-form-label">Фамилия</label>
                    <input type="text" class="form-control" id="lastname" value="${user.lastname}">
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Возраст</label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>

                <div class="form-group">
                    <label for="email" class="com-form-label">E-mail</label>
                    <input type="text" class="form-control" id="email" value="${user.email}">
                </div>
                
                <div class="form-group">
                    <label for="password" class="com-form-label">Пароль</label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>
                
                <div class="form-group">
                    <label for="roles" class="com-form-label">Роль</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px">
                        <option value="ROLE_USER">Пользователь</option>
                        <option value="ROLE_ADMIN">Администратор</option>
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let selectedRoles = $('#roles').val();

        if (!selectedRoles || selectedRoles.length === 0) {
            alert('Выберите одну из ролей для пользователя.');
            return;
        }
        let userId = modal.find("#userId").val().trim();
        let firstname = modal.find("#firstname").val().trim();
        let lastname = modal.find("#lastname").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim(); // Получить значение поля с паролем
        let data = {
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            age: age,
            email: email,
            password: password,
            roles: selectedRoles
        }
        const response = await userFetch.updateUser(data, id);

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