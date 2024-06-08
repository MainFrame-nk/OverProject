async function editQuotation(modal, id) {
    let oneQuotation = await quotationFetch.findOneQuotation(id);
    let quotation = oneQuotation.json();

    modal.find('.modal-title').html('Изменение котировки');

    let editButton = `<button  class="btn btn-info" id="editQuotationButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    quotation.then(quotation => {
        let bodyForm = `
            <form class="form-group text-center" id="editQuotation">
               <div class="form-group">
                    <label for="quotationId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="quotationId" value="${quotation.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="nameQuotation" class="col-form-label">Название котировки</label>
                    <input type="text" class="form-control username" id="nameQuotation" value="${quotation.nameQuotation}">
               </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editQuotationButton").on('click', async () => {
        let quotationId = modal.find("#quotationId").val().trim();
        let nameQuotation = modal.find("#nameQuotation").val().trim();
        let data = {
            quotationId: quotationId,
            nameQuotation: nameQuotation
        }
        const response = await quotationFetch.updateQuotation(data, id);

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