// src/app.ts

//@ts-ignore
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

                shadowRoot.querySelectorAll('.r_rfw_footer_forward_btn').forEach((item: Element, index: number) => {
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
                shadowRoot.querySelector('.r_frw_add_photos_btn')?.addEventListener('click', () => {
                  shadowRoot.querySelector('')
                });
            }
        }
    }

    REVIEW_FORM.rating.init();

//     const openDialogButton = shadowRoot.getElementById('open-dialog') as HTMLElement;
//
// // Step 6: Add event listener to the button to open the dialog
//     openDialogButton.addEventListener('click', () => {
//         console.log('clicked')
//         shadowRoot.getElementById('review_form_dialog')?.setAttribute('open', '')
//     });

});
