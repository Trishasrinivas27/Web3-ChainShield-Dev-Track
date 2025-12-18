// ================== ETH ADDRESS REGEX ==================
const ETH_ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/g;

// ================== SCANNED CACHE ==================
const scannedAddresses = new Set();

// ================== PAGE SCANNER ==================
function scanPage() {
    const text = document.body.innerText;
    const matches = text.match(ETH_ADDRESS_REGEX);

    if (!matches) return;

    const uniqueAddresses = [...new Set(matches)];

    uniqueAddresses.forEach(address => {
        if (!scannedAddresses.has(address)) {
            scannedAddresses.add(address);
            checkAddress(address);
        }
    });
}

// ================== BACKEND CHECK ==================
function checkAddress(address) {
    fetch("https://web3-chainshield-dev-track-production.up.railway.app/check_address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
    })
    .then(res => res.json())
    .then(data => {
        // ✅ Ensure response is valid
        if (!data || !data.status) {
            console.warn("Invalid backend response for:", address);
            return;
        }

        // 🔴 Malicious verified → highlight RED
        if (data.status === "MALICIOUS") {
            console.warn("⚠ MALICIOUS CONTRACT:", address, data.reason);
            highlightAddress(address);
        }
        // 🟢 Safe verified → console log only
        else if (data.status === "SAFE") {
            console.log("✔ SAFE CONTRACT:", address);
        }
        // ⚪ Not verified → console log only
        else if (data.status === "NOT_VERIFIED") {
            console.log("ℹ NOT VERIFIED:", address);
        }
    })
    .catch(err => {
        console.error("Backend error (ignored):", err);
    });
}

// ================== HIGHLIGHT MALICIOUS ==================
function highlightAddress(address) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    while (walker.nextNode()) {
        const node = walker.currentNode;

        if (!node.nodeValue.includes(address)) continue;

        const parent = node.parentNode;
        const parts = node.nodeValue.split(address);

        for (let i = 0; i < parts.length - 1; i++) {
            parent.insertBefore(document.createTextNode(parts[i]), node);

            const span = document.createElement("span");
            span.textContent = address;
            span.style.backgroundColor = "red";
            span.style.color = "white";
            span.style.padding = "2px 4px";
            span.style.borderRadius = "4px";
            span.style.fontWeight = "bold";

            parent.insertBefore(span, node);
        }

        parent.insertBefore(
            document.createTextNode(parts[parts.length - 1]),
            node
        );

        parent.removeChild(node);
    }
}

// ================== START ==================
scanPage();
setInterval(scanPage, 5000); // support dynamic content
