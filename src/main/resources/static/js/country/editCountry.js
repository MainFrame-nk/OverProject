async function editCountry(modal, id) {
    let oneCountry = await countryFetch.findOneCountry(id);
    let country = oneCountry.json();

    modal.find('.modal-title').html('Изменение данных страны');

    let editButton = `<button  class="btn btn-info" id="editCountryButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    country.then(country => {
        let bodyForm = `
            <form class="form-group text-center" id="editCountry">
               <div class="form-group">
                    <label for="countryId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="countryId" value="${country.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameCountry" class="col-form-label">Страна</label>
                    <input type="text" class="form-control username" id="nameCountry" value="${country.nameCountry}">
               </div>
                <div class="form-group">
                    <label for="flag" class="com-form-label">Флаг</label>
                    <input type="file" class="form-control" id="flag" value="${country.flag}">
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editCountryButton").on('click', async () => {
        let countryId = modal.find("#countryId").val().trim();
        let nameCountry = modal.find("#nameCountry").val().trim();
        let flag = modal.find("#flagCountry").val().trim();
        let data = {
            countryId: countryId,
            nameCountry: nameCountry,
            flag: flag
        }
        const response = await countryFetch.updateCountry(data, id);

        if (response.ok) {
            await getCountries();
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