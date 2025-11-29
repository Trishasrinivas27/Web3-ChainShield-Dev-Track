const regex = /0x[a-fA-F0-9]{40}/g;

function scanPage() {
    const text = document.body.innerText;
    const matches = text.match(regex);

    if (!matches) return;

    [...new Set(matches)].forEach(address => {
        checkAddress(address);
    });
}

function checkAddress(address) {
    fetch("https://web3-chainshield-dev-track-production.up.railway.app/scan_contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
    })
    .then(res => res.json())
    .then(data => {
        if (data.risk > 0) {
            alert(`⚠ Scam Contract Detected!\n${address}\nIssues:\n${data.issues.join("\n")}`);
        }
    });
}

scanPage();
