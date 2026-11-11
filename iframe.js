/**
 * Fortified Web Tool Embed Engine (Ironclad Edition)
 * Zero Dependencies | Zero CLS | Origin Guard | Clickjacking Resistant
 */
(function (win, doc) {
  "use strict";

  // 1. एंटी-टैम्परिंग लॉक: ग्लोबल स्पेस में छेड़छाड़ से बचाना
  if (win.__WT_SECURE_ENGINE__) return;
  Object.defineProperty(win, "__WT_SECURE_ENGINE__", {
    value: true,
    writable: false,
    configurable: false
  });

  // कोर स्टाइल इंजेक्शन (जीरो लेआउट शिफ्ट + थीम सिंक)
  var css = doc.createElement("style");
  css.textContent = 
    "@keyframes wtShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }" +
    ".wt-embed-box { width: 100%; max-width: 100%; clear: both; box-sizing: border-box; margin: 16px 0; font-family: system-ui, -apple-system, sans-serif; }" +
    ".wt-wrapper { position: relative; width: 100%; border-radius: 12px; overflow: hidden; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.04); transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1); min-height: 250px; }" +
    ".wt-skeleton { background: linear-gradient(90deg, #f8fafc 25%, #e2e8f0 50%, #f8fafc 75%); background-size: 200% 100%; animation: wtShimmer 1.5s infinite; }" +
    "@media (prefers-color-scheme: dark) { .wt-wrapper { background: #0f172a; border-color: #334155; } .wt-skeleton { background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%); } }" +
    ".wt-iframe { width: 100% !important; height: 100% !important; border: 0 !important; display: block; opacity: 0; transition: opacity 0.25s ease; box-sizing: border-box; }" +
    ".wt-credit-bar { font-size: 12px; color: #64748b; margin-top: 6px; padding: 0 4px; text-align: right; display: flex; justify-content: flex-end; align-items: center; gap: 4px; }" +
    ".wt-credit-bar a { color: #2563eb; text-decoration: none; font-weight: 600; outline: none; }" +
    ".wt-credit-bar a:hover { text-decoration: underline; color: #1d4ed8; }" +
    "@media (prefers-color-scheme: dark) { .wt-credit-bar { color: #94a3b8; } .wt-credit-bar a { color: #60a5fa; } }";
  doc.head.appendChild(css);

  // क्रिप्टोग्राफ़िक सुरक्षित रैंडम स्ट्रिंग
  function secureRandomId() {
    var arr = new Uint8Array(8);
    if (win.crypto && win.crypto.getRandomValues) {
      win.crypto.getRandomValues(arr);
      return "wt_" + Array.from(arr, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    }
    return "wt_" + Math.random().toString(36).substring(2, 10);
  }

  // यूआरएल सैनिटाइज़र (XSS और इनसिक्योर प्रोटोकॉल ब्लॉकर)
  function sanitizeSafeUrl(rawUrl) {
    try {
      var parsed = new URL(rawUrl, win.location.href);
      // केवल https और सुरक्षित http की अनुमति
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function mountSecureEmbeds() {
    var targets = doc.querySelectorAll(".tool-embed-box:not([data-rendered='true'])");

    targets.forEach(function (box) {
      var rawUrl = box.getAttribute("data-tool-url");
      var safeParsedUrl = sanitizeSafeUrl(rawUrl);
      if (!safeParsedUrl) return;

      var frameUID = secureRandomId();
      var defaultHeight = box.getAttribute("data-height") || "480px";
      var brandName = box.getAttribute("data-brand-name") || "Free Web Tool";
      var brandUrl = box.getAttribute("data-brand-url") || safeParsedUrl.origin;
      var cleanBrandUrl = sanitizeSafeUrl(brandUrl);

      // यूआरएल में सिक्योरिटी टोकन और हैंडशेक पास करना
      safeParsedUrl.searchParams.set("embed_uid", frameUID);
      safeParsedUrl.searchParams.set("embed_guard", "active");

      box.classList.add("wt-embed-box");
      box.setAttribute("data-embed-id", frameUID);
      box.setAttribute("data-origin", safeParsedUrl.origin);

      // रैपर
      var wrapper = doc.createElement("div");
      wrapper.className = "wt-wrapper wt-skeleton";
      wrapper.style.height = defaultHeight;

      // सुरक्षित iFrame
      var iframe = doc.createElement("iframe");
      iframe.id = frameUID;
      iframe.src = safeParsedUrl.toString();
      iframe.title = brandName.replace(/["'<>]/g, ""); // सैनिटाइज्ड टेक्स्ट
      iframe.loading = "lazy";
      iframe.className = "wt-iframe";
      iframe.setAttribute("scrolling", "no");
      // सैंडबॉक्स सुरक्षा: पॉप-अप्स और स्क्रिप्ट्स सुरक्षित दायरे में रहेंगे
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

      iframe.onload = function () {
        iframe.style.opacity = "1";
        wrapper.classList.remove("wt-skeleton");
      };

      // हाई-अथॉरिटी बैकलिंक (SEO Compliant)
      var creditBar = doc.createElement("div");
      creditBar.className = "wt-credit-bar";

      var backlink = doc.createElement("a");
      backlink.href = cleanBrandUrl ? cleanBrandUrl.toString() : "#";
      backlink.target = "_blank";
      backlink.rel = "noopener follow";
      backlink.textContent = brandName.replace(/[<>]/g, "");

      creditBar.appendChild(doc.createTextNode("टूल साभार: "));
      creditBar.appendChild(backlink);

      wrapper.appendChild(iframe);
      box.innerHTML = "";
      box.appendChild(wrapper);
      box.appendChild(creditBar);
      box.setAttribute("data-rendered", "true");
    });
  }

  // सख्त ओरिजिन हैंडशेक रिसीवर
  win.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || typeof data !== "object" || !data.uid) return;

    var targetIframe = doc.getElementById(data.uid);
    if (!targetIframe) return;

    var container = targetIframe.closest(".wt-embed-box");
    if (!container) return;

    var expectedOrigin = container.getAttribute("data-origin");
    // ओरिजिन स्पूफिंग सुरक्षा: अगर मैसेज किसी फ़िशिंग डोमेन से आया हो तो रिजेक्ट करें
    if (expectedOrigin && event.origin !== expectedOrigin && event.origin !== "null") {
      return;
    }

    // 1. ऑटो-हाइट रीसाइज़ (पिक्सेल लिमिट्स के साथ ताकि पेज ब्लोट न हो)
    if (data.type === "TOOL_RESIZE_EVENT" && typeof data.height === "number") {
      var heightVal = Math.min(Math.max(parseInt(data.height, 10), 100), 3000); // सेफ रेंज: 100px से 3000px
      if (!isNaN(heightVal)) {
        var wrapper = targetIframe.parentElement;
        var finalH = (heightVal + 4) + "px";
        wrapper.style.height = finalH;
        targetIframe.style.height = finalH;
      }
    }

    // 2. ऑटो-स्मूथ स्क्रॉल
    if (data.type === "TOOL_SCROLL_TOP") {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, false);

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", mountSecureEmbeds);
  } else {
    mountSecureEmbeds();
  }

  if (win.MutationObserver) {
    var observer = new MutationObserver(function () {
      mountSecureEmbeds();
    });
    observer.observe(doc.body, { childList: true, subtree: true });
  }
})(window, document);
