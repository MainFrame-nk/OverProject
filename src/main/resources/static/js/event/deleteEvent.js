async function deleteEvent(modal, id) {
    let oneEvent = await eventFetch.findOneEvent(id);
    let event = oneEvent.json();

    modal.find('.modal-title').html('Удаление события');

    let deleteButton = `<button  class="btn btn-danger" id="deleteEventButton">Удалить</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    event.then(event => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteEvent">
               <div class="form-group">
                    <label for="eventId" class="col-form-label">Id</label>
                    <input type="text" class="form-control username" id="eventId" value="${event.id}" readonly>
               </div>
               <div class="form-group">
                    <label for="teamEvent" class="col-form-label">Команда</label>
                    <input type="text" class="form-control username" id="teamEvent" value="${event.teamEvent.name}" readonly>
               </div>
               <div class="form-group">
                    <label for="periodMatch" class="col-form-label">Период</label>
                    <input type="text" class="form-control username" id="periodMatch" value="${event.periodMatch}" readonly>
               </div>
               <div class="form-group">
                    <label for="quotationEvent" class="col-form-label">Котировка</label>
                    <input type="text" class="form-control username" id="quotationEvent" value="${event.quotationEvent.nameQuotation}" readonly>
               </div>
                <div class="form-group">
                    <label for="valueEvent" class="com-form-label">Значение</label>
                    <input type="text" class="form-control" id="valueEvent" value="${event.valueEvent}" readonly>
                </div>
            </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteEventButton").on('click', async () => {
        const response = await eventFetch.deleteEvent(id);

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