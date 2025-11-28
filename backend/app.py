from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"


@app.route("/")
def home():
    return {"status": "Backend running"}


@app.route("/scan_contract", methods=["POST"])
def scan_contract():
    data = request.get_json()
    address = data["address"]

    source = fetch_source_code(address)
    if source is None:
        return jsonify({"error": "Contract not verified"}), 404

    analysis = analyze_source_code(source)

    return jsonify({
        "address": address,
        "verified": True,
        "issues": analysis["issues"],
        "risk": analysis["risk"]
    })


def fetch_source_code(address):
    url = (
        f"https://api-sepolia.etherscan.io/api"
        f"?module=contract&action=getsourcecode"
        f"&address={address}&apikey={ETHERSCAN_API_KEY}"
    )

    r = requests.get(url).json()

    if r["status"] != "1":
        return None

    source = r["result"][0]["SourceCode"]
    if source == "":
        return None

    return source


def analyze_source_code(src):
    issues = []

    # HONEYPOT
    if "require(msg.sender == owner" in src:
        issues.append("Honeypot: Only owner can transfer tokens")

    # FAKE APPROVAL
    if "allowance[msg.sender][spender] = 0" in src:
        issues.append("Fake approval mechanism")

    # MINTING
    if "mint(" in src:
        issues.append("Owner can mint unlimited tokens")

    # DRAIN FUNCTION
    if "drain(" in src:
        issues.append("Owner drain / rugpull function detected")

    return {"risk": len(issues), "issues": issues}


if __name__ == "__main__":
    app.run(port=5000, debug=True)
