/* Prooptis — minimal JS: mobile nav, reveal-on-scroll, contact form. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ===== FORM CONFIG =====
     Web3Forms (https://web3forms.com). Paste the free access key here. The key only identifies
     the form; the receiving email address never appears in this site's code.
     While the key is empty, the form shows a friendly "not available yet" message. */
  var WEB3FORMS_ACCESS_KEY = "bc144156-993d-4f5f-b3b9-a3811c5739e3";

  // Mobile nav
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }

  // Year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Contact form
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var btn = form.querySelector("button[type=submit]");
  var t = form.dataset;
  var started = Date.now();

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    status.className = "form-status"; status.textContent = "";
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var hp = form.querySelector("[name=website]");
    if ((hp && hp.value) || Date.now() - started < 2500) { // bot
      status.className = "form-status ok"; status.textContent = t.ok; form.reset(); return;
    }
    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) { if (k !== "website") data[k] = v; });
    var subject = "Prooptis.com: " + (data.company || data.name || "νέο μήνυμα");
    if (!WEB3FORMS_ACCESS_KEY) { status.className = "form-status err"; status.textContent = t.noconfig; return; }
    var url = "https://api.web3forms.com/submit";
    var payload = Object.assign({ access_key: WEB3FORMS_ACCESS_KEY, subject: subject, from_name: "Prooptis website", botcheck: "" }, data);
    btn.disabled = true; var label = btn.textContent; btn.textContent = t.sending;
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        var success = res.ok && (res.j.success === true || res.j.success === "true");
        if (success) { status.className = "form-status ok"; status.textContent = t.ok; form.reset(); }
        else { throw new Error((res.j && res.j.message) || "error"); }
      })
      .catch(function () { status.className = "form-status err"; status.textContent = t.err; })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  });
})();
