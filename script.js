let documentText;

document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'popupOpened' });
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        documentText = message.message;
        initializeConversation(documentText);
    });

    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            let message = $("#questionInput").val();
            $("#questionInput").val("");
            message = message.replaceAll("<", "&lt;");
            if (message == "") {
                console.log("user attempted to send invalid");
            } else {
                sendUserMessage(message);
                document.getElementById("questionInput").disabled = true;
                askQuestion(message);
                document.getElementById("questionInput").disabled = false;
            }
        }
    });
});

async function initializeConversation(article) {
    const response = await fetch(`http://127.0.0.1:5000/init?article=${encodeURIComponent(article)}`);
    const data = await response.json();
    console.log(data.message);
    if(data.message == "error"){
        sendModelMessage("The article provided is too long for me to process!")
    }
}

async function askQuestion(question) {
    const response = await fetch(`http://127.0.0.1:5000/reply?question=${encodeURIComponent(question)}`);
    const data = await response.json();
    sendModelMessage(data.response);
}

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
