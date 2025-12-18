console.log("🔥 ChainShield content script loaded");

const ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/g;
const scanned = new Set();

// ================= SCAN PAGE =================
function scanPage() {
    const text = document.body.innerText || "";
    const found = text.match(ADDRESS_REGEX) || [];

    const addresses = [...new Set(found.map(a => a.toLowerCase()))];

    addresses.forEach(address => {
        if (scanned.has(address)) return;
        scanned.add(address);

        console.log("📡 Checking:", address);

        fetch("https://web3-chainshield-dev-track-production.up.railway.app/scan_contract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address })
        })
        .then(res => res.json())
        .then(data => {
            console.log("📥 Backend response:", data);

            // ❌ Not verified
            if (data.error) {
                console.log("ℹ NOT VERIFIED:", address);
                return;
            }

            // 🚨 MALICIOUS
            if (data.risk > 0) {
                console.warn("🚨 MALICIOUS CONTRACT:", address);
                console.warn("Issues:", data.issues);
                highlightRed(address);
            }

            // ✅ SAFE
            else {
                console.log("✅ SAFE CONTRACT:", address);
            }
        })
        .catch(err => console.error("❌ Backend error:", err));
    });
}

// ================= RED HIGHLIGHT =================
function highlightRed(address) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.nodeValue.includes(address)) continue;

        const span = document.createElement("span");
        span.textContent = address;
        span.style.background = "red";
        span.style.color = "white";
        span.style.fontWeight = "bold";
        span.style.padding = "2px 4px";
        span.style.borderRadius = "4px";

        node.parentNode.replaceChild(span, node);
    }
}

// ================= START =================
scanPage();
setInterval(scanPage, 5000);
