(function () {
    "use strict";

    const d = document,
        browser = chrome || browser;

    browser.storage.sync.get(['style', 'script'], result => {
        if (browser.runtime.lastError) { console.log(`[Modus] ${browser.runtime.lastError.message}`); }

        let head = d.querySelector('head');

        let comment = d.createComment('START: Modus');
        head.appendChild(comment);

        let modusStyle = d.createElement('style');
        modusStyle.appendChild(d.createTextNode(result.style));
        head.appendChild(modusStyle);

        let modusScript = d.createElement('script');
        modusScript.textContent = result.script;
        head.appendChild(modusScript);

        comment = d.createComment('END: Modus');
        head.appendChild(comment);
    });
})();
