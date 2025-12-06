function showWarningPopup(address, riskScore) {
    let status = "";
    if (riskScore >= 71) status = "danger";
    else if (riskScore >= 41) status = "medium";
    else status = "safe";

    const popup = document.createElement("div");
    popup.className = `chainshield-popup ${status}`;

    popup.innerHTML = `
        <div class="cs-title">
            ${status === "danger" ? "🔴 High-Risk Contract!" :
             status === "medium" ? "🟡 Medium Risk Detected" :
             "🟢 Safe Contract Detected"}
        </div>

        <div class="cs-body">
            <b>Address:</b> ${address.slice(0, 10)}…<br>
            <b>Risk Score:</b> ${riskScore}%
        </div>

        <button class="cs-close-btn">✖</button>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".cs-close-btn").onclick = () => popup.remove();

    setTimeout(() => popup.remove(), 6000);
}

// Regex to match Ethereum addresses
const regex = /0x[a-fA-F0-9]{40}/g;

// Keep track of already scanned addresses to avoid repeated requests
let scannedAddresses = new Set();

// Function to scan the visible page text
function scanPage() {
    const text = document.body.innerText;
    const matches = text.match(regex);

    if (!matches) return;

    // Deduplicate
    const uniqueMatches = [...new Set(matches)];

    uniqueMatches.forEach(address => {
        if (!scannedAddresses.has(address)) {
            scannedAddresses.add(address);
            checkAddress(address);
        }
    });
}

// Function to send address to backend
function checkAddress(address) {
    fetch("https://web3-chainshield-dev-track-production.up.railway.app/scan_contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.log(`Error scanning ${address}: ${data.error}`);
            showWarningPopup(address, 0); // Show safe/neutral popup for non-verified
            return;
        }

        const riskScore = data.risk || 0;

        // 🔥 Show the beautiful popup UI
        showWarningPopup(address, riskScore);

        if (riskScore > 0) {
            console.warn(`⚠ Scam detected: ${address}`, data.issues);

            // Your own highlight function (keep it)
            highlightAddress(address);

        } else {
            console.log(`✔ Safe contract: ${address}`);
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
        showWarningPopup(address, 0); // fallback popup
    });
}


// Optional: highlight risky addresses on the page
function highlightAddress(address) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
        const node = walker.currentNode;
        if(node.nodeValue.includes(address)) {
            const span = document.createElement("span");
            span.style.backgroundColor = "red";
            span.style.color = "white";
            span.textContent = address;

            const parent = node.parentNode;
            const parts = node.nodeValue.split(address);
            for(let i = 0; i < parts.length - 1; i++) {
                parent.insertBefore(document.createTextNode(parts[i]), node);
                parent.insertBefore(span.cloneNode(true), node);
            }
            parent.insertBefore(document.createTextNode(parts[parts.length - 1]), node);
            parent.removeChild(node);
        }
    }
}

// Run scan on page load
scanPage();

// Optional: rescan periodically in case dynamic content is loaded
setInterval(scanPage, 5000); // every 5 seconds
