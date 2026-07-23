/**
 * Lightweight interactions for the portfolio skeleton:
 * - Mobile nav toggle
 * - Video load detection (swap fallback when media is ready)
 * - Footer year
 * - Close mobile menu after in-page navigation
 */

(() => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---- Mobile navigation ---- */
  if (menuToggle && mobileMenu) {
    const setMenuOpen = (open) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      mobileMenu.classList.toggle("hidden", !open);
      mobileMenu.hidden = !open;
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    mobileMenu.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }

  /* ---- Video placeholders: mark frames that successfully load media ---- */
  document.querySelectorAll(".video-frame video").forEach((video) => {
    const frame = video.closest(".video-frame");
    if (!frame) return;

    const markReady = () => frame.classList.add("has-media");

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("error", () => frame.classList.remove("has-media"));

    // Attempt play (autoplay policies); ignore rejections quietly
    video.play?.().catch(() => {});
  });
})();
