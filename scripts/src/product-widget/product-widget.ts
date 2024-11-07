import { ajaxRequest } from "../utils/ajax";
import { masonryLayout, mosaicLayout } from "./layout";

export class ProductWidget {
  shadowRoot: ShadowRoot;
  jquery: any;
  details = {
    current_rating: 0,
    current_sorting: "highest",
    current_page: 1,
    apply_rating_filter: false,
  };

  constructor(parentDom: any, jquery: any) {
    this.shadowRoot = this.initShadowRoot(parentDom);
    this.jquery = jquery;
  }

  initShadowRoot(parent: any) {
    const template = parent.getElementById(
      "r_rpw_product_widget_container",
    ) as HTMLTemplateElement;

    // Step 2: Get the host element where the Shadow DOM will be attached
    const host = parent.getElementById(
      "r_rpw_product_widget_container_wrapper",
    ) as HTMLElement;

    const shadowRoot = host.attachShadow({ mode: "open" });

    shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();

    return shadowRoot;
  }

  async init() {
    try {
      let product_id = window.review_product_widget_js_data.product_id;

      const response = await ajaxRequest(this.jquery, {
        url: window.review_product_widget_js_data.ajax_url,
        method: "POST",
        data: {
          action: window.review_product_widget_js_data.action,
          method: "product_widget_template",
          _wp_nonce: window.review_product_widget_js_data._wp_nonce,
          _wp_nonce_key: window.review_product_widget_js_data._wp_nonce_key,
          main_content: true,
          header: true,
          wrapper: true,
          product_id: product_id,
        },
      });

      this.renderWidget(response.data);
      this.initHeaderAndRegisterEvents();
      this.initLayoutAndRegisterEvents();
    } catch (error) {
      console.log(error);
    }
  }

  renderWidget(data: any) {
    const templateData = data.template;
    const container = this.shadowRoot.querySelector(
      "#r_rpw_container_wrapper",
    ) as HTMLElement;
    this.jquery(container).html(templateData.wrapper);

    const wrapper = this.shadowRoot.querySelector(
      ".wd_preview_content",
    ) as HTMLElement;
    this.jquery(wrapper).append(templateData.header);
    this.jquery(wrapper).append(templateData.main_content);
  }

  initHeaderAndRegisterEvents() {
    this.registerHeaderEvents();
  }

  registerHeaderEvents() {
    //Write a Review

    this.shadowRoot
      .querySelector(".r_pw_write_a_review_btn")
      ?.addEventListener("click", function () {
        //@ts-ignore
        window.REVIEW_FORM_WIDGET();
      });

    this.shadowRoot
      .querySelectorAll(".r_pw_h_sorting-link")
      ?.forEach((item: any) => {
        item.addEventListener("click", (e: any) => {
          const sorting = item.getAttribute("data-sorting");
          this.details.current_sorting = sorting;
          this.details.current_rating = 0;
          this.details.current_page = 1;
          this.filter();
        });
      });

    this.shadowRoot
      .querySelector(".r_pw_h_sorting_container--trigger")
      ?.addEventListener("click", (e: any) => {
        const sorting_list_container = this.shadowRoot.querySelector(
          ".r_pw_h_sorting_list-container",
        );

        this.jquery(sorting_list_container).toggleClass("r_pw_hide");
      });

    const ratingDistributions =
      this.shadowRoot.querySelectorAll(".r_pw_h_rd_detail");

    ratingDistributions?.forEach((item: any) => {
      item.addEventListener("click", (e: any) => {
        //if both are same user wants to get all the datas
        if (
          !this.details.current_rating ||
          this.details.current_rating == item.getAttribute("data-rating")
        ) {
          this.details.apply_rating_filter = !this.details.apply_rating_filter;
        }

        this.details.current_rating = item.getAttribute("data-rating");
        this.details.current_page = 1;

        this.jquery(ratingDistributions).removeClass(
          "r_pw_h_rd_detail--active",
        );

        if (this.details.apply_rating_filter) {
          this.jquery(item).addClass("r_pw_h_rd_detail--active");
        }

        this.filter();
      });
    });

    this.registerMinimalHeaderEvents();
  }

  registerMinimalHeaderEvents = () => {
    //When user clicks on filter icon toggle the state so that the filter can be shown or hidden
    const filterRoot = this.shadowRoot.querySelector(
      ".r_pw_mh_filter",
    ) as HTMLElement;

    filterRoot?.addEventListener("click", () => {
      const rating_contatiner = this.shadowRoot.querySelector(
        ".r_pw_mh_rd_container",
      ) as HTMLElement;

      if (this.jquery(filterRoot).hasClass("r_pw_mh_filter_icon_opened")) {
        this.jquery(filterRoot).removeClass("r_pw_mh_filter_icon_opened");
        this.jquery(filterRoot).addClass("r_pw_mh_filter_icon_closed");
      } else {
        this.jquery(filterRoot).removeClass("r_pw_mh_filter_icon_closed");
        this.jquery(filterRoot).addClass("r_pw_mh_filter_icon_opened");
      }

      this.jquery(rating_contatiner).toggleClass("r_pw_hide");
    });
  };

  async filter() {
    try {
      let product_id = window.review_product_widget_js_data.product_id;

      const response = await ajaxRequest(this.jquery, {
        url: window.review_product_widget_js_data.ajax_url,
        method: "POST",
        data: {
          action: window.review_product_widget_js_data.action,
          method: "product_widget_template",
          _wp_nonce: window.review_product_widget_js_data._wp_nonce,
          _wp_nonce_key: window.review_product_widget_js_data._wp_nonce_key,
          current_page: this.details.current_page,
          rating: this.details.current_rating,
          sorting: this.details.current_sorting,
          apply_rating_filter: this.details.apply_rating_filter,
          main_content: true,
          product_id: product_id,
        },
      });

      const mainContentWrapper = this.shadowRoot.querySelector(
        ".r_pw_main_container",
      ) as HTMLElement;
      this.jquery(mainContentWrapper).html(response.data.template.main_content);

      this.initLayoutAndRegisterEvents();
    } catch (error) {
      console.error("Error occurred while filtering");
    }
  }

  initLayoutAndRegisterEvents() {
    if (window.review_product_widget_js_data.widget_content_type === "grid") {
      masonryLayout(this.shadowRoot);
    } else if (
      window.review_product_widget_js_data.widget_content_type === "mosaic"
    ) {
      mosaicLayout(this.shadowRoot);
    }
    this.registerPaginationEvents();
  }

  registerPaginationEvents() {
    this.shadowRoot
      .querySelectorAll(".r_w_pagination-link")
      ?.forEach((item: any) => {
        item.addEventListener("click", (e: any) => {
          this.details.current_page = item.getAttribute("data-pagination-page");
          this.filter();
        });
      });
  }
}
