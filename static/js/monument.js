export function initMonument() {
  const addresses = [
    "0x742d35Cc6636C0532925a3b8D29Ef6d77dC10965",
    "0x8ba1f109551bD432803012645Hac136c2e60BF25",
    "0x4E46b4BcD46F8ac123C9fa5c8f7d4A5b9C8e2aF1",
    "0x9f4f0c7890312Ea8b657C4De8b6A91D5cE2B3f91",
    "0x1a2b3c4d5e6f7890abcdef1234567890ABCDEF12",
    "0x7B8C9F4A5D6E3A2B1C0F9E8D7A6B5C4D3E2F1A0B",
    "0x3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F",
    "0x6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A",
  ];

  const container = document.getElementById("monumentAddresses");
  if (!container) return;

  // Clear existing addresses
  container.innerHTML = "";

  // Function to truncate address
  function truncateAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-6);
  }

  // Create address elements
  addresses.forEach((address, index) => {
    const div = document.createElement("div");
    div.className = "monument__address";
    div.textContent = truncateAddress(address);
    div.style.animationDelay = `${index * 0.5}s`;
    container.appendChild(div);
  });

  // Add cycling animation
  let currentIndex = 0;
  const addressElements = container.querySelectorAll(".monument__address");

  function cycleAddresses() {
    addressElements.forEach((el, index) => {
      if (index === currentIndex) {
        el.style.opacity = "1";
        el.style.transform = "scale(1.05)";
        el.style.color = "#00ffff";
        el.style.textShadow = "0 0 12px rgba(0,255,255,.6)";
      } else {
        el.style.opacity = "0.7";
        el.style.transform = "scale(1)";
        el.style.color = "rgba(255,255,255,.7)";
        el.style.textShadow = "0 0 6px rgba(0,255,255,.2)";
      }
    });

    currentIndex = (currentIndex + 1) % addressElements.length;
  }

  // Start cycling - reduced frequency for performance
  cycleAddresses();
  setInterval(cycleAddresses, 5000);

  // Add event handlers for the buttons
  const leaderboardBtn = document.querySelector('a[href="#leaderboard"]');
  const joinPresaleBtn = document.querySelector(".btn--join-presale");
  const comingSoonText = document.getElementById("comingSoonText");

  if (leaderboardBtn) {
    leaderboardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (comingSoonText) {
        comingSoonText.style.display = "inline";
        comingSoonText.style.opacity = "0";
        comingSoonText.style.transform = "translateX(-10px)";

        // Animate in
        setTimeout(() => {
          comingSoonText.style.transition = "all 0.3s ease";
          comingSoonText.style.opacity = "1";
          comingSoonText.style.transform = "translateX(0)";
        }, 50);

        // Hide after 3 seconds
        setTimeout(() => {
          comingSoonText.style.opacity = "0";
          comingSoonText.style.transform = "translateX(-10px)";
          setTimeout(() => {
            comingSoonText.style.display = "none";
          }, 300);
        }, 3000);
      }
    });
  }

  if (joinPresaleBtn) {
    joinPresaleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const presaleSection = document.getElementById("presale");
      if (presaleSection) {
        presaleSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
