async function deleteQuotation(modal, id) {
    let oneQuotation = await quotationFetch.findOneQuotation(id);
    let quotation = oneQuotation.json();

    modal.find('.modal-title').html('Удаление котировки');

    let deleteButton = `<button  class="btn btn-danger" id="deleteQuotationButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    quotation.then(quotation => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteQuotation"> 
               <div class="form-group">
                    <label for="quotationId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="quotationId" value="${quotation.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameQuotation" class="col-form-label">Название котировки</label>
                    <input type="text" class="form-control username" id="nameQuotation" value="${quotation.nameQuotation}" readonly>
               </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteQuotationButton").on('click', async () => {
        const response = await quotationFetch.deleteQuotation(id);

        if (response.ok) {
            await getQuotes();
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