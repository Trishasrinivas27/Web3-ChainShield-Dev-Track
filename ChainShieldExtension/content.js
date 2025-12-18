console.log("🔥 ChainShield content script loaded");

const ETH_ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/g;
const scanned = new Set();

// =================== GET ALL TEXT NODES ===================
function getAllTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode.nodeValue);
    return nodes;
}

// =================== SCAN PAGE ===================
function scanPage() {
    const texts = getAllTextNodes();
    const matches = texts.flatMap(t => (t.match(ETH_ADDRESS_REGEX) || []));
    const uniqueMatches = [...new Set(matches)];

    if (uniqueMatches.length === 0) return;

    console.log("🔎 Found addresses:", uniqueMatches);

    uniqueMatches.forEach(address => {
        if (scanned.has(address)) return;
        scanned.add(address);
        console.log("📡 Checking address:", address);

        // Send to background script
        chrome.runtime.sendMessage(
            { type: "CHECK_ADDRESS", address },
            response => {
                if (!response || !response.status) return;

                if (response.status === "MALICIOUS") {
                    console.warn("🚨 MALICIOUS CONTRACT:", address, response.reason);
                    highlightRed(address);
                } else if (response.status === "SAFE") {
                    console.log("✅ SAFE CONTRACT:", address);
                } else if (response.status === "NOT_VERIFIED") {
                    console.log("ℹ NOT VERIFIED:", address);
                }
            }
        );
    });
}

// =================== HIGHLIGHT MALICIOUS ===================
function highlightRed(address) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

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
            span.style.fontWeight = "bold";
            span.style.padding = "2px 4px";
            span.style.borderRadius = "3px";

            parent.insertBefore(span, node);
        }

        parent.insertBefore(document.createTextNode(parts[parts.length - 1]), node);
        parent.removeChild(node);
    }
}

// =================== START SCANNING ===================
scanPage();
setInterval(scanPage, 4000); // scan every 4 seconds for dynamic content
