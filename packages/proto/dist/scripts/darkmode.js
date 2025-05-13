function relayEvent(event, type, detail) {
  console.log("Relaying event:", event, type, detail);
  const customEvent = new CustomEvent(type, {
    detail: detail,
  });
  document.body.dispatchEvent(customEvent);
  event.stopPropagation();
}

document.body.addEventListener("dark-mode:toggle", (event) => {
  console.log("Received custom event:", event);
  const page = event.currentTarget;
  const checked = event.detail.checked;
  page.classList.toggle("dark-mode", checked);
});