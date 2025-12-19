# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests

# app = Flask(__name__)

# # ✅ IMPORTANT: Allow all origins (needed for Chrome extensions)
# CORS(app, resources={r"/*": {"origins": "*"}})

# ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"


# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"status": "Backend running"})


# @app.route("/scan_contract", methods=["POST"])
# def scan_contract():
#     data = request.get_json(force=True)
#     address = data.get("address")

#     if not address:
#         return jsonify({"error": "No contract address provided"}), 400

#     source = fetch_source_code(address)
#     if source is None:
#         return jsonify({"risk": "UNKNOWN", "issues": ["Contract not verified on Etherscan"]})

#     analysis = analyze_source_code(source)

#     return jsonify({
#         "address": address,
#         "verified": True,
#         "issues": analysis["issues"],
#         "risk": analysis["risk"]
#     })


# def fetch_source_code(address):
#     url = (
#         "https://api-sepolia.etherscan.io/api"
#         "?module=contract"
#         "&action=getsourcecode"
#         f"&address={address}"
#         f"&apikey={ETHERSCAN_API_KEY}"
#     )

#     response = requests.get(url, timeout=10).json()

#     if response.get("status") != "1":
#         return None

#     source = response["result"][0].get("SourceCode")
#     if not source:
#         return None

#     return source


# def analyze_source_code(src):
#     issues = []

#     # 🚨 Honeypot
#     if "require(msg.sender == owner" in src:
#         issues.append("Honeypot: Only owner can transfer tokens")

#     # 🚨 Fake approve
#     if "allowance[msg.sender][spender] = 0" in src:
#         issues.append("Fake approval mechanism")

#     # 🚨 Unlimited mint
#     if "mint(" in src:
#         issues.append("Owner can mint unlimited tokens")

#     # 🚨 Rug pull
#     if "drain(" in src:
#         issues.append("Owner drain / rug pull function detected")

#     return {
#         "risk": len(issues),
#         "issues": issues
#     }


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"

@app.route("/")
def home():
    return jsonify({"status": "Backend running"})

@app.route("/scan_contract", methods=["POST"])
def scan_contract():
    data = request.get_json()
    address = data.get("address") if data else None

    if not address:
        return jsonify({"error": "No address provided"}), 400

    source = fetch_source_code(address)

    if not source:
        return jsonify({
            "verified": False,
            "risk": "UNKNOWN",
            "issues": ["Contract not verified"]
        })

    issues = analyze_source_code(source)

    return jsonify({
        "verified": True,
        "risk": len(issues),
        "issues": issues
    })

def fetch_source_code(address):
    url = (
        "https://api-sepolia.etherscan.io/api"
        "?module=contract&action=getsourcecode"
        f"&address={address}&apikey={ETHERSCAN_API_KEY}"
    )
    r = requests.get(url, timeout=10).json()
    if r.get("status") != "1":
        return None
    return r["result"][0].get("SourceCode")

def analyze_source_code(src):
    issues = []
    if "require(msg.sender == owner" in src:
        issues.append("Honeypot")
    if "allowance[msg.sender][spender] = 0" in src:
        issues.append("Fake approval")
    if "mint(" in src:
        issues.append("Unlimited mint")
    if "drain(" in src:
        issues.append("Rug pull")
    return issues


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

