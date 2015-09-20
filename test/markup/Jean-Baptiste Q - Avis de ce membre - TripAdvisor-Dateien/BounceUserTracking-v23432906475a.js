/**
 * Created by ayurchenko on 22/07/15.
 *
 *  HOT-2674 Add tracking for Meta Click Bounces.
 *  Fire GAEvent when a user returns to the TripAdvisor tab/window within 30 seconds of a meta click.
 *
 *  Two conditions must be met in order to have meta bouncer tracked:
 *  * onMetaClicked event
 *  * onFocus event within 30 seconds
 *
 *  Sequence of events in desktop browser:
 *  * user clicked on meta. onMetaClicked event fired.
 *  * user navigated to another tab.
 *  * user returns to original tab. onFocus event fired.
 *
 *  Issue #1: MetaClicked event may happen after onFocus. iPad safari doing it by blocking js execution in non-active tab.
 *  Sequence of events in iPad Safari:
 *
 *  * user clicked on meta. Safari blocks js execution in current tab.
 *  * user navigated to another tab.
 *  * user returns to original tab. Safari fires onFocus event and then unblocks onMetaClicked from the first step.
 *
 *  Solution: use timestamp of the most recent onBlur event as meta click timestamp.
 *
 *  Issue #2. Multiple browser versions on different devices have different onFocus event functionality.
 *  Solution: In order to guarantee tracking of we use all available: window.attachEvent, window.addEventListener or ta.pageVisibility (visibility API wrapper).
 *  In this case we may have several different listeners activated for same event, e. g. window.events and visibility API.
 *  Procedure trackMetaBounce is protected against such cases - bouncer will be tracked only once.
 *
 *  */
(function (document, window) {

    var THIRTY_SECONDS = 30000;

    var providerName;

    var metaClickTimestamp;
    var blurTimestamp;
    var focusTimestamp;

    function onFocus() {
        focusTimestamp = new Date().getTime();
        trackMetaBounce();
    }

    function onMetaClick(elmt, name) {
        providerName = name;
        metaClickTimestamp = blurTimestamp;
        trackMetaBounce();
    }

    // Safe to be called from different listeners of the same event.
    function trackMetaBounce() {
        if (!metaClickTimestamp || !focusTimestamp) {
            return;
        }

        // Do not track IB clicks.
        if (providerName === 'TripAdvisor')
        {
            return;
        }

        if (focusTimestamp > metaClickTimestamp && focusTimestamp - metaClickTimestamp <= THIRTY_SECONDS) {
            ta.trackEventOnPage('Meta_Bounce', providerName, (window.pageServlet ? window.pageServlet : ''), Math.round((focusTimestamp - metaClickTimestamp) / 1000));
            metaClickTimestamp = false;
            blurTimestamp = false;
        }
    }

    function onBlur() {
        blurTimestamp = new Date().getTime();
    }

    function onPageLoad() {
        ta.util.customEvent.addListener('metaLinkClick', window, onMetaClick);

        // Add handler into all possible onFocus/onBlur listeners.
        ta.pageVisibility.addFocusListener(onFocus);
        ta.pageVisibility.addBlurListener(onBlur);

        if (window.addEventListener) {
            window.addEventListener('focus', onFocus);
            window.addEventListener('blur', onBlur);
        }

        // IE8
        if (window.attachEvent) {
            window.attachEvent('onfocus', onFocus);
            window.attachEvent('onblur', onBlur);
        }
    }

    ta.queueForLoad(onPageLoad, "Bounce meta clicker tracking trigger");

})(document, window);