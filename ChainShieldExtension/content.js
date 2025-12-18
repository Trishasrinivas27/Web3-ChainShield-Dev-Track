const ETH_ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/g;
const scanned = new Set();

function scanPage() {
    const matches = document.body.innerText.match(ETH_ADDRESS_REGEX);
    if (!matches) return;

    [...new Set(matches)].forEach(address => {
        if (scanned.has(address)) return;
        scanned.add(address);

        chrome.runtime.sendMessage(
            { type: "CHECK_ADDRESS", address },
            response => {
                if (!response || !response.status) return;

                if (response.status === "MALICIOUS") {
                    console.warn("⚠ MALICIOUS:", address);
                    highlight(address);
                } else if (response.status === "SAFE") {
                    console.log("✔ SAFE:", address);
                } else {
                    console.log("ℹ NOT VERIFIED:", address);
                }
            }
        );
    });
}

function highlight(address) {
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

        node.parentNode.replaceChild(span, node);
    }
}

scanPage();
setInterval(scanPage, 5000);
