/*
  Smart Tech Hub — Site Search Widget
  -------------------------------------
  Self-contained: injects its own styles, a floating search button,
  and a results panel. Reads from SITE_SEARCH_INDEX (search-data.js).

  Add to EVERY page, right before </body>, in this order:

    <script src="search-data.js"></script>
    <script src="search-widget.js"></script>

  Open the search: click the floating button, or press "/" anywhere
  on the page. Close it: click outside the panel, or press Escape.
*/

(function () {
  const DATA = (typeof SITE_SEARCH_INDEX !== "undefined") ? SITE_SEARCH_INDEX : [];

  // ---- Styles ----
  const style = document.createElement("style");
  style.textContent = `
    .sth-search-btn {
      position: fixed; bottom: 22px; right: 22px; z-index: 999;
      width: 52px; height: 52px; border-radius: 50%;
      background: #00C2A8; color: #052420; border: none;
      font-size: 1.3rem; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,.35);
      display: flex; align-items: center; justify-content: center;
      font-family: system-ui, sans-serif;
    }
    .sth-search-btn:hover { filter: brightness(1.08); }
    .sth-overlay {
      position: fixed; inset: 0; background: rgba(5,8,16,.65);
      z-index: 1000; display: none; align-items: flex-start; justify-content: center;
      padding: 10vh 16px 0;
    }
    .sth-overlay.open { display: flex; }
    .sth-panel {
      width: 100%; max-width: 560px; background: #121B2E; border: 1px solid #233150;
      border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.5);
      font-family: 'Inter', system-ui, sans-serif; overflow: hidden;
      max-height: 70vh; display: flex; flex-direction: column;
    }
    .sth-input-row { display: flex; align-items: center; border-bottom: 1px solid #233150; padding: 4px 8px; }
    .sth-input-row span { color: #94A3B8; padding: 0 8px; font-size: 1.1rem; }
    .sth-panel input {
      flex: 1; background: transparent; border: none; outline: none;
      color: #E7ECF3; font-size: 1.05rem; padding: 14px 6px;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .sth-esc { color: #94A3B8; font-size: .75rem; border: 1px solid #233150; border-radius: 4px; padding: 2px 6px; margin-right: 4px; font-family: monospace; }
    .sth-results { overflow-y: auto; padding: 6px; }
    .sth-result {
      display: block; padding: 10px 12px; border-radius: 8px; text-decoration: none;
      color: #E7ECF3; margin-bottom: 2px;
    }
    .sth-result:hover, .sth-result.active { background: #17223A; }
    .sth-result .t { font-weight: 600; font-size: .95rem; }
    .sth-result .p { color: #00C2A8; font-size: .72rem; font-family: monospace; margin-left: 8px; }
    .sth-result .s { color: #94A3B8; font-size: .82rem; margin-top: 2px; }
    .sth-empty { color: #94A3B8; padding: 24px; text-align: center; font-size: .92rem; }
  `;
  document.head.appendChild(style);

  // ---- Elements ----
  const btn = document.createElement("button");
  btn.className = "sth-search-btn";
  btn.setAttribute("aria-label", "Search Smart Tech Hub");
  btn.innerHTML = "🔍";

  const overlay = document.createElement("div");
  overlay.className = "sth-overlay";
  overlay.innerHTML = `
    <div class="sth-panel">
      <div class="sth-input-row">
        <span>🔍</span>
        <input type="text" placeholder="Search lessons, terms, tools..." autocomplete="off">
        <span class="sth-esc">Esc</span>
      </div>
      <div class="sth-results"></div>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(overlay);

  const input = overlay.querySelector("input");
  const resultsEl = overlay.querySelector(".sth-results");
  let activeIndex = -1;
  let currentMatches = [];

  function openSearch() {
    overlay.classList.add("open");
    input.value = "";
    renderResults("");
    setTimeout(() => input.focus(), 30);
  }
  function closeSearch() {
    overlay.classList.remove("open");
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return DATA
      .map(entry => {
        const haystack = (entry.title + " " + entry.snippet + " " + (entry.keywords || "")).toLowerCase();
        const titleHit = entry.title.toLowerCase().includes(q);
        const anyHit = haystack.includes(q);
        if (!anyHit) return null;
        return { entry, score: titleHit ? 2 : 1 };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .map(m => m.entry)
      .slice(0, 8);
  }

  function renderResults(query) {
    currentMatches = search(query);
    activeIndex = -1;
    if (!query.trim()) {
      resultsEl.innerHTML = `<div class="sth-empty">Start typing to search the whole site...</div>`;
      return;
    }
    if (currentMatches.length === 0) {
      resultsEl.innerHTML = `<div class="sth-empty">No results for "${escapeHtml(query)}"</div>`;
      return;
    }
    resultsEl.innerHTML = currentMatches.map((m, i) => {
      const href = m.page + (m.section ? "#" + m.section : "");
      return `<a class="sth-result" data-i="${i}" href="${href}">
        <div class="t">${escapeHtml(m.title)}<span class="p">${escapeHtml(m.page)}</span></div>
        <div class="s">${escapeHtml(m.snippet || "")}</div>
      </a>`;
    }).join("");
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function setActive(i) {
    const items = resultsEl.querySelectorAll(".sth-result");
    items.forEach(el => el.classList.remove("active"));
    if (items[i]) {
      items[i].classList.add("active");
      items[i].scrollIntoView({ block: "nearest" });
    }
    activeIndex = i;
  }

  input.addEventListener("input", () => renderResults(input.value));

  input.addEventListener("keydown", (e) => {
    const items = resultsEl.querySelectorAll(".sth-result");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        window.location.href = items[activeIndex].getAttribute("href");
      } else if (items.length > 0) {
        window.location.href = items[0].getAttribute("href");
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  });

  btn.addEventListener("click", openSearch);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSearch(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !overlay.classList.contains("open")) {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape") {
      closeSearch();
    }
  });
})();
