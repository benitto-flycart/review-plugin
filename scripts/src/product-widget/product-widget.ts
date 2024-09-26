import {ajaxRequest} from '../utils/ajax';
import {masonryLayout, mosaicLayout} from './layout';

export class ProductWidget {
    shadowRoot: ShadowRoot;
    jquery: any;
    details = {
        current_rating: 0,
        current_sorting: 'highest',
        current_page: 1
    };

    constructor(parentDom: any, jquery: any) {
        this.shadowRoot = this.initShadowRoot(parentDom);
        this.jquery = jquery;
    }

    initShadowRoot(parent: any) {
        const template = parent.getElementById('r_rpw_product_widget_container') as HTMLTemplateElement;

        // Step 2: Get the host element where the Shadow DOM will be attached
        const host = parent.getElementById('r_rpw_product_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        return shadowRoot;
    }

    async init() {
        try {
            const response = await ajaxRequest(this.jquery, {
                url: window.review_product_widget_js_data.ajax_url,
                method: 'POST',
                data: {
                    action: window.review_product_widget_js_data.action,
                    method: 'product_widget_template',
                    _wp_nonce: window.review_product_widget_js_data._wp_nonce,
                    _wp_nonce_key: window.review_product_widget_js_data._wp_nonce_key,
                    main_content: true,
                    header: true,
                    wrapper: true,
                }
            });

            this.renderWidget(response.data);
            this.initHeaderAndRegisterEvents();
            this.initLayoutAndRegisterEvents();
        } catch (error) {
            console.log(error)
            console.error("Error occurred while loading review template");
        }
    }

    renderWidget(data: any) {
        const templateData = data.template;
        const container = this.shadowRoot.querySelector('#r_rpw_container_wrapper') as HTMLElement;
        this.jquery(container).html(templateData.wrapper);

        const wrapper = this.shadowRoot.querySelector('.wd_preview_content') as HTMLElement;
        this.jquery(wrapper).append(templateData.header);
        this.jquery(wrapper).append(templateData.main_content);
    }

    initHeaderAndRegisterEvents() {
        this.registerHeaderEvents();
    }

    registerHeaderEvents() {
        //Write a Review

        this.shadowRoot.querySelector('.r_pw_write_a_review_btn')?.addEventListener('click', function () {

            //@ts-ignore
            window.REVIEW_FORM_WIDGET();
        })

        this.shadowRoot.querySelectorAll('.r_pw_h_sorting-link')?.forEach((item: any) => {
            item.addEventListener('click', (e: any) => {
                const sorting = item.getAttribute('data-sorting');
                this.details.current_sorting = sorting;
                this.details.current_rating = 0;
                this.details.current_page = 1;
                this.filter();
            });
        });

        this.shadowRoot.querySelectorAll('.r_pw_h_rd_detail')?.forEach((item: any) => {
            item.addEventListener('click', (e: any) => {
                this.details.current_rating = item.getAttribute('data-rating');
                this.details.current_page = 1;
                this.filter();
            });
        });
    }

    async filter() {
        try {
            const response = await ajaxRequest(this.jquery, {
                url: window.review_product_widget_js_data.ajax_url,
                method: 'POST',
                data: {
                    action: window.review_product_widget_js_data.action,
                    method: 'product_widget_template',
                    _wp_nonce: window.review_product_widget_js_data._wp_nonce,
                    _wp_nonce_key: window.review_product_widget_js_data._wp_nonce_key,
                    current_page: this.details.current_page,
                    rating: this.details.current_rating,
                    sorting: this.details.current_sorting,
                    main_content: true,
                }
            });

            const mainContentWrapper = this.shadowRoot.querySelector('.r_pw_main_container') as HTMLElement;
            this.jquery(mainContentWrapper).html(response.data.template.main_content);

            this.initLayoutAndRegisterEvents();
        } catch (error) {
            console.error("Error occurred while filtering");
        }
    }



    initLayoutAndRegisterEvents() {
        console.log('logging widget content type');
        console.log(window.review_product_widget_js_data)

        if (window.review_product_widget_js_data.widget_content_type === 'grid') {
            masonryLayout(this.shadowRoot);
        } else if (window.review_product_widget_js_data.widget_content_type === 'mosaic') {
            mosaicLayout(this.shadowRoot);
        }
        this.registerPaginationEvents();
    }

    registerPaginationEvents() {
        this.shadowRoot.querySelectorAll('.r_w_pagination-link')?.forEach((item: any) => {
            item.addEventListener('click', (e: any) => {
                this.details.current_page = item.getAttribute('data-pagination-page');
                this.filter();
            });
        });
    }
}

