const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(pointer: fine)");
const menu = document.querySelector("#menu");
const menuToggle = document.querySelector(".menu-toggle");

function openDialog(dialog, trigger) {
  dialog.returnFocus = trigger;
  dialog.showModal();
  document.body.classList.add("modal-open");
}

function closeDialog(dialog) {
  dialog.close();
}

function wireDialog(dialog) {
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    dialog.returnFocus?.focus({ preventScroll: true });
    menuToggle?.setAttribute("aria-expanded", "false");
  });
  // Keep keyboard navigation inside the modal, including at its boundaries.
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll("a[href], button:not([disabled])")];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

if (typeof menu.showModal === "function") {
  document.documentElement.classList.add("enhanced");
  menuToggle.hidden = false;
  wireDialog(menu);
  menuToggle.addEventListener("click", () => {
    openDialog(menu, menuToggle);
    menuToggle.setAttribute("aria-expanded", "true");
  });
  menu.querySelector(".menu-close").addEventListener("click", () => closeDialog(menu));
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeDialog(menu));
  });
}

const hero = document.querySelector(".hero");
const portrait = document.querySelector(".hero-portrait");
const texture = document.querySelector(".hero-texture");
let pointerFrame;
function resetDepth() {
  cancelAnimationFrame(pointerFrame);
  if (portrait) portrait.style.transform = "";
  if (texture) texture.style.transform = "";
  hero?.style.removeProperty("--light-x");
  hero?.style.removeProperty("--light-y");
}
if (hero) {
  hero.addEventListener("pointermove", (event) => {
    if (motionPreference.matches || !finePointer.matches) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      hero.style.setProperty("--light-x", `${30 + x * 8}%`);
      hero.style.setProperty("--light-y", `${55 + y * 6}%`);
      portrait.style.transform = `translate(${x * 8}px, ${y * 6}px) rotate(${x * .9}deg)`;
      texture.style.transform = `translate(${x * 3}px, ${y * 2}px)`;
    });
  });
  hero.addEventListener("pointerleave", resetDepth);
}
motionPreference.addEventListener("change", resetDepth);
finePointer.addEventListener("change", resetDepth);

document.querySelectorAll(".magnetic").forEach((button) => {
  const visual = button.querySelector("span");
  button.addEventListener("pointermove", (event) => {
    if (motionPreference.matches || !finePointer.matches) return;
    const bounds = button.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * .08;
    const y = (event.clientY - bounds.top - bounds.height / 2) * .12;
    visual.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener("pointerleave", () => { visual.style.transform = ""; });
});

const lightbox = document.querySelector("#lightbox");
if (lightbox && typeof lightbox.showModal === "function") {
  wireDialog(lightbox);
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => closeDialog(lightbox));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeDialog(lightbox);
  });
  document.querySelectorAll(".artwork-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = lightbox.querySelector("img");
      image.src = link.href;
      image.alt = link.querySelector("img").alt;
      lightbox.querySelector("p").textContent = link.dataset.caption;
      openDialog(lightbox, link);
    });
  });
}

// Native page navigation preserves shareable URLs and browser history.
// Save an additional position for the explicit Return to work links.
const projectPreview = document.querySelector(".project-preview");
if (projectPreview) {
  projectPreview.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    try { sessionStorage.setItem("brahoWorkScroll", String(scrollY)); } catch {}
    if (motionPreference.matches) return;
    // Cross-document view transitions take priority where available.
    if ("onpageswap" in window) return;
    event.preventDefault();
    const wipe = document.createElement("div");
    wipe.className = "project-wipe";
    wipe.setAttribute("aria-hidden", "true");
    document.body.append(wipe);
    requestAnimationFrame(() => wipe.classList.add("active"));
    setTimeout(() => location.assign(projectPreview.href), 320);
  });
}
document.querySelectorAll(".return-work").forEach((link) => {
  link.addEventListener("click", () => {
    try { sessionStorage.setItem("brahoRestoreWork", "1"); } catch {}
  });
});
window.addEventListener("pageshow", (event) => {
  document.querySelector(".project-wipe")?.remove();
  if (event.persisted || !document.querySelector(".home-page")) return;
  try {
    if (sessionStorage.getItem("brahoRestoreWork") === "1") {
      sessionStorage.removeItem("brahoRestoreWork");
      const position = Number(sessionStorage.getItem("brahoWorkScroll"));
      if (Number.isFinite(position) && position > 0) {
        requestAnimationFrame(() => scrollTo({ top: position, behavior: "instant" }));
      }
    }
  } catch {}
});

// A browser may cancel a shared-image transition during history traversal.
for (const eventName of ["pageswap", "pagereveal"]) {
  window.addEventListener(eventName, (event) => {
    event.viewTransition?.ready.catch(() => {});
  });
}
