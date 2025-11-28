import requests

ETHERSCAN_API_KEY = "A7PXH9D33FMFWPAICU275YJ1FVZDB88YS9"   # ← Replace this

def get_source_code(address):
    url = (
        f"https://api.etherscan.io/api"
        f"?module=contract&action=getsourcecode"
        f"&address={address}&apikey={ETHERSCAN_API_KEY}"
    )
    res = requests.get(url).json()
    try:
        return res["result"][0]["SourceCode"]
    except:
        return None


def detect_scams(source_code):
    if not source_code or source_code.strip() == "":
        return {"risk": "UNKNOWN", "reason": "No source code found"}

    findings = []

    # Honeypot: transfer blocked
    if "require(msg.sender == owner" in source_code and "transfer" in source_code:
        findings.append("Honeypot: Only owner can transfer")

    # Fake approvals
    if "allowance[msg.sender][spender] = 0" in source_code:
        findings.append("Fake approve function")

    # Owner-only mint
    if "function mint" in source_code and "owner" in source_code:
        findings.append("Owner-only unlimited mint")

    # Drain function (rug pull)
    if "function drain" in source_code:
        findings.append("Owner drain function (rug pull)")

    if len(findings) == 0:
        return {"risk": "LOW", "reason": "No scam patterns detected"}

    return {"risk": "HIGH", "reason": ", ".join(findings)}
    

def scan_contract(address):
    code = get_source_code(address)
    return detect_scams(code)

if __name__ == "__main__":
    test_address = "0x9bf8a78714cbc6fdce0b75b4ff6a920291f96262"
    print(scan_contract(test_address))

