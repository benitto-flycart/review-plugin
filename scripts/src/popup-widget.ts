jQuery(document).ready(($) => {

    (function POPUP_WIDGET_DEFAULT() {

        const template = document.getElementById('r_rpw_popup_widget_container') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rpw_popup_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        //@ts-ignore
        const review_product_widget_js_data = window.review_popup_widget_js_data;

        const POPUP_WIDGET: any = {
            init: () => {
                console.log('iniating popup widget');
            }
        }

        POPUP_WIDGET.init();
    })();
});