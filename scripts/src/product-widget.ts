// src/app.ts

//@ts-ignore

jQuery(document).ready(($) => {

    (function PRODUCT_WIDGET_DEFAULT() {

        const template = document.getElementById('r_rpw_product_widget_container') as HTMLTemplateElement;

        console.log(template)
// Step 2: Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rpw_product_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        //@ts-ignore
        const review_product_widget_js_data = window.review_product_widget_js_data;

        function masnoryLayout() {
            var elem = shadowRoot.querySelector('.r_pw_g_all_reviews_container');

            //@ts-ignore
            var msnry = new Masonry(elem, {
                // options
                itemSelector: '.r_pw_r_g_container',
                percentPosition: true,
                gutter: 15
            });

            console.log(msnry)
        }

// masnoryLayout();


        function mosaicLayout() {
            console.log('Executing mosaic')
            var elem = shadowRoot.querySelector('.r_pw_r_m_all_reviews_container');

            //@ts-ignore
            var msnry = new Masonry(elem, {
                // options
                itemSelector: '.r_pw_r_m_container',
                percentPosition: true,
                gutter: 15
            });
            console.log(msnry)
        }

        const PRODUCT_WIDGET: any = {
            init: () => {
                let container = shadowRoot.querySelector('#r_rpw_container_wrapper') as HTMLElement;

                $.ajax(review_product_widget_js_data.ajax_url, {
                    method: 'POST',
                    data: {
                        action: review_product_widget_js_data.action,
                        method: 'product_widget_template',
                        _wp_nonce: review_product_widget_js_data._wp_nonce,
                        _wp_nonce_key: review_product_widget_js_data._wp_nonce_key,
                    },
                    contentType: 'application/x-www-form-urlencoded',
                }).then((response) => {
                    const response_data = response.data;
                    $(container).html(response_data.template);

                    if (review_product_widget_js_data.widget_content_type == 'grid') {
                        //@ts-ignore
                        masnoryLayout();
                        setTimeout(() => {
                                masnoryLayout();
                            },
                            3000)
                    } else if(review_product_widget_js_data.widget_content_type == 'mosaic') {
                       //@ts-ignore
                        mosaicLayout();
                        setTimeout(() => {
                                mosaicLayout();
                            },
                            3000)
                    }

                }).catch(() => {
                    console.log("error occurred while loading review template");
                })
            }
        }

        PRODUCT_WIDGET.init();
    })();
});