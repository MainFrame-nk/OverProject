async function createEvent(matchId) {
    await getNameTeam(matchId);
    $('#addEvent').click(async () =>  {
        let addEventForm = $('#addEventForm')
        let periodMatch = addEventForm.find('#periodMatchCreate').val().trim();
        let valueEvent = addEventForm.find('#valueEventCreate').val().trim();
        let selectedQuotationEvent = addEventForm.find('#quotationEventCreate').val();
        let matchEvent = await matchFetch.findOneMatch(matchId);

        if (!selectedQuotationEvent || selectedQuotationEvent.length === 0) {
            alert('Выберите котировку!');
            return;
        }

        let selectedTeamEvent = $('input[name=teamEventCreate]:checked').val();

        if (!selectedTeamEvent || selectedTeamEvent.length === 0) {
            alert('Выберите команду!');
            return;
        }

        let data = {
            periodMatch: periodMatch,
            valueEvent: valueEvent,
            teamEvent: selectedTeamEvent,
            quotationEvent: selectedQuotationEvent,
            matchEvent: matchEvent
        }

        const response = await eventFetch.addNewEvent(matchId, data);
        if (response.ok) {
            await getEvents();
            addEventForm.find('#periodMatchCreate').val('');
            addEventForm.find('#valueEventCreate').val('');
            addEventForm.find(selectedTeamEvent()).val('');
            addEventForm.find(selectedQuotationEvent()).val('');
            addEventForm.find('#matchEventCreate').val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         Событие успешно добавлено!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addEventForm.prepend(alert);
            $('.nav-tabs a[href="#eventTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            Ошибка в создании события!
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addEventForm.prepend(alert);
        }
    });
}