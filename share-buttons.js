(function() {
    // 1. Get current page details
    var currentUrl = encodeURIComponent(window.location.href);
    var rawUrl = window.location.href;
    var currentTitle = encodeURIComponent(document.title || "The AI Hub Tools");
    
    // Check if the current page has a specific og:image, otherwise fallback to main brand logo
    var metaImageTag = document.querySelector('meta[property="og:image"]');
    var shareImage = metaImageTag ? metaImageTag.getAttribute('content') : "https://theaihub-tools.github.io/all-tools/1794114249737.png";
    var encodedShareImage = encodeURIComponent(shareImage);

    // 2. Official SVG Icons & Color Config
    var svgStyle = 'width: 18px; height: 18px; fill: currentColor; display: block;';
    var platforms = [
        { 
            name: 'WhatsApp', 
            color: '#25D366', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>', 
            url: 'https://api.whatsapp.com/send?text=' + currentTitle + '%20' + currentUrl 
        },
        { 
            name: 'X', 
            color: '#000000', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>', 
            url: 'https://twitter.com/intent/tweet?text=' + currentTitle + '&url=' + currentUrl 
        },
        { 
            name: 'Facebook', 
            color: '#1877F2', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>', 
            url: 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl 
        },
        { 
            name: 'Pinterest', 
            color: '#E60023', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>', 
            url: 'https://pinterest.com/pin/create/button/?url=' + currentUrl + '&media=' + encodedShareImage + '&description=' + currentTitle 
        },
        { 
            name: 'LinkedIn', 
            color: '#0A66C2', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>', 
            url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + currentUrl 
        },
        { 
            name: 'Reddit', 
            color: '#FF4500', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm7.643 14.153c.092.308.14.63.14.957 0 2.873-3.46 5.201-7.783 5.201-4.323 0-7.783-2.328-7.783-5.201 0-.327.048-.649.14-.957-1.127-.611-1.89-1.802-1.89-3.176 0-1.996 1.62-3.616 3.616-3.616.924 0 1.766.35 2.404.922 1.611-.97 3.633-1.579 5.823-1.639l1.092-5.14 3.567.759c.176-.713.816-1.242 1.583-1.242.898 0 1.628.73 1.628 1.628s-.73 1.628-1.628 1.628c-.83 0-1.517-.624-1.618-1.429l-3.085-.657-.936 4.41c2.146.069 4.126.674 5.707 1.631.638-.567 1.474-.913 2.392-.913 1.996 0 3.616 1.62 3.616 3.616 0 1.374-.763 2.565-1.89 3.176zM8.5 13.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-6.666 4.382c.245-.078.508.058.586.303.354 1.107 1.385 1.815 2.58 1.815s2.226-.708 2.58-1.815c.078-.245.341-.381.586-.303.245.078.381.341.303.586-.481 1.506-1.884 2.532-3.469 2.532s-2.988-1.026-3.469-2.532c-.078-.245.058-.508.303-.586z"/></svg>', 
            url: 'https://reddit.com/submit?url=' + currentUrl + '&title=' + currentTitle 
        },
        { 
            name: 'Telegram', 
            color: '#229ED9', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>', 
            url: 'https://t.me/share/url?url=' + currentUrl + '&text=' + currentTitle 
        },
        { 
            name: 'Email', 
            color: '#EA4335', 
            svg: '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>', 
            url: 'mailto:?subject=' + currentTitle + '&body=' + currentUrl 
        }
    ];

    // 3. Create Container
    var container = document.createElement('div');
    container.style.cssText = 'margin: 35px auto 25px; padding: 20px 15px; max-width: 680px; text-align: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

    var heading = document.createElement('p');
    heading.innerText = 'Share This Tool';
    heading.style.cssText = 'font-size: 13px; font-weight: 700; color: #64748b; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.8px;';
    container.appendChild(heading);

    var btnWrapper = document.createElement('div');
    btnWrapper.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px;';

    // 4. Create Social Action Buttons
    platforms.forEach(function(p) {
        var a = document.createElement('a');
        a.href = p.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: ' + p.color + '; color: #ffffff; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.18); transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent;';
        a.title = 'Share on ' + p.name;
        a.innerHTML = p.svg;

        a.onmouseover = function() {
            a.style.transform = 'translateY(-3px)';
            a.style.boxShadow = '0 6px 12px rgba(0,0,0,0.25)';
        };
        a.onmouseout = function() {
            a.style.transform = 'translateY(0)';
            a.style.boxShadow = '0 2px 6px rgba(0,0,0,0.18)';
        };

        btnWrapper.appendChild(a);
    });

    // 5. Copy Link Button (Premium Button)
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: #334155; color: #ffffff; border: none; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.18); transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent;';
    copyBtn.title = 'Copy Page Link';
    var linkSvg = '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
    var checkSvg = '<svg style="' + svgStyle + '" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    copyBtn.innerHTML = linkSvg;

    copyBtn.onmouseover = function() {
        if (!copyBtn.dataset.copied) {
            copyBtn.style.transform = 'translateY(-3px)';
            copyBtn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.25)';
        }
    };
    copyBtn.onmouseout = function() {
        if (!copyBtn.dataset.copied) {
            copyBtn.style.transform = 'translateY(0)';
            copyBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.18)';
        }
    };

    copyBtn.onclick = function() {
        navigator.clipboard.writeText(rawUrl).then(function() {
            copyBtn.dataset.copied = 'true';
            copyBtn.innerHTML = checkSvg;
            copyBtn.style.backgroundColor = '#10b981';
            copyBtn.style.transform = 'scale(1.1)';
            setTimeout(function() {
                delete copyBtn.dataset.copied;
                copyBtn.innerHTML = linkSvg;
                copyBtn.style.backgroundColor = '#334155';
                copyBtn.style.transform = 'scale(1)';
            }, 2000);
        });
    };

    btnWrapper.appendChild(copyBtn);
    container.appendChild(btnWrapper);

    // 6. Append above Footer
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(container, footer);
    } else {
        var target = document.querySelector('.container') || document.body;
        target.appendChild(container);
    }
})();
