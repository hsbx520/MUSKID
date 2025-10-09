let toastTimer;
const toast = (t) => {
  const el = document.getElementById("toast");
  clearTimeout(toastTimer);
  el.textContent = t;
  el.classList.add("show");
  toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
};
const addrEl = () =>
  document.getElementById("presaleAddress") || {
    textContent: "0xb2e6a0428Dab136B9B264FA4DA620c96ba13109D",
  };

export function presaleUI() {
  const min = { ETH: 0.05, USDC: 200, USDT: 200, BNB: 0.3, SOL: 1 },
    rate = { ETH: 565000, USDC: 125, USDT: 125, BNB: 105000, SOL: 27000 };
  const amount = document.getElementById("amountInput"),
    err = document.getElementById("errorMsg"),
    recv = document.getElementById("receiveBox");
  let token = "ETH";
  const setRecv = () => {
    const v = parseFloat(amount.value || "0");
    const out = isNaN(v) ? 0 : v * rate[token];
    recv.innerHTML = `You will receive: <span class="receive__amount">${out.toLocaleString()}</span> <span class="receive__token">MuskID</span>`;
  };
  const tabs = [...document.querySelectorAll(".token__btn")];
  tabs.forEach((b) =>
    b.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      token = b.dataset.token;
      validate();
    })
  );
  function validate() {
    const v = parseFloat(amount.value || "0");
    const ok = v >= min[token];
    err.textContent =
      ok || !amount.value ? "" : `Minimum amount: ${min[token]} ${token}`;
    setRecv();
    return ok;
  }
  amount.addEventListener("input", validate);
  document
    .getElementById("copyAddress")
    ?.addEventListener("click", async () => {
      await navigator.clipboard.writeText(addrEl().textContent);
      toast("Copied ");
    });
  document
    .getElementById("howBtn")
    .addEventListener("click", () => toggleModal("modalHow", true));
  document.getElementById("buyBtn").addEventListener("click", () => {
    if (!amount.value.trim()) {
      err.textContent = "Please enter the amount you wish to purchase.";
      amount.focus();
      return;
    }
    if (!validate()) return;
    openConfirm(amount.value, token);
  });
}

function toggleModal(id, show) {
  const m = document.getElementById(id);
  m.setAttribute("aria-hidden", show ? "false" : "true");
}
function openConfirm(val, token) {
  document.getElementById("tsAmount").textContent = val;
  document.getElementById("tsToken").textContent = token;
  const rateMap = {
    ETH: 565000,
    USDC: 125,
    USDT: 125,
    BNB: 105000,
    SOL: 27000,
  };
  const recv = parseFloat(val || "0") * (rateMap[token] || 0) || 0;
  document.getElementById(
    "tsReceive"
  ).textContent = `${recv.toLocaleString()} MuskID`;
  const netMap = {
    ETH: "Use Ethereum network (ETH / ERC-20).",
    BNB: "Use BSC network (BNB / BEP-20).",
    USDC: "Use Ethereum (ERC-20) or BSC (BEP-20) network.",
    USDT: "Use Ethereum (ERC-20) or BSC (BEP-20) network.",
    SOL: "Use Solana network (SOL).",
  };
  document.getElementById("networkHint").textContent = netMap[token] || "";
  const solAddr = "HmXeQEeAoqFdEnwrG6dDyZnd33qCyyesAKrAXiNnwjHy";
  const evmAddr =
    document.getElementById("presaleAddress")?.textContent ||
    "0xb2e6a0428Dab136B9B264FA4DA620c96ba13109D";
  document.getElementById("confirmAddress").textContent =
    token === "SOL" ? solAddr : evmAddr;
  toggleModal("modalConfirm", true);
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-close], .modal__backdrop")) {
    toggleModal("modalConfirm", false);
    toggleModal("modalHow", false);
  }
});
document.getElementById("openWallet")?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(
    document.getElementById("confirmAddress")?.textContent || ""
  );
  const el = document.getElementById("toast");
  el.textContent = "Presale address copied";
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1600);
});
document
  .getElementById("copyPresaleAddr")
  ?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(
      document.getElementById("confirmAddress")?.textContent || ""
    );
    const btn = document.getElementById("copyPresaleAddr");
    const prev = btn.textContent;
    btn.textContent = "Copied";
    const el = document.getElementById("toast");
    el.textContent = "Address copied";
    el.classList.add("show");
    setTimeout(() => {
      el.classList.remove("show");
      btn.textContent = prev;
    }, 1600);
  });
document.getElementById("coinbaseBtn")?.addEventListener("click", () => {
  window.open(
    "https://commerce.coinbase.com/checkout/e6ab47fc-d519-4541-9b7a-3c629222745b",
    "_blank",
    "noopener"
  );
});
document.getElementById("coinbaseCta")?.addEventListener("click", () => {
  window.open(
    "https://commerce.coinbase.com/checkout/e6ab47fc-d519-4541-9b7a-3c629222745b",
    "_blank",
    "noopener"
  );
});

const howDlg = document.querySelector("#modalHow .modal__dialog");
if (howDlg) {
  howDlg.innerHTML = `
    <h4 id="howTitle">📖 Purchase Guide</h4>
    <p class="modal__intro">How to Purchase $MuskID Tokens</p>
    <div class="ts-card">
      <div class="ts-row"><span><strong>Step 1: Choose Your Payment Method</strong></span></div>
      <p class="ts-note">Select from:</p>
      <ul class="ts-badges">
        <li><strong>ETH</strong></li>
        <li><strong>BNB</strong></li>
        <li><strong>USDT</strong></li>
        <li><strong>USDC</strong></li>
        <li><strong>SOL</strong></li>
      </ul>
      <p class="ts-note">Each currency has different exchange rates and minimum purchase requirements.</p>
    </div>
    <div class="ts-card">
      <div class="ts-row"><span><strong>Step 2: Enter Purchase Amount</strong></span></div>
      <p class="ts-note">Enter the amount you wish to spend. The system will automatically calculate how many $MuskID tokens you'll receive based on current rates.</p>
    </div>
    <div class="ts-card">
      <div class="ts-row"><span><strong>Step 3: Complete Your Purchase</strong></span></div>
      <p class="ts-note">Click "Buy MuskID" to open the presale dialog. Send the exact amount from your personal wallet (MetaMask, Trust Wallet, etc.) to the official presale address. <span class="modal__highlight">Your tokens will be automatically delivered via smart contract — no manual claiming required.</span></p>
    </div>
    <div class="warn-card">
      <strong>⚠️ Important Notes</strong>
      <ul>
        <li>Only send from personal wallets you control</li>
        <li>❌ Never send from exchange wallets</li>
        <li>✅ Tokens are automatically sent via smart contract</li>
        <li>⚡ Minimum purchases apply for each currency</li>
        <li>🎁 Extra +10% token bonus when paying with Coinbase Commerce</li>
      </ul>
    </div>
    <div class="ts-card">
      <div class="ts-row"><span><strong>💱 Current Exchange Rates</strong></span></div>
      <ul>
        <li>1 ETH = 565,000 MuskID (Min: 0.05 ETH)</li>
        <li>1 BNB = 105,000 MuskID (Min: 0.3 BNB)</li>
        <li>1 USDT = 125 MuskID (Min: 200 USDT)</li>
        <li>1 USDC = 125 MuskID (Min: 200 USDC)</li>
        <li>1 SOL = 27,000 MuskID (Min: 1 SOL)</li>
      </ul>
      <p class="ts-note">📌 Additional Note: When purchasing with Coinbase Commerce, tokens will be automatically delivered to the Ethereum address linked to your wallet.</p>
    </div>
    <div class="modal__actions">
      <button class="btn btn--primary" data-close>Got it</button>
    </div>
  `;
}
