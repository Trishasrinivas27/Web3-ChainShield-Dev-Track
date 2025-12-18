from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# ================== FLASK APP ==================
app = Flask(__name__)
# ✅ Enable CORS for all routes and all origins
CORS(app, resources={r"/*": {"origins": "*"}})

ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"

# ================== FETCH CONTRACT INFO ==================
def get_contract_info(address):
    url = (
        "https://api.etherscan.io/api"
        "?module=contract"
        "&action=getsourcecode"
        f"&address={address}"
        f"&apikey={ETHERSCAN_API_KEY}"
    )
    try:
        res = requests.get(url, timeout=10).json()
        if res.get("status") != "1" or not res.get("result"):
            return {"verified": False, "source_code": ""}
        result = res["result"][0]
        return {"verified": True, "source_code": (result.get("SourceCode") or "").lower()}
    except Exception as e:
        print("Etherscan error:", e)
        return {"verified": False, "source_code": ""}

# ================== DETECT MALICIOUS PATTERNS ==================
def detect_scams(source_code):
    issues = []
    if "transfer" in source_code and ("onlyowner" in source_code or "msg.sender==owner" in source_code):
        issues.append("Honeypot: only owner can transfer tokens")
    if "function mint" in source_code and ("onlyowner" in source_code or "msg.sender==owner" in source_code):
        issues.append("Owner can mint unlimited tokens")
    rug_keywords = ["function drain", "withdrawall", "rugpull", "emergencywithdraw", "selfdestruct"]
    for word in rug_keywords:
        if word in source_code:
            issues.append("Rugpull / drain capability")
            break
    if "allowance[msg.sender][spender]=0" in source_code:
        issues.append("Fake approval pattern")
    return issues

# ================== MAIN SCANNER ==================
def scan_contract(address):
    address = address.lower()
    info = get_contract_info(address)

    if not info["verified"]:
        return {
            "address": address,
            "status": "NOT_VERIFIED",
            "is_malicious": False,
            "risk": 0,
            "issues": [],
            "verified": False,
            "reason": "Contract source code not verified on Etherscan"
        }

    issues = detect_scams(info["source_code"])
    risk = len(issues)

    if risk > 0:
        return {
            "address": address,
            "status": "MALICIOUS",
            "is_malicious": True,
            "risk": risk,
            "issues": issues,
            "verified": True,
            "reason": ", ".join(issues)
        }

    return {
        "address": address,
        "status": "SAFE",
        "is_malicious": False,
        "risk": 0,
        "issues": [],
        "verified": True,
        "reason": "Verified contract with no malicious patterns"
    }

# ================== FLASK ROUTE ==================
@app.route("/check_address", methods=["POST"])
def check_address():
    try:
        data = request.get_json(force=True)
        address = data.get("address", "").strip()
        if not address:
            return jsonify({"error": "No address provided"}), 400

        result = scan_contract(address)
        return jsonify(result)

    except Exception as e:
        print("Backend error:", e)
        return jsonify({"error": "Backend error"}), 500

# ================== RUN LOCAL / RAILWAY ==================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
