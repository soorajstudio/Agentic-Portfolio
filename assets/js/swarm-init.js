/*
 * swarm-init.js — boots the vendored swarm rebuild engine on saai.pro.
 *
 * Behaviour (full takeover, califa-style):
 *   1. The real page is captured into a blueprint.
 *   2. The page is blanked and repainted by cursor agents, top-down.
 *   3. Scrolling advances the build frontier.
 *   4. "Go live" fades the canvas out and restores the live, interactive page.
 */
(function () {
  "use strict";

  var KEY = "__swarmRebuild";

  var opts = {
    auto: true,
    // Settle time after load+fonts before we snapshot the page.
    delayMs: 350,
    // Wait for webfonts before capturing, otherwise headings get captured with
    // a fallback font and the rebuilt page renders in the wrong typeface.
    waitFonts: true,
    // Refuse to boot if the tab never becomes visible within this window.
    visibilityTimeoutMs: 8000,
    // false = replay the takeover on every page load
    oncePerSession: false
  };

  function q(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (_) {
      return null;
    }
  }

  // Modes: "off" / "once" / "always" / default
  function mode() {
    var v = q("swarm");
    if (v === "off" || v === "0") return "off";
    if (v === "once" || v === "session") return "once";
    if (v === "1" || v === "on") return "always";
    return opts.oncePerSession ? "once" : "always";
  }

  function forced() {
    return mode() === "always";
  }

  function disabled() {
    return mode() === "off";
  }

  function alreadyDone() {
    if (mode() !== "once") return false;
    try {
      return sessionStorage.getItem("swarm:done") === "1";
    } catch (_) {
      return false;
    }
  }

  function prefersReducedMotion() {
    if (forced()) return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }

  function markDone() {
    try {
      sessionStorage.setItem("swarm:done", "1");
    } catch (_) {}
  }

  function waitVisible(timeoutMs) {
    if (document.visibilityState === "visible") return Promise.resolve(true);
    return new Promise(function (resolve) {
      var done = false;
      var onVis = function () {
        if (document.visibilityState === "visible" && !done) {
          done = true;
          document.removeEventListener("visibilitychange", onVis);
          resolve(true);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      setTimeout(function () {
        if (done) return;
        done = true;
        document.removeEventListener("visibilitychange", onVis);
        resolve(document.visibilityState === "visible");
      }, timeoutMs);
    });
  }

  function loadEngine() {
    return new Promise(function (resolve, reject) {
      if (window[KEY]) return resolve(window[KEY]);
      document.querySelectorAll("swarm-rebuild").forEach(function (el) {
        if (!el.shadowRoot) el.remove();
      });
      var s = document.createElement("script");
      s.src = "assets/js/swarm-engine.js";
      s.async = false;
      s.onload = function () {
        if (window[KEY]) resolve(window[KEY]);
        else reject(new Error("swarm engine did not register"));
      };
      s.onerror = function () {
        reject(new Error("failed to load swarm engine"));
      };
      document.head.appendChild(s);
    });
  }

  async function boot() {
    if (!opts.auto) return;
    if (disabled()) return;
    if (prefersReducedMotion()) return;
    if (alreadyDone()) return;
    if (window[KEY]) return; // already running

    // Let the real page paint before we snapshot it.
    await new Promise(function (r) {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r, { once: true });
    });

    var visible = await waitVisible(opts.visibilityTimeoutMs);
    if (!visible) return;

    if (opts.waitFonts) {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise(function (r) { setTimeout(r, 1500); })
        ]);
      } catch (_) {}
    }

    await new Promise(function (r) { setTimeout(r, opts.delayMs); });

    if (disabled() || alreadyDone()) return;
    if (document.visibilityState !== "visible") return;

    try {
      await loadEngine();
      markDone();

      // Auto-start Tour: visitors get the smooth scroll-driven build
      if (window[KEY] && window[KEY].app && !window[KEY].app.tour) {
        var started = false;
        var start = function () {
          if (started) return;
          started = true;
          setTimeout(function () {
            try {
              var host = document.querySelector("swarm-rebuild");
              var btn = host && host.shadowRoot && host.shadowRoot.querySelector('[data-a="tour"]');
              if (btn && !btn.hidden) btn.click();
            } catch (_) {}
          }, 350);
        };
        var cancel = function () {
          if (!window[KEY] || !window[KEY].app) return;
          try { window[KEY].app.tour = false; } catch (_) {}
        };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        document.addEventListener("keydown", function (e) {
          if (e.key === "ArrowDown" || e.key === "ArrowUp" ||
              e.key === "PageDown" || e.key === "PageUp" ||
              e.key === " " || e.key === "Home" || e.key === "End") cancel();
        });
      }
    } catch (err) {
      console.error("[swarm] boot failed", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  // Operator escape hatch: ESC drops the swarm immediately.
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && window[KEY] && window[KEY].app) {
      try { window[KEY].stop(false); } catch (_) {}
    }
  });
})();
