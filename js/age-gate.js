// age-gate.js
// Blocks access to the game until the user confirms they are 18+.
// Confirmation is remembered for the browser session only (sessionStorage),
// so the gate reappears on a fresh visit/new tab, but not on every reload.

const STORAGE_KEY = "ageVerified";

export function isAgeVerified() {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
}

export function initAgeGate(onVerified) {
    const gate = document.getElementById("ageGate");
    const confirmBtn = document.getElementById("ageConfirmBtn");
    const denyBtn = document.getElementById("ageDenyBtn");
    const errorMsg = document.getElementById("ageGateError");

    // Already verified this session: skip the gate entirely.
    if (isAgeVerified()) {
        gate.hidden = true;
        document.body.classList.remove("age-locked");
        onVerified();
        return;
    }

    document.body.classList.add("age-locked");

    confirmBtn.addEventListener("click", () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        gate.hidden = true;
        document.body.classList.remove("age-locked");
        onVerified();
    });

    denyBtn.addEventListener("click", () => {
        errorMsg.hidden = false;
        confirmBtn.disabled = true;
        denyBtn.disabled = true;
        gate.querySelector(".age-gate-box").innerHTML =
            "<h2>Πρόσβαση μη διαθέσιμη</h2>" +
            "<p>Πρέπει να είσαι 18 ετών ή άνω για να παίξεις αυτό το παιχνίδι. Μπορείς να κλείσεις αυτή τη σελίδα.</p>";
    });
}
