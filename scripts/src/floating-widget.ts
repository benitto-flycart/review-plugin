// src/app.ts

//@ts-ignore

jQuery(document).ready(($) => {

    (function FLOATING_WIDGET_DEFAULT() {

        const floatingDialog = document.querySelector('#r_rfw_floating_widget_dialog_wrapper') as HTMLDialogElement;
        floatingDialog?.showModal();

        console.log('Floating dialog opened');

        const template = document.getElementById('r_rfw_floating_widget_container') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rfw_floating_widget_container_wrapper') as HTMLElement;

        const floatingShadowRoot = host.attachShadow({mode: 'open'});

        floatingShadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();




        const productWidgetTemplate = floatingShadowRoot.getElementById('r_rpw_product_widget_container') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
        const productWidgetShadowHost = floatingShadowRoot.getElementById('r_rpw_product_widget_container_wrapper') as HTMLElement;

        const shadowRoot = productWidgetShadowHost.attachShadow({mode: 'open'});

        shadowRoot.appendChild(productWidgetTemplate.content.cloneNode(true));

        productWidgetTemplate.remove();

        let container = shadowRoot.querySelector('#r_rpw_container_wrapper') as HTMLElement;

        //@ts-ignore
        const review_product_widget_js_data = window.review_product_widget_js_data;

        //TODO Update the Product widget Shadow Root

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

        function mosaicLayout() {
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
            details: {
                current_rating: 0,
                current_sorting: 'highest',
                current_page: 1
            },
            init: async () => {
                await $.ajax(review_product_widget_js_data.ajax_url, {
                    method: 'POST',
                    data: {
                        action: review_product_widget_js_data.action,
                        method: 'product_widget_template',
                        _wp_nonce: review_product_widget_js_data._wp_nonce,
                        _wp_nonce_key: review_product_widget_js_data._wp_nonce_key,
                        main_content: true,
                        header: true,
                        wrapper: true,
                    },
                    contentType: 'application/x-www-form-urlencoded',
                }).then((response) => {
                    const response_data = response.data;
                    $(container).html(response_data.template.wrapper);

                    let wrapper = shadowRoot.querySelector('.wd_preview_content') as HTMLElement
                    $(wrapper).append(response_data.template.header);
                    $(wrapper).append(response_data.template.main_content);

                    PRODUCT_WIDGET.initHeaderAndRegisterEvents();
                    PRODUCT_WIDGET.initLayoutAndRegisterEvents();

                }).catch(() => {
                    console.log("error occurred while loading review template");
                })
            },
            headerInit: () => {
                shadowRoot.querySelectorAll('.r_pw_h_sorting-link')?.forEach((item: any) => {
                    item.addEventListener('click', (e: any) => {
                        let sorting = item.getAttribute('data-sorting');
                        PRODUCT_WIDGET.current_rating = 0;
                        PRODUCT_WIDGET.current_sorting = sorting;
                        PRODUCT_WIDGET.filter();
                    });
                })
            },
            initHeaderAndRegisterEvents: () => {

                PRODUCT_WIDGET.headerInit();
                if (review_product_widget_js_data.widget_header_type == 'compact') {
                    PRODUCT_WIDGET.compactHeaderInit();
                }
            },
            initLayoutAndRegisterEvents: () => {
                if (review_product_widget_js_data.widget_content_type == 'grid') {
                    //@ts-ignore
                    masnoryLayout();
                    setTimeout(() => {
                        masnoryLayout();
                    }, 4000)
                } else if (review_product_widget_js_data.widget_content_type == 'mosaic') {
                    //@ts-ignore
                    mosaicLayout();
                    setTimeout(() => {
                            mosaicLayout();
                        },
                        4000)
                }

                PRODUCT_WIDGET.registerPaginationEvents();
            },
            registerPaginationEvents: () => {
                shadowRoot.querySelectorAll('.r_w_pagination-link')?.forEach((item: any) => {
                    item.addEventListener('click', (e: any) => {
                        let current_page = item.getAttribute('data-pagination-page');
                        PRODUCT_WIDGET.current_page = current_page;
                        PRODUCT_WIDGET.filter();
                    });
                })
            },
            compactHeaderInit: () => {
                shadowRoot.querySelectorAll('.r_pw_ch_rd_detail')?.forEach((item: any) => {
                    item.addEventListener('click', (e: any) => {
                        let rating = item.getAttribute('data-rating');
                        PRODUCT_WIDGET.current_rating = rating;
                        PRODUCT_WIDGET.sorting = '';
                        PRODUCT_WIDGET.current_page = 0;
                        PRODUCT_WIDGET.filter();
                    });
                })
            },
            filter: async () => {
                console.log('making request to filter the data');
                await $.ajax(review_product_widget_js_data.ajax_url, {
                    method: 'POST',
                    data: {
                        action: review_product_widget_js_data.action,
                        method: 'product_widget_template',
                        _wp_nonce: review_product_widget_js_data._wp_nonce,
                        _wp_nonce_key: review_product_widget_js_data._wp_nonce_key,
                        main_content: true,
                        current_page: PRODUCT_WIDGET.current_page,
                        rating: PRODUCT_WIDGET.current_rating,
                        sorting: PRODUCT_WIDGET.current_sorting,
                    },
                    contentType: 'application/x-www-form-urlencoded',
                }).then((response) => {
                    const response_data = response.data;

                    let mainContentWrapper = shadowRoot.querySelector('.r_pw_main_container') as HTMLElement
                    $(mainContentWrapper).html(response_data.template.main_content);

                    PRODUCT_WIDGET.initLayoutAndRegisterEvents();
                    console.log('Updated main content');
                }).catch(() => {
                    console.log("error occurred while loading review template");
                })
            },
            expandedHeaderInit: () => {

            },
            minimalHeaderInit: () => {

            },
        }

        PRODUCT_WIDGET.init();
    })();
});
