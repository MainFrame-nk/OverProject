async function createCountry() {
    $('#addCountry').click(async () =>  {
        let addCountryForm = $('#addCountryForm')
        let nameCountry = addCountryForm.find('#nameCountryCreate').val().trim();
        let flag = addCountryForm.find('#flagCreate').val().trim();

        let data = {
            nameCountry: nameCountry,
            flag: flag
        }

        const response = await countryFetch.addNewCountry(data);
        if (response.ok) {
            await getCountries();
            addCountryForm.find('#nameCountryCreate').val('');
            addCountryForm.find('#flagCreate').val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Страна успешно добавлена!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addCountryForm.prepend(alert);
            $('.nav-tabs a[href="#countryTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка в добавлении страны!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addCountryForm.prepend(alert);
        }
    });
}