"use strict";

const d = document,
    browser = chrome || browser,
    message = (m) => {
        let div = d.createElement('div');
        div.classList.add('message');
        div.appendChild(d.createTextNode(m));
        d.querySelector('fieldset').appendChild(div);
    };

d.addEventListener('DOMContentLoaded', event => {
    let form = d.querySelector('form');

    browser.storage.sync.get(['style', 'script'], result => {
        if (browser.runtime.lastError) { message(browser.runtime.lastError.message); }

        if (typeof result.style !== 'undefined') {
            d.querySelector('#cascading-style-sheets').value = result.style;
        }
        if (typeof result.script !== 'undefined') {
            d.querySelector('#javascript').value = result.script;
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        let styleData = d.querySelector('#cascading-style-sheets');
        let scriptData = d.querySelector('#javascript');

        browser.storage.sync.set({
            style: styleData.value,
            script: scriptData.value
        }, () => {
            if (browser.runtime.lastError) { message(browser.runtime.lastError.message); }
        });
    });
});
