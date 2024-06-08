async function editEvent(modal, id) {
    let oneEvent = await eventFetch.findOneEvent(id);
    let event = oneEvent.json();

    modal.find('.modal-title').html('Изменение события');

    let editButton = `<button  class="btn btn-info" id="editEventButton">Изменить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    let temp = '';
    await quotationFetch.getAllQuotes()
        .then(res => res.json())
        .then(quotes => {
            quotes.forEach(quotation => {
                temp += `
                      <option value="${quotation.id}">${quotation.nameQuotation}</option>
            `;
            })
        })
    temp += `</select>
            </div>
        </form>`;
    event.then(event => {
        let bodyForm = `
            <form class="form-group text-center" id="editEvent">
               <div class="form-group">
                    <label for="eventId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="eventId" value="${event.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="teamEvent" class="col-form-label">Команда</label>
                    <input type="text" class="form-control username" id="teamEvent" value="${event.teamEvent.id}" readonly>${event.teamEvent.name}
               </div>
               <div class="form-group">
                    <label for="periodMatch" class="col-form-label">Период матча</label>
                    <input type="text" class="form-control username" id="periodMatch" value="${event.periodMatch}">
               </div>
               <div class="form-group">
                    <label for="valueEvent" class="col-form-label">Значение</label>
                    <input type="text" class="form-control username" id="valueEvent" value="${event.valueEvent}">
               </div>
               <div class="form-group">
                    <label for="quotationEvent" class="com-form-label">Котировка</label>
                    <select id="quotationEvent" size="10" class="form-control" style="max-height: 100px">
        `;
        modal.find('.modal-body').append(bodyForm + temp);
    })

    $("#editEventButton").on('click', async () => {
        let selectedQuotationEvent = $('#quotationEvent').val();

        if (!selectedQuotationEvent || selectedQuotationEvent.length === 0) {
            alert('Выберите событие!');
            return;
        }
        let eventId = modal.find("#eventId").val().trim();
        let periodMatch = modal.find("#periodMatch").val().trim();
        let valueEvent = modal.find("#valueEvent").val().trim();
        let teamEvent = modal.find("#teamEvent").val();
        let data = {
            eventId: eventId,
            periodMatch: periodMatch,
            valueEvent: valueEvent,
            teamEvent: teamEvent,
            quotationEvent: selectedQuotationEvent
        }
        const response = await eventFetch.updateEvent(data, id);

        if (response.ok) {
            await getEvents();
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