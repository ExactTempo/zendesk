(async function () {
    const client = ZAFClient.init();
    const context = await client.context();
    const subdomain = context.account.subdomain;
    client.get("ticket.id").then(
        function(data) {
            const ticketId = data["ticket.id"];
            requestTicketAnswers(client, subdomain, ticketId);
        }
    );
})();

function showAnswers(answerResponse) {
    const answerData = {
        "answers": answerResponse.results
    };

    const source = document.getElementById("answers-template").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("content").innerHTML = template(answerData);
}

function showError(response) {
    const error_data = {
        "status": response.status,
        "statusText": response.statusText
    };

    const source = document.getElementById("error-template").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("content").innerHTML = template(error_data);
}

function requestTicketAnswers(client, subdomain, ticketId) {
    const domain = subdomain === "d3v-exacttempo" ? 
        "exacttempo-api.ngrok.io" : "api.exacttempo.com";
    const settings = {
        url: `https://${domain}/zendesk/ui/${subdomain}/ticket-field-answers/${ticketId}`,
        type: "GET",
        headers: {
            Authorization: "Bearer {{jwt.token}}",
        },
        jwt: {
            algorithm: "HS256",
            secret_key: "{{setting.shared_secret}}",
            claims: {
                ticketId: ticketId
            }
        },
        secure: true,
        dataType: "json",
    };
    
    client.request(settings).then(
        function(data) {
            const answerCount = data.results.length;
            let height = answerCount > 0 ? answerCount * 150 : 150;
            height = height > 500 ? 500 : height;
            client.invoke("resize", { width: "100%", height: `${height}px` });
            showAnswers(data);
        },
        function(response) {
            console.error(response);
            showError(response);
        }
    );
}