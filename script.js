function sendUserMessage(message) {
    $("#messageContainer").append(`<div class="userMessage">${message}</div><br><br>`);
    scrollToBottom();
}

function sendModelMessage(message) {
    $("#messageContainer").append(`<div class="modelMessage">${message}</div><br>`);
    scrollToBottom();
}

function scrollToBottom() {
   var container = document.getElementById('messageContainer');
   container.scrollTop = container.scrollHeight;
}

$(document).on('keypress', function(e) {
    if (e.which == 13) {
        let message = $("#questionInput").val();
        $("#questionInput").val("");
        message = message.replaceAll("<", "&lt;");
        if (message == "") {
            console.log("user attempted to send invalid");
        } else {
            sendUserMessage(message);
        }
    }
});
