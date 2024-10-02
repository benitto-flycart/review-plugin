jQuery(document).ready(($) => {

    (function SNIPPET_WIDGET_DEFAULT() {

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

                console.log('Executing log here');


                console.log('logging button next');


                const item: any = shadowRoot.querySelector('.r_sw__carousel-item');

                const itemWidth = item.offsetWidth;

                let carousel = shadowRoot.querySelector('.r_sw__carousel');

                let buttonNext = shadowRoot.querySelector('.r_sw__carousel-button-next') as HTMLElement;

                buttonNext.addEventListener('click', function (e: MouseEvent) {
                    if (carousel) {
                        //@ts-ignore
                        carousel.scrollBy({left: itemWidth, behavior: 'smooth'});
                        console.log('scrolling to next')
                    }
                });

                let buttonPrev = shadowRoot.querySelector('.r_sw__carousel-button-prev') as HTMLElement;

                buttonPrev.addEventListener('click', function (e: MouseEvent) {
                    if (carousel) {
                        //@ts-ignore
                        carousel.scrollBy({left: -itemWidth, behavior: 'smooth'});
                        console.log('scrolling to previous')
                    }
                });
            }
        }
        SNIPPET_WIDGET.init();
    })();
});

console.log('incoming')