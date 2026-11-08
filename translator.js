// translator.js - The AI Hub Tools
(function () {
  // 1. CSS स्टाइल जोड़ना
  var style = document.createElement('style');
  style.innerHTML = `
    .goog-te-banner-frame, .goog-te-menu-frame,
    .skiptranslate:not(#site-lang-picker), body > .skiptranslate {
      display: none !important;
    }
    body { top: 0px !important; position: static !important; }
  `;
  document.head.appendChild(style);

  // 2. लैंग्वेज ड्रॉपडाउन HTML बनाना
  var wrapper = document.createElement('div');
  wrapper.style.cssText = "display:flex; justify-content:flex-end; padding:10px 15px;";
  wrapper.innerHTML = `
    <select id="site-lang-picker" style="
      padding: 7px 12px; border: 1px solid #d1d5db; border-radius: 8px;
      background: #ffffff; font-size: 13px; font-weight: 500; color: #1f2937;
      outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.08); cursor: pointer;
    ">
      <option value="en">English (US/UK)</option>
      <optgroup label="भारतीय भाषाएँ (Indian Languages)">
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="gu">ગુજરાતી (Gujarati)</option>
        <option value="ur">اردو (Urdu)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="kn">ಕನ್ನಡ (Kannada)</option>
        <option value="ml">മലയാളം (Malayalam)</option>
      </optgroup>
      <optgroup label="वैश्विक भाषाएँ (Global Languages)">
        <option value="es">Español (Spanish)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="pt">Português (Portuguese)</option>
        <option value="ru">Русский (Russian)</option>
        <option value="fr">Français (French)</option>
        <option value="de">Deutsch (German)</option>
        <option value="zh-CN">中文 (Simplified Chinese)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="id">Bahasa Indonesia</option>
      </optgroup>
    </select>
    <div id="google_translate_element" style="display:none !important;"></div>
  `;

  // पेज के सबसे ऊपर लगाना
  if (document.body.firstChild) {
    document.body.insertBefore(wrapper, document.body.firstChild);
  } else {
    document.body.appendChild(wrapper);
  }

  // 3. भाषा पहचानना और कुकीज
  var allowedLangs = ['en','hi','bn','mr','te','ta','gu','ur','pa','kn','ml','es','ar','pt','ru','fr','de','zh-CN','ja','id'];

  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  function setTransCookie(lang) {
    var host = window.location.hostname;
    document.cookie = "googtrans=/en/" + lang + "; path=/;";
    if (host.indexOf('.') !== -1) {
      document.cookie = "googtrans=/en/" + lang + "; domain=" + host + "; path=/;";
    }
  }

  // ऑटो-डिटेक्ट
  var savedCookie = getCookie('googtrans');
  if (!savedCookie) {
    var userLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    var langCode = userLang.split('-')[0];
    if (userLang.indexOf('zh') !== -1) langCode = 'zh-CN';
    if (langCode !== 'en' && allowedLangs.indexOf(langCode) !== -1) {
      setTransCookie(langCode);
    }
  }

  // ड्रॉपडाउन चेंज इवेंट
  var picker = document.getElementById('site-lang-picker');
  picker.addEventListener('change', function () {
    setTransCookie(this.value);
    window.location.reload();
  });

  // सेलेक्टेड वैल्यू सेट रखना
  if (savedCookie) {
    var parts = savedCookie.split('/');
    var activeLang = parts[parts.length - 1];
    if (activeLang) picker.value = activeLang;
  }

  // 4. गूगल ट्रांसलेट स्क्रिप्ट
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      autoDisplay: false
    }, 'google_translate_element');
  };

  var script = document.createElement('script');
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
})();
