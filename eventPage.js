// Check that options are set. If not, set them using the defaults from options.js
for (key in defaults) {
    if (!localStorage[key]) {
        localStorage[key] = defaults[key];
    }
}

// Called when a message is passed.
function onMessage(request, sender, sendResponse) {
    if (request.action == 'options') {
        // Send the localStorage variable to the content script so that it
        // can use the options set in the options page
        sendResponse({ options: localStorage });
    } else if (request.action == 'showPageAction') {
        // Show the page action for the tab that the sender (content script)
        // was on.
        chrome.pageAction.show(sender.tab.id);
    }

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
}

// Listen for the content script to send a message to the background page.
chrome.extension.onMessage.addListener(onMessage);
