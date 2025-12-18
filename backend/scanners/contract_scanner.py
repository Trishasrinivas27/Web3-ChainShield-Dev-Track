from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

# ✅ FULL CORS SUPPORT (IMPORTANT)
CORS(app, resources={r"/*": {"origins": "*"}})

ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"

# ================== SCAM DETECTION ==================
def detect_scams(source_code):
    issues = []

    if "transfer" in source_code and ("onlyowner" in source_code or "msg.sender==owner" in source_code):
        issues.append("Honeypot: only owner can transfer tokens")

    if "function mint" in source_code and ("onlyowner" in source_code or "msg.sender==owner" in source_code):
        issues.append("Unlimited mint by owner")

    if "selfdestruct" in source_code:
        issues.append("Selfdestruct present")

    if "emergencywithdraw" in source_code or "rugpull" in source_code:
        issues.append("Rugpull / emergency withdraw function")

    return issues


# ================== CONTRACT SCANNER ==================
def scan_contract(address):
    url = (
        "https://api.etherscan.io/api"
        "?module=contract"
        "&action=getsourcecode"
        f"&address={address}"
        f"&apikey={ETHERSCAN_API_KEY}"
    )

    try:
        res = requests.get(url, timeout=10).json()

        # ❌ Not verified
        if res.get("status") != "1" or not res.get("result"):
            return {
                "status": "NOT_VERIFIED",
                "issues": []
            }

        source_code = (res["result"][0].get("SourceCode") or "").lower()

        issues = detect_scams(source_code)

        if issues:
            return {
                "status": "MALICIOUS",
                "issues": issues
            }

        return {
            "status": "SAFE",
            "issues": []
        }

    except Exception as e:
        print("Etherscan error:", e)
        return {
            "status": "ERROR",
            "issues": []
        }


# ================== API ROUTE ==================
@app.route("/check_address", methods=["POST", "OPTIONS"])
def check_address():

    # ✅ CORS PREFLIGHT FIX
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()
    address = data.get("address", "").strip().lower()

    if not address:
        return jsonify({"status": "ERROR", "issues": []})

    result = scan_contract(address)
    return jsonify(result)


# ================== RUN ==================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
