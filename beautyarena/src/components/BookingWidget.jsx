import React, { useEffect, useRef } from 'react';

function BookingWidget() {
    const widgetContainerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//widget.simplybook.it/v2/widget/widget.js";
        script.onload = () => {
            new SimplybookWidget({"widget_type":"iframe","url":"https:\/\/beautyarena.simplybook.it","theme":"minimal","theme_settings":{"timeline_show_end_time":"1","timeline_modern_display":"as_slots","hide_company_label":"0","timeline_hide_unavailable":"1","hide_past_days":"0","sb_base_color":"#ff8291","btn_color_1":"#ef9da8,#ff8e9c,#f3a2d3","link_color":"#ff8291","display_item_mode":"block","body_bg_color":"#ffffff","sb_review_image":"2","sb_review_image_preview":"\/uploads\/beautyarena\/image_files\/preview\/3f9858ce6a282d7ea86ae3f0e95b5207.png","dark_font_color":"#2b212b","light_font_color":"#ffffff","sb_company_label_color":"#ff8291","hide_img_mode":"1","sb_busy":"#c7b3b3","sb_available":"#2b212b"},"timeline":"modern","datepicker":"top_calendar","is_rtl":false,"app_config":{"clear_session":0,"allow_switch_to_ada":0,"predefined":[]},"container_id":"sbw_yhg8ww"});
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
       <div id="sbw_yhg8ww" ref={widgetContainerRef}></div>
    );
}

export default BookingWidget;