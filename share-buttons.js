// share-buttons.js - The AI Hub Tools Smart Share Widget
(function () {
  // 1. FontAwesome आइकन्स जोड़ना
  if (!document.getElementById('fa-icons-css')) {
    var fa = document.createElement('link');
    fa.id = 'fa-icons-css';
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    document.head.appendChild(fa);
  }

  // 2. CSS स्टाइल (नए बटन्स के कलर्स के साथ)
  var style = document.createElement('style');
  style.innerHTML = `
    .aihub-share-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      padding: 24px 16px;
      margin: 30px auto;
      max-width: 540px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .aihub-share-title {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 18px;
      line-height: 1.4;
    }
    .aihub-share-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
    .aihub-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 10px 18px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff !important;
      text-decoration: none !important;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    .aihub-btn:active {
      transform: scale(0.96);
    }
    .btn-wa { background: #25D366; }
    .btn-tg { background: #2AABEE; }
    .btn-pin { background: #E60023; }
    .btn-x { background: #000000; }
    .btn-threads { background: #000000; }
    .btn-reddit { background: #FF4500; }
    .btn-fb { background: #1877F2; }
    .btn-in { background: #0A66C2; }
    .btn-mail { background: #EA4335; }
    .btn-more { background: #0F172A; }
    .btn-copy { 
      background: #475569; 
      width: 100%;
      max-width: 190px;
      margin-top: 5px;
    }
  `;
  document.head.appendChild(style);

  // 3. करंट पेज URL, Title और इमेज लिंक
  var pageUrl = encodeURIComponent(window.location.href);
  var rawTitle = document.title || "Check out this free online tool!";
  var pageTitle = encodeURIComponent(rawTitle);
  var shareImage = encodeURIComponent('https://theaihub-tools.github.io/all-tools/1794114249737.png');

  // 4. शेयर कार्ड HTML बनाना
  var card = document.createElement('div');
  card.className = 'aihub-share-card';
  card.innerHTML = `
    <div class="aihub-share-title">⚡ दोस्तों के साथ शेयर करें या Pinterest पर सेव करें:</div>
    <div class="aihub-share-grid">
      <a class="aihub-btn btn-wa" href="https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i> WhatsApp
      </a>
      <a class="aihub-btn btn-tg" href="https://t.me/share/url?url=${pageUrl}&text=${pageTitle}" target="_blank" rel="noopener">
        <i class="fa-brands fa-telegram"></i> Telegram
      </a>
      <a class="aihub-btn btn-pin" href="https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${shareImage}&description=${pageTitle}" target="_blank" rel="noopener">
        <i class="fa-brands fa-pinterest"></i> Pinterest
      </a>
      <a class="aihub-btn btn-x" href="https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}" target="_blank" rel="noopener">
        <i class="fa-brands fa-x-twitter"></i> X
      </a>
      <a class="aihub-btn btn-threads" href="https://www.threads.net/intent/post?text=${pageTitle}%20${pageUrl}" target="_blank" rel="noopener">
        <i class="fa-brands fa-threads"></i> Threads
      </a>
      <a class="aihub-btn btn-reddit" href="https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}" target="_blank" rel="noopener">
        <i class="fa-brands fa-reddit-alien"></i> Reddit
      </a>
      <a class="aihub-btn btn-fb" href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" target="_blank" rel="noopener">
        <i class="fa-brands fa-facebook-f"></i> Facebook
      </a>
      <a class="aihub-btn btn-in" href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" target="_blank" rel="noopener">
        <i class="fa-brands fa-linkedin-in"></i> LinkedIn
      </a>
      <a class="aihub-btn btn-mail" href="mailto:?subject=${pageTitle}&body=Check%20out%20this%20tool:%20${pageUrl}">
        <i class="fa-solid fa-envelope"></i> Email
      </a>
      <button class="aihub-btn btn-more" id="aihub-native-share">
        <i class="fa-solid fa-share-nodes"></i> More
      </button>
      <button class="aihub-btn btn-copy" id="aihub-copy-link">
        <i class="fa-regular fa-copy"></i> <span>Copy Link</span>
      </button>
    </div>
  `;

  // पेज पर 'Related Tools' सेक्शन से ठीक पहले या बॉडी में लगाना
  var relatedSection = document.querySelector('.container[style*="margin-top"]') || document.querySelector('footer');
  if (relatedSection && relatedSection.parentNode) {
    relatedSection.parentNode.insertBefore(card, relatedSection);
  } else {
    document.body.appendChild(card);
  }

  // 5. 'More' बटन का लॉजिक
  var moreBtn = document.getElementById('aihub-native-share');
  if (navigator.share) {
    moreBtn.addEventListener('click', function () {
      navigator.share({
        title: decodeURIComponent(pageTitle),
        url: window.location.href
      }).catch(function(){});
    });
  } else {
    moreBtn.style.display = 'none';
  }

  // 6. 'Copy Link' बटन का लॉजिक
  var copyBtn = document.getElementById('aihub-copy-link');
  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      var span = copyBtn.querySelector('span');
      span.innerText = "Copied!";
      setTimeout(function () {
        span.innerText = "Copy Link";
      }, 2000);
    });
  });
})();
