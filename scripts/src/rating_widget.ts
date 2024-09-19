jQuery(document).ready(($) => {

    (function RATING_WIDGET_DEFAULT() {

        const template = document.getElementById('r_rpw_rating_widget_container') as HTMLTemplateElement;

        // Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rpw_rating_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        //@ts-ignore
        const review_rating_widget_js_data = window.review_rating_widget_js_data;

        const POPUP_WIDGET: any = {
            init: () => {
                let container: any = shadowRoot.querySelector("#r_puw_container_wrapper");
                const fetchData = () => {
                    $.ajax(review_rating_widget_js_data.ajax_url, {
                        method: "POST",
                        data: {
                            action: review_rating_widget_js_data.action,
                            method: 'rating_widget_template',
                            _wp_nonce: review_rating_widget_js_data._wp_nonce,
                            _wp_nonce_key: review_rating_widget_js_data._wp_nonce_key,
                        },
                        contentType: 'application/x-www-form-urlencoded',
                    }).then((response: any) => {
                        const response_data = response.data;
                        //log here
                    });
                };
            }
        };
        POPUP_WIDGET.init();
    })();
});