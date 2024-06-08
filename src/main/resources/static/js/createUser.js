async function createUser() {
    $('#addUser').click(async () =>  {
        let addUserForm = $('#addForm')
        let firstname = addUserForm.find('#firstnameCreate').val().trim();
        let lastname = addUserForm.find('#lastnameCreate').val().trim();
        let age = addUserForm.find('#ageCreate').val().trim();
        let email = addUserForm.find('#emailCreate').val().trim();
        let password = addUserForm.find('#passwordCreate').val().trim();
        let selectedRoles = addUserForm.find('#rolesCreate').val();

        if (!selectedRoles || selectedRoles.length === 0) {
            alert('Выберите одну из ролей для пользователя.'); // Проверить, выбраны ли роли
            return;
        }

        let data = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            email: email,
            password: password,
            roles: selectedRoles
        }

        const response = await userFetch.addNewUser(data);
        if (response.ok) {
            await getUsers();
            addUserForm.find('#firstnameCreate').val('');
            addUserForm.find('#lastnameCreate').val('');
            addUserForm.find('#ageCreate').val('');
            addUserForm.find('#emailCreate').val('');
            addUserForm.find(selectedRoles()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Пользователь успешно создан!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
            $('.nav-tabs a[href="#adminTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
        }
    });
}