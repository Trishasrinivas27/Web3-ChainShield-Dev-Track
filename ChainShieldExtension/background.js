chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CHECK_ADDRESS") {
        fetch("https://web3-chainshield-dev-track-production.up.railway.app/check_address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: message.address })
        })
        .then(res => res.json())
        .then(data => sendResponse(data))
        .catch(err => {
            console.error("Backend error:", err);
            sendResponse(null);
        });

        return true; // keep channel open
    }
});
