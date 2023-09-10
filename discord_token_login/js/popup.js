// background
chrome.runtime.sendMessage({ popupOpen: true });
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false);

    function onclick() {
        var token = document.getElementById("token").value;
        chrome.tabs.getSelected(null, function (tab) {
            window.id = tab.id;
        });
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(window.id, token);
        });
        document.getElementById("status").innerHTML = "Connecting...";
        document.getElementById("status").style.color = "orange";
        chrome.runtime.sendMessage({ info: "clicked" });
    }
}, false);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.status === "connected") { // Corrected spelling of "connected"
        document.getElementById("status").innerHTML = "Connected to the Discord's API !"; // Corrected spelling of "Connected"
        document.getElementById("status").style.color = "green";
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.failed) {
        document.getElementById("status").innerHTML = "Connection failed!"; // Corrected spelling of "Connection"
        document.getElementById("status").style.color = "red";
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.alreadycon) {
        document.getElementById("status").innerHTML = "Connected to the Discord's API !"; // Corrected spelling of "Connected"
        document.getElementById("status").style.color = "green";
    }
});
