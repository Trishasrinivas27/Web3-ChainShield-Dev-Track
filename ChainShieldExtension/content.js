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
                return;
            }

            if (data.risk > 0) {
                console.warn(`⚠ Scam detected: ${address}`, data.issues);
                // Optional: highlight the address on the page
                highlightAddress(address);
            } else {
                console.log(`✔ Safe contract: ${address}`);
            }
        })
        .catch(err => console.error("Fetch error:", err));
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
