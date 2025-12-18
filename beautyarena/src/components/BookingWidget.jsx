import React, { useEffect, useRef } from 'react';

function BookingWidget() {
    const widgetContainerRef = useRef(null);

    useEffect(() => {
        // Prevent automatic redirects from the iframe
        const handleBeforeUnload = (e) => {
            // Allow user-initiated navigation but prevent automatic redirects
            if (e.target === window && !window.__userNavigation) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        };

        const handlePopState = (e) => {
            // Prevent automatic history changes from iframe
            if (!window.__userNavigation) {
                window.history.pushState(null, '', window.location.href);
            }
        };

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function(...args) {
            if (!window.__userNavigation) {
                // If this is not user-initiated, don't actually change the URL
                return;
            }
            return originalPushState.apply(history, args);
        };

        history.replaceState = function(...args) {
            if (!window.__userNavigation) {
                // If this is not user-initiated, don't actually change the URL
                return;
            }
            return originalReplaceState.apply(history, args);
        };

        // Listen for navigation attempts
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // Allow navigation when user explicitly clicks links or buttons
        const handleUserNavigation = () => {
            window.__userNavigation = true;
            setTimeout(() => {
                window.__userNavigation = false;
            }, 100);
        };

        // Add click listeners to capture user navigation
        document.addEventListener('click', handleUserNavigation, true);

        const script = document.createElement('script');
        script.async = true;
        script.src = "//widget.simplybook.it/v2/widget/widget.js";
        script.onload = () => {
            new SimplybookWidget({"widget_type":"iframe","url":"https:\/\/beautyarena.simplybook.it","theme":"minimal","theme_settings":{"timeline_show_end_time":"1","timeline_modern_display":"as_slots","hide_company_label":"0","timeline_hide_unavailable":"1","hide_past_days":"0","sb_base_color":"#ff8291","btn_color_1":"#ef9da8,#ff8e9c,#f3a2d3","link_color":"#ff8291","display_item_mode":"block","body_bg_color":"#ffffff","sb_review_image":"2","sb_review_image_preview":"\/uploads\/beautyarena\/image_files\/preview\/3f9858ce6a282d7ea86ae3f0e95b5207.png","dark_font_color":"#2b212b","light_font_color":"#ffffff","sb_company_label_color":"#ff8291","hide_img_mode":"1","sb_busy":"#c7b3b3","sb_available":"#2b212b"},"timeline":"modern","datepicker":"top_calendar","is_rtl":false,"app_config":{"clear_session":0,"allow_switch_to_ada":0,"predefined":[]},"container_id":"sbw_yhg8ww"});
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('click', handleUserNavigation, true);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    return (
       <div id="sbw_yhg8ww" ref={widgetContainerRef}></div>
    );
}

export default BookingWidget;