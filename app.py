from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

ETHERSCAN_API_KEY = "K32K1641JFXQKM7A9TUHF2TE4TBDDQAQ99"  # replace with your V2 key

SEPOLIA_CHAIN_ID = 11155111  # correct chainid

@app.route("/")
def home():
    return {"status": "Backend running"}

@app.route("/scan_contract", methods=["POST"])
def scan_contract():
    data = request.get_json()
    address = data.get("address", "").strip()

    source = fetch_source_code(address)

    if source is None:
        return jsonify({
            "address": address,
            "verified": False,
            "risk": 1,
            "issues": [],
            "error": "Contract not verified"
        }), 200

    analysis = analyze_source_code(source)

    return jsonify({
        "address": address,
        "verified": True,
        "risk": analysis["risk"],
        "issues": analysis["issues"]
    })

def fetch_source_code(address):
    url = "https://api.etherscan.io/v2/api"

    params = {
        "chainid": SEPOLIA_CHAIN_ID,
        "module": "contract",
        "action": "getsourcecode",
        "address": address,
        "apikey": ETHERSCAN_API_KEY
    }

    resp = requests.get(url, params=params)
    data = resp.json()
    print("Etherscan V2 Response:", data)  # Debug

    if data.get("status") != "1":
        return None

    source_code = data["result"][0].get("SourceCode", "")

    return source_code if source_code else None

def analyze_source_code(src):
    issues = []

    if "require(msg.sender == owner" in src:
        issues.append("Honeypot: Only owner can transfer tokens")
    if "mint(" in src:
        issues.append("Owner can mint unlimited tokens")
    if "drain(" in src:
        issues.append("Rugpull drain function")
    if "allowance[msg.sender][spender] = 0" in src:
        issues.append("Fake approval pattern")

    return {
        "risk": len(issues),
        "issues": issues
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
