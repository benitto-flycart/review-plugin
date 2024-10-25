//@ts-ignore
jQuery(document).ready(($) => {
  //@ts-ignore
  const review_popup_widget_js_data = window.review_popup_widget_js_data;

  const settings: any = {
    position: review_popup_widget_js_data.position ?? "top_right",
    corner_radius: review_popup_widget_js_data.corner_radius ?? "sharp",
    initial_delay: review_popup_widget_js_data.initial_delay ?? 3000,
    delay_between: review_popup_widget_js_data.delay_between ?? 2000,
    display_time: review_popup_widget_js_data.display_time ?? 2000,
  };

  (function POPUP_WIDGET_DEFAULT() {
    const template = document.getElementById(
      "r_rpw_popup_widget_container",
    ) as HTMLTemplateElement;

    // Get the host element where the Shadow DOM will be attached
    const host = document.getElementById(
      "r_rpw_popup_widget_container_wrapper",
    ) as HTMLElement;

    const shadowRoot = host.attachShadow({ mode: "open" });

    shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();

    let current_page = 1;

    function flycartReviewToast(title: string, type: string) {
      let newToast = document.createElement('div');
      newToast.classList.add('r_f_toast', type);

      let titleElement = document.createElement('div');
      titleElement.classList.add('r_f_toast_title');
      titleElement.textContent = title;

      newToast.appendChild(titleElement);

      const notificationContainer = document.querySelector('.r_f_toast_container');
      if (notificationContainer) {
        notificationContainer.appendChild(newToast);
      }

      setTimeout(() => {
        newToast.remove();
      }, 5000);
    }

    //@ts-ignore
    window.flycartReviewToast=flycartReviewToast

    const POPUP_WIDGET: any = {
      init: () => {
        let container: any = shadowRoot.querySelector(
          "#r_puw_container_wrapper",
        );
        const fetchData = () => {
          $.ajax(review_popup_widget_js_data.ajax_url, {
            method: "POST",
            data: {
              action: review_popup_widget_js_data.action,
              method: "popup_widget_template",
              _wp_nonce: review_popup_widget_js_data._wp_nonce,
              _wp_nonce_key: review_popup_widget_js_data._wp_nonce_key,
              contentType: "application/x-www-form-urlencoded",
              is_product_page: review_popup_widget_js_data.is_product_page,
              ...(review_popup_widget_js_data.is_product_page
                ? { product_id: review_popup_widget_js_data.product_id }
                : {}),
              current_page: current_page,
            },
          })
            .then((response: any) => {
              const response_data = response.data;
              flycartReviewToast("popup widget fetched successfully","success")
              current_page++;
              if (container) {
                let isHovered = false;
                $(container).html(response_data.template);

                let closeIcon: any =
                  shadowRoot.querySelector(".r_puw_close-icon");

                closeIcon.addEventListener("click", () => {
                  $(container).hide();
                });

                let popupWidgetContainer: any =
                  shadowRoot.querySelector(".r_puw_container");
                // @ts-ignore
                if (settings.position == "top_left") {
                  $(popupWidgetContainer)
                    ?.addClass("r_puw-popup_top-left_slide-in")
                    .removeClass("r_puw-popup_top-left_slide-out");
                  $(host).addClass("r_outer-puw-top_left");
                } else if (settings.position == "bottom_right") {
                  $(popupWidgetContainer)
                    ?.addClass("r_puw-popup_bottom-right_slide-in")
                    .removeClass("r_puw-popup_bottom-right_slide-out");
                  $(host).addClass("r_outer-puw-bottom_right");
                } else if (settings.position == "top_right") {
                  $(popupWidgetContainer)
                    ?.addClass("r_puw-popup_top-right_slide-in")
                    .removeClass("r_puw-popup_top-right_slide-out");
                  $(host).addClass("r_outer-puw-top_right");
                } else {
                  $(popupWidgetContainer)
                    ?.addClass("r_puw-popup_bottom-left_slide-in")
                    .removeClass("r_puw-popup_bottom-left_slide-out");
                  $(host).addClass("r_outer-puw-bottom_left");
                }
                $(container).show();
                container.addEventListener("mouseover", () => {
                  isHovered = true;
                });
                if (!isHovered) {
                  setTimeout(() => {
                    //@ts-ignore
                    if (settings.position == "top_left") {
                      $(popupWidgetContainer)
                        ?.addClass("r_puw-popup_top-left_slide-out")
                        .removeClass("r_puw-popup_top-left_slide-in");
                      $(host).addClass("r_outer-puw-top_left");
                    } else if (settings.position == "bottom_right") {
                      $(popupWidgetContainer)
                        ?.addClass("r_puw-popup_bottom-right_slide-out")
                        .removeClass("r_puw-popup_bottom-right_slide-in");
                      $(host).addClass("r_outer-puw-bottom_right");
                    } else if (settings.position == "top_right") {
                      $(popupWidgetContainer)
                        ?.addClass("r_puw-popup_top-right_slide-out")
                        .removeClass("r_puw-popup_top-right_slide-in");
                      $(host).addClass("r_outer-puw-top_right");
                    } else {
                      $(popupWidgetContainer)
                        ?.addClass("r_puw-popup_bottom-left_slide-out")
                        .removeClass("r_puw-popup_bottom-left_slide-in");
                      $(host).addClass("r_outer-puw-bottom_left");
                    }
                    setTimeout(() => {
                      $(container).hide();
                    }, 1000);
                    setTimeout(fetchData, settings.delay_between);
                  }, settings.display_time);
                }
              }
            })
            .catch((error: any) => {
              console.log(error);
              console.log("error occurred");
              flycartReviewToast("popup widget error","success")
            });
        };

        setTimeout(fetchData, settings.initial_delay);
      },
    };
    POPUP_WIDGET.init();
  })();
});
