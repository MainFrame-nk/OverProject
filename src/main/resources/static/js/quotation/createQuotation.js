async function createQuotation() {
    $('#addQuotation').click(async () =>  {
        let addQuotationForm = $('#addQuotationForm')
        let nameQuotation = addQuotationForm.find('#nameQuotationCreate').val().trim();

        let data = {
            nameQuotation: nameQuotation
        }

        const response = await quotationFetch.addNewQuotation(data);
        if (response.ok) {
            await getQuotes();
            addQuotationForm.find('#nameEventQuoCreate').val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Котировка успешно создана!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addQuotationForm.prepend(alert);
            // $('.nav-tabs a[href="#quotationTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка при создании котировки!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addQuotationForm.prepend(alert);
        }
    });
}