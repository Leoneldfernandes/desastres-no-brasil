(() => {
  "use strict";

  const dialog = document.getElementById("welcomeDialog");
  const openButton = document.getElementById("openWelcome");
  const acceptButton = document.getElementById("acceptVisit");
  const declineButton = document.getElementById("declineVisit");
  const continueButton = document.getElementById("continueWelcome");
  const consent = document.getElementById("welcomeConsent");
  const noCounter = document.getElementById("welcomeNoCounter");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const preferenceKey = "desastres-visit-choice-v1";
  const introKey = "desastres-welcome-seen-v1";
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const config = window.VISITOR_METRICS || {};
  // Closed by default: an unconfigured counter must not request consent or send requests.
  const endpoint = typeof config.endpoint === "string"
    && /^https:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.goatcounter\.com\/count$/.test(config.endpoint)
    && config.privacySettingsVerified === true ? config.endpoint : "";
  const enabled = Boolean(endpoint);
  let choice = readChoice();
  let attempted = false;
  let pending = null;

  function read(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  }

  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* Current choice still works in memory. */ }
  }

  function readChoice() {
    try {
      const stored = JSON.parse(read(preferenceKey));
      if (!stored || !["accepted", "declined"].includes(stored.value)
          || !Number.isFinite(stored.at) || stored.at > Date.now()
          || Date.now() - stored.at >= lifetime) return null;
      return stored.value;
    } catch { return null; }
  }

  function countAccess() {
    if (!enabled || choice !== "accepted" || attempted || document.visibilityState !== "visible"
        || document.prerendering || window.navigator.webdriver
        || window.location.hostname !== "leoneldfernandes.github.io") return;
    attempted = true;
    const url = new URL(endpoint);
    // One stable path: neither the old/new URL nor a query/hash can fragment the count.
    url.searchParams.set("p", "/mapa");
    url.searchParams.set("t", "Desastres no Brasil");
    url.searchParams.set("r", "");
    url.searchParams.set("rnd", String(Date.now()));
    pending = new AbortController();
    // No remote script, API token, cookies, referrer, screen size or map interaction data.
    window.fetch(url.href, {
      mode: "no-cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      signal: pending.signal,
    }).catch(() => { /* A blocked/unavailable counter must never block the map. */ })
      .finally(() => { pending = null; });
  }

  function setChoice(value) {
    choice = value;
    save(preferenceKey, JSON.stringify({ value, at: Date.now() }));
    save(introKey, "yes");
    if (value === "declined") pending?.abort();
    dialog.close();
    countAccess();
  }

  function openWelcome() {
    if (dialog.open) return;
    dialog.showModal();
    document.dispatchEvent(new CustomEvent("welcome-dialog-change", { detail: { open: true } }));
    (enabled ? declineButton : continueButton).focus();
  }

  consent.hidden = !enabled;
  noCounter.hidden = enabled;
  acceptButton.hidden = !enabled;
  declineButton.hidden = !enabled;
  continueButton.hidden = enabled;
  openButton.hidden = false;
  openButton.addEventListener("click", openWelcome);
  acceptButton.addEventListener("click", () => setChoice("accepted"));
  declineButton.addEventListener("click", () => setChoice("declined"));
  continueButton.addEventListener("click", () => {
    save(introKey, "yes");
    dialog.close();
  });
  // Escape is never consent. Opening the preferences doesn't erase a previous decision.
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    if (enabled && !choice) setChoice("declined");
    else {
      save(introKey, "yes");
      dialog.close();
    }
  });
  // Capture prevents background map shortcuts while the modal is open.
  document.addEventListener("keydown", (event) => {
    if (dialog.open) event.stopPropagation();
  }, true);
  document.addEventListener("visibilitychange", countAccess);
  document.addEventListener("prerenderingchange", countAccess);
  window.addEventListener("storage", (event) => {
    if (event.key !== preferenceKey && event.key !== null) return;
    choice = readChoice();
    if (choice !== "accepted") pending?.abort();
    if (!choice) openWelcome();
  });
  dialog.addEventListener("close", () => {
    document.dispatchEvent(new CustomEvent("welcome-dialog-change", { detail: { open: false } }));
  });

  if ((enabled && !choice) || read(introKey) !== "yes") openWelcome();
  countAccess();
})();
