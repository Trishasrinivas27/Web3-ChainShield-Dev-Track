document.getElementById("scanBtn").addEventListener("click", () => {
    const address = document.getElementById("addressInput").value.trim();

    if (!address) {
        alert("Please enter an address.");
        return;
    }

    fetch("https://your-render-backend.onrender.com/scan_contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                document.getElementById("result").innerHTML =
                    `<p style='color:red;'>${data.error}</p>`;
                return;
            }

            if (data.risk > 0) {
                document.getElementById("result").innerHTML = `
                    <h3 style="color:red;">⚠ Scam Detected</h3>
                    <ul>
                        ${data.issues.map(i => `<li>${i}</li>`).join("")}
                    </ul>`;
            } else {
                document.getElementById("result").innerHTML =
                    `<h3 style="color:green;">✔ Safe Contract</h3>`;
            }
        });
});
