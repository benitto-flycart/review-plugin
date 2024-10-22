// Define the types used in the class

type TStoreConfig = {
  home_url: string;
  admin_url: string;
  action: string;
  ajax_url: string;
  _wp_nonce_key: string;
  _wp_nonce: string;
  is_product_page: boolean;
};

type TReviewDetails = {
  order_id: number;
  product_id: number;
  rating: number;
  review_text: string;
  first_name: string;
  last_name: string;
  email: string;
  translateX: number;
  files: {
    photos: any[];
  };
  activeSlide: {
    index: number;
    name: string;
  };
  extra: {
    previous_photo_count: number;
  };
};

type TSlide = {
  name: string;
};

// Main ReviewFormWidget class
class ReviewFormWidget {
  private review_form_store_config!: TStoreConfig;
  private shadowRoot!: ShadowRoot;
  private review_details!: TReviewDetails;
  private slides: TSlide[] = [];
  private submitSlide: string = "";
  private lastSlide: string = "";
  private sliding: boolean = false;
  private dialog: HTMLDialogElement | undefined = undefined;

  //@ts-ignore
  private jquery: any = undefined;

  constructor() {
    //@ts-ignore
    this.jquery = window.jQuery;

    // Initialize configuration and DOM elements
    this.initConfig();
    const inited = this.initShadowDOM();

    if (inited) {
      this.initReviewDetails();
      this.init();
    } else {
      console.log("shadow dom is not configured correctly");
    }
  }

  // Initialize store configuration from global window object
  private initConfig() {
    // @ts-ignore
    this.review_form_store_config = window.review_form_store_config;
  }

  // Initialize Shadow DOM
  private initShadowDOM() {
    const template = document.getElementById(
      "r_rfw_shadow_template",
    ) as HTMLTemplateElement;
    const host = document.getElementById("r_rfw_dialog_wrapper") as HTMLElement;
    console.log(host);
    if (!host) return false;
    this.shadowRoot = host.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();

    this.dialog = this.shadowRoot.getElementById(
      "review_form_dialog",
    ) as HTMLDialogElement;

    return true;
  }

  public open() {
    this.dialog?.showModal();
  }

  // Initialize review details with default values
  private initReviewDetails() {
    this.review_details = {
      order_id: 0,
      product_id: 0,
      rating: 0,
      review_text: "",
      first_name: "",
      last_name: "",
      email: "",
      translateX: 0,
      activeSlide: {
        index: 0,
        name: "",
      },
      files: {
        photos: [],
      },
      extra: {
        previous_photo_count: 0,
      },
    };
  }

  // Initialize the form and load initial data
  private init() {
    this.initActiveSlide();
    this.loadInitialData();
  }

  // Initialize the active slide
  private initActiveSlide() {
    this.review_details.activeSlide.index = 0;
    this.review_details.activeSlide.name = this.getSlideNameToSet();
  }

  // Load initial data and render the form
  private loadInitialData() {
    const dialog = this.shadowRoot.querySelector(
      "#review_form_dialog",
    ) as HTMLElement;
    const order_id = dialog?.getAttribute("data-order-id") || "0";
    const product_id = dialog?.getAttribute("data-product-id") || "0";

    this.review_details.order_id = parseInt(order_id, 10);
    this.review_details.product_id = parseInt(product_id, 10);

    this.jquery
      .ajax(this.review_form_store_config.ajax_url, {
        method: "POST",
        data: {
          action: this.review_form_store_config.action,
          method: "review_form_template",
          product_id: product_id,
          order_id: order_id,
          _wp_nonce: this.review_form_store_config._wp_nonce,
          _wp_nonce_key: this.review_form_store_config._wp_nonce_key,
        },
        contentType: "application/x-www-form-urlencoded",
      })
      .then((response: any) => {
        const response_data = response.data;
        this.slides = response_data.slides;
        this.submitSlide = response_data.submit_button_slide;
        this.lastSlide = response_data.last_slide;
        this.initActiveSlide();

        this.jquery(dialog).html(response_data.template);

        // Initialize different sections based on available slides
        if (this.hasSlide("rating")) {
          this.initRatingSection();
        }
        if (this.hasSlide("photo")) {
          this.initPhotoSection();
        }
        if (this.hasSlide("review")) {
          this.initReviewContentSection();
        }
        if (this.hasSlide("reviewer")) {
          this.initReviewerInfoSection();
        }

        this.registerCloseIcon();
        this.initFooter();
        this.showFooter();
      })
      .catch((error: any) => {
        const errorData = error.responseJSON.data;
        this.jquery(dialog).html(errorData.template);
        this.registerCloseIcon();
      });
  }

  // Check if the slide exists
  private hasSlide(name: string): boolean {
    return this.slides.some((slide) => slide.name === name);
  }

  // Get the name of the slide to set based on the current index
  private getSlideNameToSet(): string {
    const slide = this.slides[this.review_details.activeSlide.index];
    return slide ? slide.name : this.review_details.activeSlide.name;
  }

  // Get the active slide name
  private getActiveSlideName(): string {
    return this.review_details.activeSlide.name;
  }

  // Lock the slide to prevent multiple transitions
  private lockSlide() {
    this.sliding = true;
  }

  // Enable slide after transition
  private enableSlide() {
    setTimeout(() => {
      this.sliding = false;
    }, 1000);
  }

  // Check if sliding is locked
  private isSlideLocked(): boolean {
    return this.sliding;
  }

  // Validate the current slide's input
  private validate(): boolean {
    const slideName = this.getActiveSlideName();
    if (slideName === "review") {
      return this.validateReviewContent();
    } else if (slideName === "reviewer") {
      return this.validateReviewerInfo();
    }

    if (slideName == "photo" && this.isSubmitSlidePhoto()) {
      let isPhotoUploaded = this.getUploadedPhotoCount() > 0;

      if (!isPhotoUploaded) {
        alert("Need to Upload minimum one photo");
      }

      return isPhotoUploaded;
    }

    return true;
  }

  // Validate review content
  private validateReviewContent(): boolean {
    const isValid = this.review_details.review_text.trim() !== "";
    const reviewTextError = this.shadowRoot.querySelector(
      ".r_rfw_review_text_error",
    ) as HTMLElement;

    if (!isValid && reviewTextError) {
      this.jquery(reviewTextError)
        .html("Review Text Required")
        .removeClass("r_rfw_hide");
    } else {
      this.jquery(reviewTextError).addClass("r_rfw_hide");
    }

    return isValid;
  }

  // Validate reviewer information
  private validateReviewerInfo(): boolean {
    const firstNameValid = this.review_details.first_name.trim() !== "";
    const lastNameValid = this.review_details.last_name.trim() !== "";
    const emailValid = this.review_details.email.trim() !== "";
    const validEmailFormat = this.validateEmail(
      this.review_details.email.trim(),
    );

    const isValid =
      firstNameValid && lastNameValid && emailValid && validEmailFormat;

    if (!isValid) {
      const firstnameDom = this.shadowRoot.querySelector(
        ".r_rfw_review_info_first_name_error",
      ) as HTMLElement;
      const lastnameDom = this.shadowRoot.querySelector(
        ".r_rfw_review_info_last_name_error",
      ) as HTMLElement;
      const emailDom = this.shadowRoot.querySelector(
        ".r_rfw_review_info_email_error",
      ) as HTMLElement;

      if (!firstNameValid) {
        this.jquery(firstnameDom)
          .html("First name is required")
          .removeClass("r_rfw_hide");
      }
      if (!lastNameValid) {
        this.jquery(lastnameDom)
          .html("Last name is required")
          .removeClass("r_rfw_hide");
      }
      if (!emailValid) {
        this.jquery(emailDom)
          .html("Email is required")
          .removeClass("r_rfw_hide");
      } else if (!validEmailFormat) {
        this.jquery(emailDom)
          .html("Invalid Email format")
          .removeClass("r_rfw_hide");
      }
    } else {
      this.hideReviewerInfoErrors();
    }

    return isValid;
  }

  // Validate email format
  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  // Hide reviewer info errors
  private hideReviewerInfoErrors() {
    this.shadowRoot
      .querySelectorAll(".r_rfw_review_info_error")
      ?.forEach((item: Element) => {
        this.jquery(item).addClass("r_rfw_hide").html("");
      });
  }

  // Slide to the next content
  private async slideNext() {
    if (this.isSlideLocked()) return;

    this.lockSlide();

    if (!this.validate()) {
      this.enableSlide();
      return;
    }

    if (this.getActiveSlideName() === this.submitSlide) {
      const submitResult = await this.submit();
      if (!submitResult) {
        alert("API error occurred");
        this.enableSlide();
        return;
      }

      //if submission is successful we can remove the footer so user.
      this.removeFooter();
    }

    if (this.review_details.activeSlide.index >= this.slides.length - 1) {
      this.enableSlide();
      return;
    }

    this.review_details.activeSlide.index += 1;
    this.review_details.activeSlide.name = this.getSlideNameToSet();
    this.review_details.translateX -= 100;

    this.slide();
    this.enableSlide();
  }

  // Slide to the previous content
  private slidePrev() {
    if (this.review_details.activeSlide.index === 0) {
      return;
    }

    this.review_details.activeSlide.index -= 1;
    this.review_details.activeSlide.name = this.getSlideNameToSet();
    this.review_details.translateX += 100;

    this.slide();
  }

  // Perform the slide animation
  private slide() {
    const mainContentWrapper = this.shadowRoot.querySelector(
      ".r_rfw_main_content_wrapper",
    ) as HTMLElement;
    mainContentWrapper.style.transform = `translateX(${this.review_details.translateX}%)`;

    const activeSlideName = this.getActiveSlideName();
    if (activeSlideName !== "rating" && activeSlideName !== this.lastSlide) {
      this.showFooter();
    } else {
      this.hideFooter();
    }
  }

  // Show footer
  private showFooter() {
    const footer = this.shadowRoot.querySelector(
      ".r_rfw_footer_wrapper",
    ) as HTMLElement;
    if (footer) {
      this.jquery(footer).removeClass("r_rfw_hide");
      const forwardButton = this.shadowRoot.querySelector(
        ".r_rfw_footer_forward_btn",
      ) as HTMLElement;
      if (this.isNeedToShowNext()) {
        const nextButtonName = this.getNextButtonName();
        if (forwardButton) {
          this.jquery(forwardButton).removeClass("r_rfw_hide");
          this.jquery(forwardButton)
            .find(".r_rfw-button__text")
            .text(nextButtonName);
        }
      } else {
        if (forwardButton) {
          this.jquery(forwardButton).addClass("r_rfw_hide");
        }
      }
    }
  }

  // Hide footer
  private hideFooter() {
    const footer = this.shadowRoot.querySelector(
      ".r_rfw_footer_wrapper",
    ) as HTMLElement;
    if (footer) {
      this.jquery(footer).addClass("r_rfw_hide");
    }
  }

  private removeFooter() {
    const footer = this.shadowRoot.querySelector(
      ".r_rfw_footer_wrapper",
    ) as HTMLElement;
    if (footer) {
      this.jquery(footer).remove();
    }
  }

  // Determine if the next button should be shown
  private isNeedToShowNext(): boolean {
    const activeSlideName = this.getActiveSlideName();
    return !["rating", "thank_you", "next_products"].includes(activeSlideName);
  }

  // Get the name for the next button based on the current slide
  private getNextButtonName(): string {
    const activeSlideName = this.getActiveSlideName();
    if (activeSlideName === "photo") {
      return this.submitSlide === "photo"
        ? "DONE"
        : this.review_details.files.photos.length > 0
          ? "CONTINUE"
          : "SKIP";
    } else if (activeSlideName === "review") {
      return this.submitSlide === "review" ? "DONE" : "CONTINUE";
    } else if (activeSlideName === "reviewer") {
      return this.submitSlide === "reviewer" ? "DONE" : "DONE";
    } else {
      return "CONTINUE";
    }
  }

  // Initialize rating section
  private initRatingSection() {
    this.shadowRoot
      .querySelectorAll(".r_rfw_rating_icon")
      .forEach((item: Element, index: number) => {
        item.addEventListener("click", () => {
          this.ratingAnimation(index + 1);
          this.review_details.rating = index + 1;
          this.slideNext();
        });
      });
  }

  // Perform rating animation
  private ratingAnimation(rating: number) {
    this.shadowRoot
      .querySelectorAll(".r_rfw_rating_icon")
      .forEach((item: Element, index: number) => {
        if (index < rating) {
          this.jquery(item).addClass("review_rating_active");
        } else {
          this.jquery(item).removeClass("review_rating_active");
        }
      });
  }

  private isSubmitSlidePhoto() {
    return this.submitSlide == "photo";
  }

  private getUploadedPhotoCount() {
    return this.review_details.files.photos.length;
  }

  private isMaxPhotoUploaded() {
    return (
      this.getUploadedPhotoCount() +
        this.review_details.extra.previous_photo_count >=
      5
    );
  }

  private isPhotoUploadDisabled() {
    return this.isMaxPhotoUploaded();
  }

  // Initialize photo section
  private initPhotoSection() {
    const addPhotoButtons =
      this.shadowRoot.querySelectorAll(".wd_add_photos_btn");
    addPhotoButtons.forEach((item: Element) => {
      this.jquery(item).on("click", () => {
        if (this.isPhotoUploadDisabled()) {
          return;
        }

        const fileInput = this.shadowRoot.querySelector(
          ".r_frw_file_input",
        ) as HTMLElement;
        if (fileInput) {
          this.jquery(fileInput).trigger("click");
        }
      });
    });

    const fileInput = this.shadowRoot.querySelector(".r_frw_file_input");
    fileInput?.addEventListener("change", (e: Event) =>
      this.handleFileUpload(e),
    );

    this.showUploadButtons();
  }

  // Handle file upload
  private handleFileUpload(e: Event) {
    const target = e.target as HTMLInputElement;

    //@ts-ignore
    const file = target?.files ? target.files[0] : null;
    if (!file) return;

    const addIcon = this.shadowRoot.querySelector(".review-plus");
    addIcon?.classList.add("hide");
    this.shadowRoot.querySelectorAll(".r_frw_img_loader").forEach((icon) => {
      return icon?.classList.add("visible");
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();

      formData.append("method", "upload_review_image");
      formData.append("action", this.review_form_store_config.action);
      formData.append("_wp_nonce", this.review_form_store_config._wp_nonce);
      formData.append(
        "_wp_nonce_key",
        this.review_form_store_config._wp_nonce_key,
      );
      formData.append("upload_image", file);

      this.jquery
        .ajax(this.review_form_store_config.ajax_url, {
          method: "POST",
          contentType: false,
          processData: false,
          data: formData,
        })
        .then((response: any) => {
          const data = response.data;

          if (data?.attachment_id) {
            this.review_details.files.photos.push({
              id: data.attachment_id,
              url: data.attachment_url,
            });
            this.addPhotoToList(data.attachment_id, data.attachment_url);
            this.showUploadButtons();
            this.shadowRoot
              .querySelectorAll(".r_frw_img_loader")
              .forEach((icon) => {
                return icon?.classList.remove("visible");
              });
            addIcon?.classList.remove("hide");
            if (!this.isSubmitSlidePhoto()) {
              this.slideNext();
            }
          }
        })
        .catch(() => {
          console.log("Error uploading image");
        });
    };

    reader.readAsDataURL(file);
  }

  // Add uploaded photo to the list
  private addPhotoToList(attachment_id: string, attachment_url: string) {
    const imageContainerTemplate = this.shadowRoot.querySelector(
      ".r_frw_img_container",
    ) as HTMLElement;
    const imageContainer = imageContainerTemplate.cloneNode(
      true,
    ) as HTMLElement;

    this.jquery(imageContainer)
      .attr("image-id", attachment_id)
      .attr("image-url", attachment_url)
      .find("img")
      .attr("src", attachment_url);

    this.jquery(imageContainer).removeClass("r_rfw_hide");

    const list = this.shadowRoot.querySelector(
      ".r_frw_photos_list",
    ) as HTMLDivElement;
    this.jquery(list).prepend(imageContainer);

    const photoContainer = this.shadowRoot.querySelector(
      ".r_frw_view_photos_container",
    ) as HTMLElement;

    this.jquery(photoContainer)
      .find(".r_frw_img_close_icon")
      .on("click", () => this.removePhoto(imageContainer, attachment_id));
  }

  // Remove photo from the list
  private removePhoto(imageContainer: HTMLElement, attachment_id: string) {
    this.review_details.files.photos = this.review_details.files.photos.filter(
      (photo) => photo.id !== attachment_id,
    );
    this.jquery(imageContainer).remove();
    this.showUploadButtons();
  }

  // Show or hide upload buttons based on photo count
  private showUploadButtons() {
    const emptyPhotoSection = this.shadowRoot.querySelector(
      ".r_rfw_empty_photo_section",
    ) as HTMLElement;
    const photoContainer = this.shadowRoot.querySelector(
      ".r_frw_view_photos_container",
    ) as HTMLElement;

    if (this.isPhotoUploadDisabled()) {
      this.jquery(photoContainer).removeClass("r_rfw_hide");

      //@ts-ignore
      const addphoto = this.jquery(photoContainer).find(".wd_add_photos_btn");

      this.jquery(emptyPhotoSection).addClass("r_rfw_hide");

      addphoto.addClass("r_rfw_hide");
    } else {
      if (this.review_details.files.photos.length !== 0) {
        this.jquery(emptyPhotoSection).addClass("r_rfw_hide");
        this.jquery(photoContainer).removeClass("r_rfw_hide");
      } else {
        this.jquery(photoContainer).addClass("r_rfw_hide");
        this.jquery(emptyPhotoSection).removeClass("r_rfw_hide");
      }
    }
  }

  // Initialize review content section
  private initReviewContentSection() {
    const reviewContentInput = this.shadowRoot.querySelector(
      ".r_rfw_review_content_text",
    );
    reviewContentInput?.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.review_details.review_text = target.value;
    });
  }

  // Initialize reviewer info section
  private initReviewerInfoSection() {
    const firstNameInput = this.shadowRoot.querySelector(
      ".r_rfw_reviewer_first_name",
    );
    firstNameInput?.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.review_details.first_name = target.value;
    });

    const lastNameInput = this.shadowRoot.querySelector(
      ".r_rfw_reviewer_last_name",
    );
    lastNameInput?.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.review_details.last_name = target.value;
    });

    const emailInput = this.shadowRoot.querySelector(".r_rfw_reviewer_email");
    emailInput?.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.review_details.email = target.value;
    });
  }

  // Initialize footer
  private initFooter() {
    // Back button event
    this.shadowRoot
      .querySelectorAll(".r_rfw_footer_back_btn")
      .forEach((item: Element) => {
        item.addEventListener("click", () => this.slidePrev());
      });

    // Forward button event
    this.shadowRoot
      .querySelectorAll(".r_rfw_footer_forward_btn, .r_rfw_continue_btn")
      .forEach((item: Element) => {
        item.addEventListener("click", (e: any) => {
          e.preventDefault();
          this.slideNext();
        });
      });

    this.hideFooter();
  }

  private registerCloseIcon() {
    // Close dialog event
    this.shadowRoot
      .querySelector(".r_rfw_dialog_close_icon")
      ?.addEventListener("click", () => {
        if (this.review_form_store_config.is_product_page) {
          this.dialog?.close();
        } else {
          setTimeout(() => {
            window.location.href = "shop";
          }, 500);
        }
      });
  }

  private submitLoading(submit: boolean = false) {
    const submitButton = this.shadowRoot.querySelector(".r_rfw-submit_button");

    submit
      ? this.jquery(submitButton).addClass("r_rfw-button--loading")
      : this.jquery(submitButton).removeClass("r_rfw-button--loading");
  }

  // Submit the form data
  private async submit(): Promise<boolean> {
    this.submitLoading(true);
    try {
      const data: any = {
        method: "save_customer_review",
        submit_slide: this.submitSlide,
        action: this.review_form_store_config.action,
        product_id: this.review_details.product_id,
        order_id: this.review_details.order_id,
        review_text: this.review_details.review_text,
        rating: this.review_details.rating,
        photos: this.review_details.files.photos,
        first_name: this.review_details.first_name,
        last_name: this.review_details.last_name,
        email: this.review_details.last_name,
      };

      if (!this.review_details.order_id) {
        data.last_name = this.review_details.last_name;
        data.email = this.review_details.email;
      }

      const result = await this.jquery.ajax(
        this.review_form_store_config.ajax_url,
        {
          method: "POST",
          data: data,
          contentType: "application/x-www-form-urlencoded",
        },
      );

      this.submitLoading(false);

      return result ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

// Instantiate the ReviewFormWidget

const REVIEW_FORM = () => {
  if (!(window as any).reviewFormWidgetInitialized) {
    // First time execution logic
    const reviewFormWidget = new ReviewFormWidget();

    // Store the floating widget in the window for future use
    (window as any).reviwFormWidget = reviewFormWidget;

    // Set the flag to true after first initialization
    (window as any).reviewFormWidgetInitialized = true;
  }

  (window as any).reviwFormWidget.open();
};

document.addEventListener("DOMContentLoaded", function () {
  (window as any).REVIEW_FORM_WIDGET = REVIEW_FORM;
});
