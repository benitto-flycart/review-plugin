// src/app.ts

//@ts-ignore
import ChangeEvent = JQuery.ChangeEvent;
import ClickEvent = JQuery.ClickEvent;
import {ajax} from "jquery";

jQuery(document).ready(($) => {

    (function WIDGET_REVIEW_FORM_DEFAULT() {


        type TStoreConfig = {
            home_url: string,
            admin_url: string,
            action: string,
            ajax_url: string,
            _wp_nonce_key: string
            _wp_nonce: string
        };

        //@ts-ignore
        const review_form_store_config: TStoreConfig = window.review_form_store_config;

        const template = document.getElementById('r_rfw_shadow_template') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
        const host = document.getElementById('r_rfw_dialog_wrapper') as HTMLElement;

        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        type TReviewDetails = {
            order_id: number,
            product_id: number,
            rating: number,
            review_text: string,
            first_name: string,
            last_name: string,
            email: string
            translateX: number,
            files: {
                photos: any,
            },
            activeSlide: {
                index: number,
                name: string
            }
        };

        const review_details: TReviewDetails = {
            order_id: 0,
            product_id: 0,
            rating: 0,
            review_text: '',
            first_name: '',
            last_name: '',
            email: '',
            translateX: 0,
            activeSlide: {
                index: 0,
                name: ''
            },
            files: {
                photos: [],
            }
        };

        const REVIEW_FORM: any = {
            submitSlide: '',
            lastSlide: '',
            initActiveSlide: () => {
                review_details.activeSlide.index = 0;
                review_details.activeSlide.name = REVIEW_FORM.getSlideNameToSet();
            },
            sliding: false,
            slideInLock: () => {
                return REVIEW_FORM.sliding
            },
            lockSlide: () => {
                REVIEW_FORM.sliding = true;
            },
            enableSlide: () => {
                setTimeout(() => {
                    REVIEW_FORM.sliding = false;
                }, 1000)
            },
            validate: () => {
                let slideName = REVIEW_FORM.getActiveSlideName();

                console.log('printing slide name inside validate')
                console.log(slideName)
                if (slideName == 'review') {
                    return REVIEW_FORM.validateReviewContent();
                } else if (slideName == 'reviewer') {
                    return REVIEW_FORM.validateReviewerInfo();
                }

                return true;
            },
            validateReviewContent: (): boolean => {
                let isValid = review_details.review_text.trim() != '';

                let reviewTextError = shadowRoot.querySelector('.r_rfw_review_text_error') as HTMLElement;

                if (!isValid && reviewTextError) {
                    $(reviewTextError).html('Review Text Required')
                    $(reviewTextError).removeClass('r_rfw_hide')
                } else {
                    $(reviewTextError).addClass('r_rfw_hide')
                }

                return isValid;
            },
            validateReviewerInfo: (): boolean => {
                function hideReviewerInfoErrors() {
                    shadowRoot.querySelectorAll('.r_rfw_review_info_error')?.forEach((item: any, index: number) => {
                        $(item).addClass('r_rfw_hide').html('')
                    });
                };

                function validateEmail(email: string) {
                    // Regular expression for email validation
                    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                    return re.test(email);
                }

                hideReviewerInfoErrors();

                let firstNameValid = review_details.first_name.trim() != '';
                let lastNameValid = review_details.last_name.trim() != '';
                let emailValid = review_details.email.trim() != '';
                let validEmailFormat = validateEmail(review_details.email.trim())

                let isValid = firstNameValid && lastNameValid && emailValid && validEmailFormat;

                if (!isValid) {
                    let firstnameDom = shadowRoot.querySelector('.r_rfw_review_info_first_name_error') as HTMLElement;
                    let lastnameDom = shadowRoot.querySelector('.r_rfw_review_info_last_name_error') as HTMLElement;
                    let emailDom = shadowRoot.querySelector('.r_rfw_review_info_email_error') as HTMLElement;

                    if (!firstNameValid) {
                        $(firstnameDom).html('first name is required').removeClass('r_rfw_hide')
                    }

                    if (!lastNameValid) {
                        $(lastnameDom).html('Last name is required').removeClass('r_rfw_hide')
                    }

                    if (!emailValid) {
                        $(emailDom).html('Email is required').removeClass('r_rfw_hide')
                    } else if (!validEmailFormat) {
                        $(emailDom).html('Invalid Email format').removeClass('r_rfw_hide')
                    }
                } else {
                    hideReviewerInfoErrors();
                }

                return isValid;
            },
            getActiveSlideName: () => {
                return review_details.activeSlide.name;
            },
            getSlideNameToSet: () => {
                let slides = {...REVIEW_FORM.slides}
                let index = review_details?.activeSlide?.index

                if (index == undefined) return review_details.activeSlide.name;

                let slide = slides[index];

                return slide.name;
            },
            getActiveSlideIndex: () => {
                return review_details.activeSlide.index;
            },
            getNextButtonName: () => {
                if (REVIEW_FORM.getActiveSlideName() == 'photo') {
                    return REVIEW_FORM.submitSlide == 'photo' ? 'DONE' : review_details.files.photos.length > 0 ? 'CONTINUE' : 'SKIP';
                    // return images.length == 0 ? 'Skip' : 'Continue';
                } else if (REVIEW_FORM.getActiveSlideName() == 'review') {
                    return REVIEW_FORM.submitSlide == 'review' ? 'DONE' : 'Continue';
                } else if (REVIEW_FORM.getActiveSlideName() == 'reviewer') {
                    return REVIEW_FORM.submitSlide == 'reviewer' ? 'DONE' : 'Done';
                } else {
                    return 'Continue';
                }
            },
            isNeedToShowNext: () => {
                if (REVIEW_FORM.getActiveSlideName() == 'rating' || REVIEW_FORM.getActiveSlideName() == 'thank_you' || review_details.activeSlide.name == 'next_products') {
                    return false;
                }

                return true;
            },
            slide: () => {
                let mainContentWrapper = shadowRoot?.querySelector('.r_rfw_main_content_wrapper') as HTMLElement;
                mainContentWrapper.style.transform = `translateX(${review_details.translateX}%)`

                let activeSlideName = REVIEW_FORM.getActiveSlideName();
                if (activeSlideName != 'rating' && activeSlideName != REVIEW_FORM.lastSlide) {
                    REVIEW_FORM.showFooter();
                } else {
                    REVIEW_FORM.hideFooter();
                }
            },
            slideNext: async () => {

                //if Previous action is incomplete early returning
                if (REVIEW_FORM.slideInLock()) return;

                REVIEW_FORM.lockSlide();

                if (!REVIEW_FORM.validate()) {
                    REVIEW_FORM.enableSlide()
                    return;
                }

                if (REVIEW_FORM.getActiveSlideName() == REVIEW_FORM.submitSlide) {
                    const submitResult = await REVIEW_FORM.submit();
                    console.log(submitResult);
                    if (!submitResult) {
                        alert('api error occurred')
                        REVIEW_FORM.enableSlide();
                        return;
                    }
                }

                if (review_details.activeSlide.index == REVIEW_FORM.slides.length - 1) {
                    REVIEW_FORM.enableSlide()
                    return;
                }

                //Updating Sliding Index and Sliding name
                review_details.activeSlide.index += 1;
                review_details.activeSlide.name = REVIEW_FORM.getSlideNameToSet();
                review_details.translateX -= 100;

                REVIEW_FORM.slide();

                REVIEW_FORM.enableSlide();

            },
            slidePrev: () => {
                if (review_details.activeSlide.index == 0) {
                    return;
                }

                review_details.activeSlide.index -= 1
                review_details.activeSlide.name = REVIEW_FORM.getSlideNameToSet();

                review_details.translateX += 100;
                REVIEW_FORM.slide()
            },
            hideFooter: () => {
                let footer = shadowRoot.querySelector('.r_rfw_footer_wrapper') as HTMLElement;

                if (footer) {
                    $(footer).addClass('r_rfw_hide')
                }
            },
            showFooter: () => {
                let footer = shadowRoot.querySelector('.r_rfw_footer_wrapper') as HTMLElement;

                if (footer) {
                    $(footer).removeClass('r_rfw_hide')
                    let forwardButton = shadowRoot.querySelector('.r_rfw_footer_forward_btn') as HTMLElement;
                    if (REVIEW_FORM.isNeedToShowNext()) {
                        let nextButtonName = REVIEW_FORM.getNextButtonName();
                        if (forwardButton) {
                            $(forwardButton).html(nextButtonName);
                            $(forwardButton).removeClass('r_rfw_hide');
                        }
                    } else {
                        if (forwardButton) {
                            $(forwardButton).addClass('r_rfw_hide');
                        }
                    }
                }
            },
            rating: {
                init: () => {
                    shadowRoot.querySelectorAll('.r_rfw_rating_icon').forEach((item: Element, index: number) => {
                        item.addEventListener('click', function () {
                            // @ts-ignore
                            REVIEW_FORM.rating.ratingAnimation(index + 1);
                            REVIEW_FORM.slideNext();
                        })
                    })
                },
                ratingAnimation: (rating: number) => {
                    shadowRoot.querySelectorAll('.r_rfw_rating_icon').forEach((item: Element, index: number) => {
                        if (index < rating) {
                            $(item).addClass('review_rating_active');
                        } else {
                            $(item).removeClass('review_rating_active');
                        }
                    })
                }
            },
            photo: {
                init: () => {
                    shadowRoot.querySelectorAll('.wd_add_photos_btn')?.forEach((item: Element, index: number) => {
                        $(item).on('click', () => {
                            let fileInput = shadowRoot.querySelector('.r_frw_file_input') as HTMLElement;
                            if (fileInput) {
                                $(fileInput).trigger('click')
                            }
                        })
                    });

                    shadowRoot.querySelectorAll('.r_frw_img_close_icon')?.forEach((item: Element, index: number) => {
                        $(item).on('click', (e: ClickEvent) => {
                            alert('clicked')
                        })
                    })


                    shadowRoot.querySelector('.r_frw_file_input')?.addEventListener('change', (e: any) => {
                        let file = e.target?.files[0];

                        const reader = new FileReader();

                        reader.onloadend = () => {
                            let formData = new FormData();

                            // Append your other data
                            formData.append('method', 'upload_review_image');
                            formData.append('action', review_form_store_config.action);
                            formData.append('_wp_nonce', review_form_store_config._wp_nonce);
                            formData.append('_wp_nonce_key', review_form_store_config._wp_nonce_key);

                            // Append the file
                            formData.append('upload_image', file);

                            $.ajax(review_form_store_config.ajax_url, {
                                method: 'POST',
                                contentType: false,
                                processData: false,
                                data: formData,
                            }).then((response) => {
                                const data = response.data;

                                if (data?.attachment_id) {
                                    review_details.files.photos.push({
                                        id: data.attachment_id,
                                        url: data.attachment_url
                                    });
                                } else {
                                    return;
                                }

                                console.log(review_details.files)


                                let imageContainer = shadowRoot.querySelector('.r_frw_img_container')?.cloneNode(true) as HTMLElement;

                                //Setting attachment id used when for deleting.
                                $(imageContainer).attr('image-id', data.attachment_id);
                                $(imageContainer).attr('image-url', data.attachment_url);

                                //@ts-ignore
                                $(imageContainer)?.find('img').attr('src', data.attachment_url);
                                $(imageContainer).removeClass('r_rfw_hide')

                                let list = shadowRoot.querySelector('.r_frw_photos_list') as HTMLDivElement

                                $(list)?.prepend(imageContainer);

                                let photoContainer = shadowRoot.querySelector('.r_frw_view_photos_container') as HTMLElement;

                                $(photoContainer)?.find('.r_frw_img_close_icon').on('click', function () {
                                    let imgContainer = $(this).parent();
                                    let image_id = imgContainer.attr('image-id');

                                    let remaining_photos = review_details.files.photos.filter((photo: any) => photo.id != image_id);

                                    review_details.files.photos = remaining_photos;
                                    imgContainer.remove();

                                    showUploadButtons();

                                });

                                function showUploadButtons() {
                                    let addPhotoBtn = shadowRoot.querySelector('.r_rfw_empty_photo_section') as HTMLElement;

                                    if (review_details.files.photos.length != 0) {
                                        $(addPhotoBtn)?.addClass('r_rfw_hide')
                                        $(photoContainer)?.removeClass('r_rfw_hide')
                                    } else {
                                        $(photoContainer)?.addClass('r_rfw_hide')
                                        $(addPhotoBtn)?.removeClass('r_rfw_hide')
                                    }
                                }


                                showUploadButtons();


                                REVIEW_FORM.slideNext();
                            }).catch(() => {

                            })
                        };

                        reader.readAsDataURL(file);
                    })
                }
            },
            review_content: {
                init: () => {
                    shadowRoot.querySelector('.r_rfw_review_content_text')?.addEventListener('change', (event: any) => {
                        review_details.review_text = event.target.value;
                    })
                }
            },
            reviewer_info: {
                init: () => {
                    shadowRoot.querySelector('.r_rfw_reviewer_first_name')?.addEventListener('change', (event: any) => {
                        review_details.first_name = event.target.value;
                        console.log('updating first name')
                    })

                    shadowRoot.querySelector('.r_rfw_reviewer_last_name')?.addEventListener('change', (event: any) => {
                        review_details.last_name = event.target.value;
                        console.log('updating last name')
                    })

                    shadowRoot.querySelector('.r_rfw_reviewer_email')?.addEventListener('change', (event: any) => {
                        review_details.email = event.target.value;
                    })
                }
            },
            footer: {
                init: () => {
                    shadowRoot.querySelectorAll('.r_rfw_footer_back_btn').forEach((item: Element, index: number) => {
                        item.addEventListener('click', function () {
                            REVIEW_FORM.slidePrev();
                        })
                    })

                    shadowRoot.querySelectorAll('.r_rfw_footer_forward_btn, .r_rfw_continue_btn').forEach((item: Element, index: number) => {
                        item.addEventListener('click', function () {
                            console.log('clicked')
                            REVIEW_FORM.slideNext();
                        })
                    })

                    shadowRoot.querySelector('.r_rfw_dialog_close_icon')?.addEventListener('click', function () {
                        setTimeout(() => {
                            window.location.href = 'shop'
                        }, 500)
                    });

                    REVIEW_FORM.hideFooter();
                }
            },
            init: () => {
                let dialog = shadowRoot.querySelector('#review_form_dialog') as HTMLElement;
                console.log(dialog)

                let order_id = dialog?.getAttribute('data-order-id');
                let product_id = dialog?.getAttribute('data-product-id');

                //@ts-ignore
                review_details.order_id = order_id ? order_id : 0;
                //@ts-ignore
                review_details.product_id = product_id ? product_id : 0;

                $.ajax(review_form_store_config.ajax_url, {
                    method: 'POST',
                    data: {
                        action: review_form_store_config.action,
                        method: 'review_form_template',
                        product_id: product_id,
                        order_id: order_id,
                        _wp_nonce: review_form_store_config._wp_nonce,
                        _wp_nonce_key: review_form_store_config._wp_nonce_key,
                    },
                    contentType: 'application/x-www-form-urlencoded',
                }).then((response) => {
                    const response_data = response.data;
                    REVIEW_FORM.slides = response_data.slides;
                    REVIEW_FORM.submitSlide = response_data.submit_button_slide;
                    REVIEW_FORM.lastSlide = response_data.last_slide;
                    REVIEW_FORM.initActiveSlide();

                    $(dialog).html(response_data.template);

                    if (REVIEW_FORM.hasSlide('rating')) {
                        console.log('rating not called')
                        REVIEW_FORM.rating.init();
                    }

                    if (REVIEW_FORM.hasSlide('photo')) {
                        console.log('photo called')
                        REVIEW_FORM.photo.init();
                    }

                    if (REVIEW_FORM.hasSlide('review')) {
                        REVIEW_FORM.review_content.init();
                    }

                    if (REVIEW_FORM.hasSlide('reviewer')) {
                        REVIEW_FORM.reviewer_info.init();
                    }

                    REVIEW_FORM.footer.init();
                    REVIEW_FORM.showFooter();
                }).catch(() => {
                    console.log("error occurred while loading review template");
                })
            },
            hasSlide: (name: string): boolean => {
                let found = REVIEW_FORM.slides.find((item: any) => {
                    return item.name == name
                })
                return found ? true : false;
            },
            submit: async () => {
                let result;

                try {
                    result = await $.ajax(review_form_store_config.ajax_url, {
                        method: 'POST',
                        data: {
                            method: 'save_customer_review',
                            action: review_form_store_config.action,
                            product_id: review_details.product_id,
                            order_id: review_details.order_id,
                            review_text: review_details.review_text,
                            rating: review_details.rating,
                            ...(!review_details.order_id ? {
                                review_text: review_details.review_text,
                                last_name: review_details.last_name,
                                email: review_details.email,
                            } : {}),
                            photos: review_details.files.photos
                        }
                    });

                    return result;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
        }
        REVIEW_FORM.init();
    })();
});
