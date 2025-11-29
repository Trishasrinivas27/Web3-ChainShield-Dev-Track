from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# ✅ Replace with your newly generated Etherscan V2 API key
ETHERSCAN_API_KEY = "K32K1641JFXQKM7A9TUHF2TE4TBDDQAQ99"

# Select network
NETWORK = "sepolia"  # change to "mainnet" or "goerli" if needed
ETHERSCAN_API_URLS = {
    "mainnet": "https://api.etherscan.io/api",
    "sepolia": "https://api-sepolia.etherscan.io/api",
    "goerli":  "https://api-goerli.etherscan.io/api"
}

@app.route("/")
def home():
    return jsonify({"status": "Backend running"})

@app.route("/scan_contract", methods=["POST"])
def scan_contract():
    data = request.get_json()
    if not data or "address" not in data:
        return jsonify({"error": "No address provided"}), 400

    address = data["address"].strip()

    source = fetch_source_code(address)
    if source is None:
        # Graceful response for unverified contracts
        return jsonify({
            "address": address,
            "verified": False,
            "issues": [],
            "risk": 1,
            "error": "Contract not verified"
        }), 200

    analysis = analyze_source_code(source)

    return jsonify({
        "address": address,
        "verified": True,
        "issues": analysis["issues"],
        "risk": analysis["risk"]
    })

def fetch_source_code(address):
    url = ETHERSCAN_API_URLS.get(NETWORK, ETHERSCAN_API_URLS["sepolia"])
    params = {
        "module": "contract",
        "action": "getsourcecode",
        "address": address,
        "apikey": ETHERSCAN_API_KEY
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        r = response.json()
    except Exception as e:
        print(f"Error fetching source code: {e}")
        return None

    # ✅ Check for V2 API NOTOK message
    if r.get("status") != "1" or r.get("message") != "OK":
        print(f"Etherscan response NOTOK: {r}")
        return None

    source = r["result"][0].get("SourceCode", "")
    if not source:
        return None

    return source

def analyze_source_code(src):
    issues = []

    if "require(msg.sender == owner" in src:
        issues.append("Honeypot: Only owner can transfer tokens")
    if "allowance[msg.sender][spender] = 0" in src:
        issues.append("Fake approval mechanism")
    if "mint(" in src:
        issues.append("Owner can mint unlimited tokens")
    if "drain(" in src:
        issues.append("Owner drain / rugpull function detected")

    return {"risk": len(issues), "issues": issues}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
