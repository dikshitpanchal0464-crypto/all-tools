/**
 * Auto Schema Generator (SoftwareApplication + FAQPage)
 * The AI Hub Tools
 */
(function () {
  try {
    // 1. अगर पहले से कोई JSON-LD मौजूद है तो दोबारा न चलाएं
    if (document.querySelector('script[data-schema="auto-generated"]')) {
      return;
    }

    // टूल का नाम: Title से '|' या '-' के पहले का हिस्सा
    const fullTitle = document.title || 'Free Online Tool';
    const toolName = fullTitle.split(/[|\-–]/)[0].trim();

    // मेटा डिस्क्रिप्शन निकालना
    const metaDescElem = document.querySelector('meta[name="description"]');
    const toolDescription = metaDescElem ? metaDescElem.getAttribute('content') : fullTitle;

    // 2. SoftwareApplication Schema तैयार करना
    const appSchema = {
      "@type": "SoftwareApplication",
      "name": toolName,
      "url": window.location.href,
      "operatingSystem": "All",
      "applicationCategory": "UtilitiesApplication",
      "inLanguage": document.documentElement.lang || "hi",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": toolDescription
    };

    // 3. FAQPage Schema तैयार करना (सभी .faq-item को ऑटो-रीड करना)
    const faqEntities = [];
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const questionElem = item.querySelector('strong');
      if (questionElem) {
        // सवाल के आगे का नंबर (उदा. "1. ", "2) ") हटाना
        const cleanQuestion = questionElem.innerText.replace(/^[\d\.\)\s\-]+/, '').trim();

        // strong टैग के बाद का हिस्सा (जवाब) निकालना और एक्स्ट्रा स्पेस साफ़ करना
        let cleanAnswer = item.innerText.replace(questionElem.innerText, '').trim();
        cleanAnswer = cleanAnswer.replace(/\s+/g, ' ');

        if (cleanQuestion && cleanAnswer) {
          faqEntities.push({
            "@type": "Question",
            "name": cleanQuestion,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": cleanAnswer
            }
          });
        }
      }
    });

    // 4. ग्राफ (Graph) में दोनों स्कीमा को जोड़ना
    const schemaGraph = [appSchema];

    if (faqEntities.length > 0) {
      schemaGraph.push({
        "@type": "FAQPage",
        "mainEntity": faqEntities
      });
    }

    const finalSchema = {
      "@context": "https://schema.org",
      "@graph": schemaGraph
    };

    // 5. JSON-LD स्क्रिप्ट को <head> में इंजेक्ट करना
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'auto-generated');
    script.textContent = JSON.stringify(finalSchema, null, 2);
    document.head.appendChild(script);

  } catch (error) {
    console.error('Schema Generation Error:', error);
  }
})();
