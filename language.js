(() => {
  const storageKey = "francesco-cirillo-language";
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  const isItalianHome = path === "/";
  const isEnglishHome = path === "/en/";

  const readPreference = () => {
    try { return window.localStorage.getItem(storageKey); } catch { return null; }
  };

  const savePreference = (language) => {
    try { window.localStorage.setItem(storageKey, language); } catch { /* optional storage */ }
  };

  document.querySelectorAll('a[lang="it"], a[lang="en"]').forEach((link) => {
    link.addEventListener("click", () => savePreference(link.lang));
  });

  const preference = readPreference();
  if (isItalianHome && preference === "en") {
    window.location.replace("/en/");
    return;
  }

  if ((!isItalianHome && !isEnglishHome) || preference) return;

  const currentLanguage = isEnglishHome ? "en" : "it";
  const overlay = document.createElement("div");
  overlay.className = "language-overlay";
  overlay.innerHTML = `
    <section class="language-dialog" role="dialog" aria-modal="true" aria-labelledby="language-title" aria-describedby="language-description">
      <div class="language-mark" aria-hidden="true">FC</div>
      <h2 id="language-title">Benvenuto <span aria-hidden="true">/</span> Welcome</h2>
      <p id="language-description">Seleziona la lingua del sito<br><span lang="en">Please select your preferred language</span></p>
      <div class="language-options">
        <button type="button" data-language="it"><span aria-hidden="true">🇮🇹</span> Italiano</button>
        <button type="button" data-language="en"><span aria-hidden="true">🇬🇧</span> English</button>
      </div>
    </section>`;

  const closeDialog = () => {
    overlay.remove();
    document.body.classList.remove("language-dialog-open");
  };

  overlay.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");
    if (!button) return;
    const language = button.dataset.language;
    savePreference(language);
    if (language === currentLanguage) closeDialog();
    else window.location.assign(language === "en" ? "/en/" : "/");
  });

  overlay.addEventListener("keydown", (event) => {
    const buttons = [...overlay.querySelectorAll("button")];
    if (event.key === "Escape") closeDialog();
    if (event.key !== "Tab") return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  document.body.appendChild(overlay);
  document.body.classList.add("language-dialog-open");
  overlay.querySelector("button").focus();
})();
