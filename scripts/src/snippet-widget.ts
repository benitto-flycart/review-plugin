jQuery(document).ready(($) => {

    (function POPUP_WIDGET_DEFAULT() {

        const template = document.getElementById('r_sw_widget_container') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_sw_widget_container_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        //@ts-ignore
        const review_snippet_widget_js_data = window.review_snippet_widget_js_data;

        const SNIPPET_WIDGET: any = {
            init: () => {
                console.log('initiating snippet widget');
            }
        }

        SNIPPET_WIDGET.init();
    })();
});