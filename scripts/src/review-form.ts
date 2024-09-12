// src/app.ts

//@ts-ignore
import ChangeEvent = JQuery.ChangeEvent;
import ClickEvent = JQuery.ClickEvent;

jQuery(document).ready(($) => {

    const template = document.getElementById('r_rfw_shadow_template') as HTMLTemplateElement;

// Step 2: Get the host element where the Shadow DOM will be attached
    const host = document.getElementById('r_rfw_dialog_wrapper') as HTMLElement;

    const shadowRoot = host.attachShadow({mode: 'open'});

    console.log(template)

    shadowRoot.appendChild(template.content.cloneNode(true));
    template.remove();


    const review_details = {
        rating: 0,
        translateX: 0,
        activeSlide: 1,
    };


    const REVIEW_FORM: any = {
        slide: () => {
            let mainContentWrapper = shadowRoot?.querySelector('.r_rfw_main_content_wrapper') as HTMLElement;
            mainContentWrapper.style.transform = `translateX(${review_details.translateX}%)`

            if (review_details.activeSlide != 1) {
                REVIEW_FORM.showFooter();
            } else {
                REVIEW_FORM.hideFooter();
            }

            let skipBtn = shadowRoot?.querySelector('.r_rfw_footer_forward_btn') as HTMLButtonElement
            if (review_details.activeSlide == 2) {
                $(skipBtn).css('display', 'block');
            } else {
                $(skipBtn).css('display', 'none');
            }
        },
        slideNext: () => {
            review_details.activeSlide += 1
            review_details.translateX -= 100;
            REVIEW_FORM.slide();
        },
        slidePrev: () => {
            review_details.activeSlide -= 1
            review_details.translateX += 100;
            REVIEW_FORM.slide()
        },
        hideFooter: () => {
            let footer = shadowRoot.querySelector('.r_rfw_footer_wrapper') as HTMLElement;
            if (footer) {
                $(footer).css('display', 'none')
            }
        },
        showFooter: () => {
            let footer = shadowRoot.querySelector('.r_rfw_footer_wrapper') as HTMLElement;
            if (footer) {
                $(footer).css('display', 'flex')
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

                shadowRoot.querySelectorAll('.r_rfw_footer_back_btn').forEach((item: Element, index: number) => {
                    item.addEventListener('click', function () {
                        REVIEW_FORM.slidePrev();
                    })
                })

                shadowRoot.querySelectorAll('.r_rfw_footer_forward_btn, .r_rfw_continue_btn').forEach((item: Element, index: number) => {
                    item.addEventListener('click', function () {
                        REVIEW_FORM.slideNext();
                    })
                })

                shadowRoot.querySelector('.r_rfw_dialog_close_icon')?.addEventListener('click', function () {
                    setTimeout(() => {
                        window.location.href = 'shop'
                    }, 500)
                });

                REVIEW_FORM.hideFooter();
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
                        let imageContainer = shadowRoot.querySelector('.r_frw_img_container')?.cloneNode(true) as HTMLElement;
                        console.log(imageContainer)
                        //@ts-ignore
                        $(imageContainer)?.find('img').attr('src', reader.result);
                        $(imageContainer).css('display', 'block')

                        let list = shadowRoot.querySelector('.r_frw_photos_list') as HTMLDivElement

                        console.log(list)

                        $(list)?.prepend(imageContainer);

                        let photoContainer = shadowRoot.querySelector('.r_frw_view_photos_container') as HTMLElement;
                        $(photoContainer)?.css('display', 'flex')

                        let addPhotoBtn = shadowRoot.querySelector('.r_frw_add_photos_btn') as HTMLElement;
                        $(addPhotoBtn)?.css('display', 'none')

                        REVIEW_FORM.slideNext();
                    };

                    reader.readAsDataURL(file);
                })
            }
        }
    }

    REVIEW_FORM.rating.init();
    REVIEW_FORM.photo.init();

//     const openDialogButton = shadowRoot.getElementById('open-dialog') as HTMLElement;
//
// // Step 6: Add event listener to the button to open the dialog
//     openDialogButton.addEventListener('click', () => {
//         console.log('clicked')
//         shadowRoot.getElementById('review_form_dialog')?.setAttribute('open', '')
//     });

});
