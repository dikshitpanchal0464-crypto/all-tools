(function() {
    // 1. Get current page details
    var currentUrl = encodeURIComponent(window.location.href);
    var currentTitle = encodeURIComponent(document.title || "The AI Hub Tools");
    
    // Check if the current page has a specific og:image, otherwise fallback to main brand logo
    var metaImageTag = document.querySelector('meta[property="og:image"]');
    var shareImage = metaImageTag ? metaImageTag.getAttribute('content') : "https://theaihub-tools.github.io/all-tools/1794114249737.png";
    var encodedShareImage = encodeURIComponent(shareImage);

    // 2. Share Links
    var platforms = [
        { name: 'WhatsApp', color: '#25D366', icon: '💬', url: 'https://api.whatsapp.com/send?text=' + currentTitle + '%20' + currentUrl },
        { name: 'X', color: '#000000', icon: '𝕏', url: 'https://twitter.com/intent/tweet?text=' + currentTitle + '&url=' + currentUrl },
        { name: 'Facebook', color: '#1877F2', icon: '📘', url: 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl },
        { name: 'Pinterest', color: '#E60023', icon: '📌', url: 'https://pinterest.com/pin/create/button/?url=' + currentUrl + '&media=' + encodedShareImage + '&description=' + currentTitle },
        { name: 'LinkedIn', color: '#0A66C2', icon: '💼', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + currentUrl },
        { name: 'Reddit', color: '#FF4500', icon: '🤖', url: 'https://reddit.com/submit?url=' + currentUrl + '&title=' + currentTitle },
        { name: 'Telegram', color: '#229ED9', icon: '✈️', url: 'https://t.me/share/url?url=' + currentUrl + '&text=' + currentTitle },
        { name: 'Email', color: '#EA4335', icon: '✉️', url: 'mailto:?subject=' + currentTitle + '&body=' + currentUrl }
    ];

    // 3. Create Container
    var container = document.createElement('div');
    container.style.cssText = 'margin: 30px auto; padding: 20px 15px; max-width: 720px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

    var heading = document.createElement('h3');
    heading.innerText = 'Share This Tool';
    heading.style.cssText = 'font-size: 15px; font-weight: 600; color: #4b5563; margin-bottom: 15px; letter-spacing: 0.5px;';
    container.appendChild(heading);

    var btnWrapper = document.createElement('div');
    btnWrapper.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;';

    // 4. Create Buttons
    platforms.forEach(function(p) {
        var a = document.createElement('a');
        a.href = p.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; background-color: ' + p.color + '; color: #ffffff; text-decoration: none; font-size: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); transition: transform 0.2s ease, box-shadow 0.2s ease;';
        a.title = 'Share on ' + p.name;
        a.innerHTML = p.icon;

        a.onmouseover = function() {
            a.style.transform = 'translateY(-2px)';
            a.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        };
        a.onmouseout = function() {
            a.style.transform = 'translateY(0)';
            a.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        };

        btnWrapper.appendChild(a);
    });

    container.appendChild(btnWrapper);

    // 5. Append to page safely
    var target = document.querySelector('.container') || document.body;
    var footer = target.querySelector('footer');
    if (footer) {
        target.insertBefore(container, footer);
    } else {
        target.appendChild(container);
    }
})();
