(() => {
  const email = "francescocirillostudio@gmail.com";

  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.closest(".email-box").querySelector(".email-copy-status");
      try {
        await navigator.clipboard.writeText(email);
        button.textContent = button.dataset.copiedLabel;
        button.classList.add("is-copied");
        status.textContent = "";
        window.setTimeout(() => {
          button.textContent = button.dataset.copyLabel;
          button.classList.remove("is-copied");
        }, 1800);
      } catch {
        status.textContent = document.documentElement.lang === "it"
          ? "Seleziona l’indirizzo e copialo manualmente."
          : "Select the address and copy it manually.";
      }
    });
  });
})();
