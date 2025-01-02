(async function () {
    const client = ZAFClient.init();
    const metadata = await client.metadata();
    client.invoke('resize', { width: '100%', height: '120px' });
    client.get('ticket.id').then(
        function(data) {
            const ticketId = data['ticket.id'];
            requestTicketAnswers(client, metadata, ticketId);
        }
    );
})();

function showAnswers(answerResponse) {
    const answer = answerResponse.results[0];
    const answerData = {
        'field': answer.field,
        'value': answer.value,
        'justification': answer.justification
    };

    const source = document.getElementById("answers-template").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("content").innerHTML = template(answerData);
}

function showError(response) {
    const error_data = {
        'status': response.status,
        'statusText': response.statusText
    };

    const source = document.getElementById("error-template").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("content").innerHTML = template(error_data);
}

function requestTicketAnswers(client, metadata, ticketId) {
    const settings = {
        url: 'https://exacttempo-api.ngrok.io/zendesk/ui/ticket-field-answers',
        type: 'POST',
        headers: {
            'X-ZEN-EXACTTEMPO': typeof metadata.installationId === "string" ? 
                metadata.settings.shared_secret : "{{setting.shared_secret}}"
        },
        secure: !(typeof metadata.installationId === "string"),
        dataType: 'json',
    };
    
    client.request(settings).then(
        function(data) {
            showAnswers(data);
        },
        function(response) {
            console.error(response);
            showError(response);
        }
    );
}