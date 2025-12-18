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

        fetch("https://web3-chainshield-dev-track-production.up.railway.app/check_address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address })
        })
        .then(res => res.json())
        .then(data => {
            if (!data || !data.status) {
                console.warn("❌ Invalid backend response:", address);
                return;
            }

            // 🚨 MALICIOUS
            if (data.status === "MALICIOUS") {
                console.warn(
                    "🚨 MALICIOUS CONTRACT:",
                    address,
                    "\nReasons:",
                    data.issues
                );
                highlightRed(address);
            }

            // ✅ SAFE
            else if (data.status === "SAFE") {
                console.log("✅ SAFE CONTRACT:", address);
            }

            // ℹ NOT VERIFIED
            else if (data.status === "NOT_VERIFIED") {
                console.log("ℹ NOT VERIFIED:", address);
            }
        })
        .catch(err => console.error("Backend error:", err));
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
