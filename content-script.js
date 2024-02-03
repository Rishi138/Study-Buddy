var loadFunction = window.onload;
window.onload = function(event) {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === 'popupOpened') {
            var allText = document.body.innerText;
            console.log(allText);
            chrome.runtime.sendMessage({message: allText})
            console.log('Popup opened!');
      }
    });
    if (loadFunction) loadFunction(event);
};


