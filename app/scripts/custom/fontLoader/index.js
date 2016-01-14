/*global window, module, document */
module.exports = (function (window, document) {
    'use strict';
    return function () {
        if (typeof window.requestAnimationFrame !== 'undefined') {
            window.requestAnimationFrame(function () {
                var elementToInsertLinkBefore = document.getElementsByTagName('script')[0],
                    linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.media = 'all';
                linkElement.href = 'https://fonts.googleapis.com/css?family=Roboto:400';
                elementToInsertLinkBefore.parentNode.insertBefore(linkElement, elementToInsertLinkBefore);

            });
        }
    };
})(window, document);
