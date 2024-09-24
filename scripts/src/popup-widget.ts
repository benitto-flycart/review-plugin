//@ts-ignore
jQuery(document).ready(($) => {

    const settings: any = {
        position: "bottom-left",
        'corner_radius': "sharp",
        'initial_delay': 3000,
        'delay_between': 2000,
        'display_time': 2000
    };

    (function POPUP_WIDGET_DEFAULT() {

        const template = document.getElementById('r_rpw_popup_widget_container') as HTMLTemplateElement;

        // Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rpw_popup_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        //@ts-ignore
        const review_popup_widget_js_data = window.review_popup_widget_js_data;

        const POPUP_WIDGET: any = {
            init: () => {
                let container: any = shadowRoot.querySelector("#r_puw_container_wrapper");
                const fetchData = () => {
                    $.ajax(review_popup_widget_js_data.ajax_url, {
                        method: "POST",
                        data: {
                            action: review_popup_widget_js_data.action,
                            method: 'popup_widget_template',
                            _wp_nonce: review_popup_widget_js_data._wp_nonce,
                            _wp_nonce_key: review_popup_widget_js_data._wp_nonce_key,
                        },
                        contentType: 'application/x-www-form-urlencoded',
                    }).then((response: any) => {
                        const response_data = response.data;
                        if (container) {
                            let isHovered = false
                            $(container).html(response_data.template);

                            let closeIcon: any = shadowRoot.querySelector(".r_puw_close-icon");

                            closeIcon.addEventListener('click', () => {
                                $(container).hide();
                            })

                            let popupWidgetContainer: any = shadowRoot.querySelector(".r_puw_container")
                            // @ts-ignore
                            if (settings.position == "top-left") {
                                $(popupWidgetContainer)?.addClass("r_puw-popup_top-left_slide-in").removeClass("r_puw-popup_top-left_slide-out")
                                $(host).addClass("r_outer-puw-top_left")
                            } else if(settings.position=="bottom-right") {
                                $(popupWidgetContainer)?.addClass("r_puw-popup_bottom-right_slide-in").removeClass("r_puw-popup_bottom-right_slide-out")
                                $(host).addClass("r_outer-puw-bottom_right")
                            } else if(settings.position=="top-right") {
                                $(popupWidgetContainer)?.addClass("r_puw-popup_top-right_slide-in").removeClass("r_puw-popup_top-right_slide-out")
                                $(host).addClass("r_outer-puw-top_right")
                            } else {
                                $(popupWidgetContainer)?.addClass("r_puw-popup_bottom-left_slide-in").removeClass("r_puw-popup_bottom-left_slide-out")
                                $(host).addClass("r_outer-puw-bottom_left")
                            }
                            $(container).show();
                            container.addEventListener('mouseover', () => {
                                console.log("I am callng")
                                isHovered = true
                                console.log(isHovered)
                            })
                            if (!isHovered) {
                                console.log(isHovered)
                                setTimeout(() => {
                                    //@ts-ignore
                                    if (settings.position == "top-left") {
                                        $(popupWidgetContainer)?.addClass("r_puw-popup_top-left_slide-out").removeClass("r_puw-popup_top-left_slide-in")
                                        $(host).addClass("r_outer-puw-top_left")
                                    } else if(settings.position=="bottom-right") {
                                        $(popupWidgetContainer)?.addClass("r_puw-popup_bottom-right_slide-out").removeClass("r_puw-popup_bottom-right_slide-in")
                                        $(host).addClass("r_outer-puw-bottom_right")
                                    } else if(settings.position=="top-right") {
                                        $(popupWidgetContainer)?.addClass("r_puw-popup_top-right_slide-out").removeClass("r_puw-popup_top-right_slide-in")
                                        $(host).addClass("r_outer-puw-top_right")
                                    } else {
                                        $(popupWidgetContainer)?.addClass("r_puw-popup_bottom-left_slide-out").removeClass("r_puw-popup_bottom-left_slide-in")
                                        $(host).addClass("r_outer-puw-bottom_left")
                                    }
                                    setTimeout(() => {
                                        $(container).hide();
                                    }, 1000)
                                    setTimeout(fetchData, settings.delay_between);
                                }, settings.display_time);
                            }
                        }
                    });
                };
                setTimeout(fetchData, settings.initial_delay);
            }
        };
        POPUP_WIDGET.init();
    })();
});

