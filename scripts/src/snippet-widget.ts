jQuery(document).ready(($) => {
  (function SNIPPET_WIDGET_DEFAULT() {
    const template = document.getElementById(
      "r_sw_widget_container",
    ) as HTMLTemplateElement;

    // Step 2: Get the host element where the Shadow DOM will be attached
    const host = document.getElementById(
      "r_sw_widget_container_wrapper",
    ) as HTMLElement;

    const shadowRoot = host.attachShadow({ mode: "open" });

    shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();

    //@ts-ignore
    const review_snippet_widget_js_data = window.review_snippet_widget_js_data;

    const SNIPPET_WIDGET: any = {
      details: {
        current_index: 1,
      },
      init: () => {
        const allowed_reviwed_count =
          review_snippet_widget_js_data.allowed_review_count;

        const item: any = shadowRoot.querySelector(".r_sw__carousel-item");

        const itemWidth = item.offsetWidth;

        let carousel = shadowRoot.querySelector(".r_sw__carousel");

        let buttonNext = shadowRoot.querySelector(
          ".r_sw__carousel-button-next",
        ) as HTMLElement;

        buttonNext.addEventListener("click", function (e: MouseEvent) {
          if (carousel) {
            //@ts-ignore
            carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
            if (
              ++SNIPPET_WIDGET.details.current_index == allowed_reviwed_count
            ) {
              $(buttonNext).addClass("disabled");
            } else if (SNIPPET_WIDGET.details.current_index != 1) {
              $(buttonPrev).removeClass("disabled");
            }
          }
        });

        let buttonPrev = shadowRoot.querySelector(
          ".r_sw__carousel-button-prev",
        ) as HTMLElement;

        $(buttonPrev).addClass("disabled");

        buttonPrev.addEventListener("click", function (e: MouseEvent) {
          if (carousel) {
            //@ts-ignore
            carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
            if (--SNIPPET_WIDGET.details.current_index == 1) {
              $(buttonPrev).addClass("disabled");
            } else if (
              SNIPPET_WIDGET.details.current_index != allowed_reviwed_count
            ) {
              $(buttonNext).removeClass("disabled");
            }
          }
        });
      },
    };
    SNIPPET_WIDGET.init();
  })();
});
