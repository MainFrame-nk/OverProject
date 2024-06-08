async function deleteCountry(modal, id) {
    let oneCountry = await countryFetch.findOneCountry(id);
    let country = oneCountry.json();

    modal.find('.modal-title').html('Убрать страну из Базы');

    let deleteButton = `<button  class="btn btn-danger" id="deleteCountryButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    country.then(country => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteCountry">
               <div class="form-group">
                    <label for="countryId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="countryId" value="${country.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameCountry" class="col-form-label">Страна</label>
                    <input type="text" class="form-control username" id="nameCountry" value="${country.nameCountry}" readonly>
               </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteCountryButton").on('click', async () => {
        const response = await countryFetch.deleteCountry(id);

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