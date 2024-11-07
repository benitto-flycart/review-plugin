class ReviewDetail {
  index!: number;
  translateX!: number;
  shadowRoot!: ShadowRoot;
  dialog!: HTMLDialogElement;
  review_detail_store_config: any;
  comment_id!: number;
  review: any;
  jquery: any;

  constructor() {
    //@ts-ignore
    this.jquery = window.jQuery;
    //here we only init config and shadow for each review click we are gonna fetch again
    this.init();
  }

  async init() {
    this.initConfig();
    //iniating shadow dom
    this.initShadowDOM();
  }

  public fetch(comment_id: number) {
    this.index = 1; // Initial slide index
    this.translateX = 0; // Initial translate value

    this.comment_id = comment_id;
    this.loadInitialData();
  }

  public initConfig() {
    // @ts-ignore
    this.review_detail_store_config = window.review_detail_store_config;
  }

  private initShadowDOM() {
    const template = document.getElementById(
      "r_rdw_shadow_template",
    ) as HTMLTemplateElement;
    const host = document.getElementById("r_rdw_dialog_content") as HTMLElement;
    if (!host) return false;
    this.shadowRoot = host.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();

    this.dialog = document.getElementById(
      "r_rdw_review_detail_dialog",
    ) as HTMLDialogElement;

    return true;
  }

  public open() {
    console.log("showing modal");
    this.dialog.showModal();
  }

  attachListeners() {
    this.travelImagesListners();
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");
    const closeButton = this.shadowRoot.querySelector(".r_rdw_close_icon");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.dialog.close();
      });
    }

    // Attach previous button click listener
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (this.index >= 1) {
          this.decrease();
        }
      });
    }

    // Attach next button click listener
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (this.index < this.review.images.length) {
          this.increase();
        }
      });
    }

    // Attach click listeners for image thumbnails
    const thumbnails = document.querySelectorAll(".r_rdw_image_thumbnail");
    thumbnails.forEach((thumbnail, iteration) => {
      thumbnail.addEventListener("click", () => {
        this.setSlide(iteration + 1);
      });
    });
  }
  public travelImagesListners() {
    const jumpImages = this.shadowRoot.querySelectorAll(
      ".r_rdw_image_thumbnail",
    );
    jumpImages.forEach((item: any) => {
      item.addEventListener("click", () => {
        const index = item.getAttribute("data-image-index");
        this.setSlide(index);
      });
    });
  }

  setSlide(n: number) {
    if (this.index == n) return; // Avoid unnecessary operations if the target is the same as current index

    this.translateX = this.translateX + (this.index - n) * 100; // Handle both left and right sliding
    this.index = n; // Update the current index

    this.updateUI(); // Update the UI after changing the index
  }

  decrease() {
    this.setSlide(this.index - 1);
  }

  increase() {
    this.setSlide(this.index + 1);
  }

  updateUI() {
    // Update the translateX property of the slider container
    const sliderContainer = this.shadowRoot.querySelector(
      ".r_rdw_all_images_wrapper",
    );
    if (sliderContainer) {
      sliderContainer.setAttribute(
        "style",
        `transform: translateX(${this.translateX}%)`,
      );
    }

    // Update active image and thumbnails
    const activeSlides = this.shadowRoot.querySelectorAll(
      ".r_rdw_active_image",
    );
    activeSlides.forEach((slide, iteration) => {
      slide.classList.toggle("active", iteration + 1 == this.index);
    });

    const thumbnailColumns = this.shadowRoot.querySelectorAll(
      ".r_rdw_image_thumbnail",
    );

    thumbnailColumns.forEach((column, iteration) => {
      column.classList.toggle("active", iteration + 1 == this.index);
    });

    // Update button state
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");

    if (prevButton) {
      prevButton.classList.toggle("disabled", this.index == 1);
      prevButton.toggleAttribute("disabled", this.index == 1);
    }

    if (nextButton) {
      nextButton.classList.toggle(
        "disabled",
        this.index == this.review.images.length,
      );
      nextButton.toggleAttribute(
        "disabled",
        this.index == this.review.images.length,
      );
    }
  }

  render() {
    // Perform initial rendering if necessary
    this.updateUI(); // Apply the initial UI updates
  }

  private async loadInitialData() {
    try {
      let shadowRootContent = this.shadowRoot.getElementById(
        "r_rdw_shadow_root_content",
      );

      this.jquery(shadowRootContent).html("");

      //@ts-ignore
      const response = await this.jquery.ajax(
        this.review_detail_store_config.ajax_url,
        {
          method: "POST",
          data: {
            action: this.review_detail_store_config.action,
            method: "review_detail_template",
            comment_id: this.comment_id,
            _wp_nonce: this.review_detail_store_config._wp_nonce,
            _wp_nonce_key: this.review_detail_store_config._wp_nonce_key,
          },
          contentType: "application/x-www-form-urlencoded",
        },
      );

      if (response && response.success) {
        let response_data = response.data;

        if (shadowRootContent) {
          this.jquery(shadowRootContent).html(response_data.content);
          this.review = response_data.review;
        }

        /* Attaching event listeners */
        this.attachListeners();
        this.render(); // Render the initial state if necessary
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      const errorData = error;
      console.log("error occurred due api erro");
      return false;
    }
  }
}

const REVIEW_DETAIL = (comment_id: number) => {
  if (!(window as any).reviewDetailWidgetInitialized) {
    // First time execution logic

    // Store the floating widget in the window for future use
    (window as any).reviewDetailWidget = new ReviewDetail(); // Initialize the slider;

    // Set the flag to true after first initialization
    (window as any).reviewDetailWidgetInitialized = true;
    console.log((window as any).reviewDetailWidget);
  }
  (window as any).reviewDetailWidget.fetch(comment_id);
  (window as any).reviewDetailWidget.open();
};

document.addEventListener("DOMContentLoaded", function () {
  (window as any).REVIEW_DETAIL_WIDGET = REVIEW_DETAIL;
});
