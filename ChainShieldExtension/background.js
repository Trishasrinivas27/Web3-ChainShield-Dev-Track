console.log("🧠 Background service worker started");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "CHECK_ADDRESS") {
        fetch("https://web3-chainshield-dev-track-production.up.railway.app/check_address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: msg.address })
        })
        .then(res => res.json())
        .then(data => {
            console.log("📡 Backend reply:", data);
            sendResponse(data);
        })
        .catch(err => {
            console.error("❌ Backend fetch failed:", err);
            sendResponse(null);
        });
        return true;
    }
});
