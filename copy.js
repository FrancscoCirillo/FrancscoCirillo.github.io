document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;

  const target = document.getElementById(button.dataset.copy);
  if (!target) return;

  const plain = target.innerText.trim();
  const html = target.innerHTML;

  try {
    if (navigator.clipboard.write && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({
        "text/plain": new Blob([plain], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" })
      })]);
    } else {
      await navigator.clipboard.writeText(plain);
    }
  } catch {
    const area = document.createElement("textarea");
    area.value = plain;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  button.textContent = button.dataset.copied;
  button.classList.add("is-copied");
  window.setTimeout(() => {
    button.textContent = button.dataset.label;
    button.classList.remove("is-copied");
  }, 1400);
});
