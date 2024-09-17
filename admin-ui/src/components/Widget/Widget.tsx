import React, {useEffect, useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import ProductWidget from "./ProductReviewWidget/ProductWidget";
import ProductWidgetContextAPI from "./ProductReviewWidget/ProductReviewContextAPI";
import PopupWidgetContextAPI from "./PopupWidget/PopupWidgetContextAPI";
import PopupWidgetDialog from "./PopupWidget/PopupWidgetDialog";
import FloatingProductWidgetDialog from "./FloatingProductWidget/FloatingProductWidgetDialog";
import FloatingProductWidgetContextAPI from "./FloatingProductWidget/FloatingProductWidgetContextAPI";
import SnippetWidgetDialog from "./SnippetWidget/SnippetWidgetDialog";
import SnippetWidgetContextAPI from "./SnippetWidget/SnippetWidgetContextAPI";
import RatingWidgetDialog from "./RatingWidget/RatingWidgetDialog";
import RatingWidgetContextAPI from "./RatingWidget/RatingWidgetContextAPI";
import ReviewFormWidgetContextAPI from "./ReviewFormWidget/ReviewFormWidgetContextAPI";
import ReviewFormWidgetDialog from "./ReviewFormWidget/ReviewFormDialogWidgetDialog";
import {Tabs, TabsList, TabsTrigger} from "../ui/tabs";
import {useLocalState} from "../zustand/localState";
import SidebarWidgetDialog from "./SidebarWidget/SidebarWidgetDialog";
import SidebarWidgetContextAPI from "./SidebarWidget/SidebarWidgetContextAPI";
import {Switch} from "../ui/switch";
import {produce} from "immer";
import {toastrError, toastrSuccess} from "../../helpers/ToastrHelper";
import {axiosClient} from "../api/axios";
import SampleReviewsContextAPI from "./SampleReviewsAPI";

type WidgetState = {
    product_reviews_widget: { is_enabled: boolean };
    popup_widget: { is_enabled: boolean };
    reviews_sidebar_widget: { is_enabled: boolean };
    floating_product_reviews_widget: { is_enabled: boolean };
    snippet_widget: { is_enabled: boolean };
    rating_review_widget: { is_enabled: boolean };
    review_form_widget: { is_enabled: boolean };
};

const Widget = () => {
    const {localState} = useLocalState();
    const availableLanguages = localState.available_languages;
    const [activeDialog, setActiveDialog] = useState<string>('')
    const [currentLocale, setCurrentLocale] = useState<string>(localState.current_locale)

    const [loading, setLoading] = useState<boolean>(false)

    const [widgetState, setWidgetState] = useState<WidgetState>({
        product_reviews_widget: {
            is_enabled: true
        },
        popup_widget: {
            is_enabled: false
        },
        reviews_sidebar_widget: {
            is_enabled: false
        },
        floating_product_reviews_widget: {
            is_enabled: true
        },
        snippet_widget: {
            is_enabled: false
        },
        rating_review_widget: {
            is_enabled: false
        },
        review_form_widget: {
            is_enabled: true
        },
    })

    const reset = () => {
        setActiveDialog('')
    };

    const widgets = [
        {
            title: "Product Reviews Widget",
            slug: "product_reviews_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <ProductWidgetContextAPI>
                <ProductWidget show={true} toggle={reset} currentLocale={currentLocale}/>
            </ProductWidgetContextAPI>
        },
        {
            title: "Popup Widget",
            slug: "popup_widget",
            description: "Customize your new project in one-click",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <PopupWidgetContextAPI>
                <PopupWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </PopupWidgetContextAPI>
        }, {
            title: "Reviews Sidebar Widget",
            slug: "reviews_sidebar_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <SidebarWidgetContextAPI>
                <SidebarWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </SidebarWidgetContextAPI>
        }, {
            title: "Floating Product Reviews Widget",
            slug: "floating_product_reviews_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <FloatingProductWidgetContextAPI>
                <FloatingProductWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </FloatingProductWidgetContextAPI>
        }, {
            title: "Snippet Widget",
            slug: "snippet_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <SnippetWidgetContextAPI>
                <SnippetWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </SnippetWidgetContextAPI>
        }, {
            title: "Rating Review Widget",
            slug: "rating_review_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            viewComponent: <RatingWidgetContextAPI>
                <RatingWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </RatingWidgetContextAPI>
        }, {
            title: "Review Form Widget",
            slug: "review_form_widget",
            description: "Customize your new project in one-click.",
            detailed_description: "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
            route: "/emails/review-request",
            viewComponent: <ReviewFormWidgetContextAPI>
                <ReviewFormWidgetDialog show={true} toggle={reset} currentLocale={currentLocale}/>
            </ReviewFormWidgetContextAPI>
        },
    ]

    const getWidgetStatus = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_status',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
        }).then((response: any) => {
            let data = response.data.data
            setWidgetState(data)
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    }

    const setWidgetStatus = (slug: any, is_enabled: boolean) => {
        axiosClient.post(``, {
            method: 'widget_update_status',
            widget_slug: slug,
            is_enabled: is_enabled,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response) => {
            toastrSuccess("Program is Set to Active");
            getWidgetStatus()
        }).catch((error) => {
            toastrError("Error Occurred");
            updateWidgetStateFields((draftState: any) => {
                draftState[slug as keyof WidgetState].is_enabled = !is_enabled
            })
        })
    }

    const updateWidgetStateFields = (cb: any) => {
        const state = produce(widgetState, (draftState: any) => {
            cb(draftState)
        })
        setWidgetState(state)
    }

    useEffect(() => {
        getWidgetStatus()
    }, [])

    return (<div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
        <SampleReviewsContextAPI>
            <div>
                {availableLanguages.length > 0 && (
                    <Tabs defaultValue={currentLocale} className="w-[400px]">
                        <TabsList className={"!frt-flex-wrap !frt-h-auto !frt-justify-start !frt-gap-1"}>
                            {availableLanguages.map((item: any, index: number) => {
                                return (<TabsTrigger key={index} value={item.value} onClick={() => {
                                    setCurrentLocale(item.value)
                                }}>{item.label}</TabsTrigger>)
                            })}
                        </TabsList>
                    </Tabs>
                )}
            </div>
            <div className="frt-grid lg:frt-grid-cols-3 md:frt-grid-cols-2 sm:frt-grid-cols-1 frt-gap-4">
                {
                    widgets.map((widget, index: number) => {
                        return (
                            <Card className={"frt-shadow-primary"} key={index}>
                                <CardHeader>
                                    <CardTitle>{widget.title}</CardTitle>
                                    <CardDescription>{widget.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{widget.detailed_description}</p>
                                </CardContent>
                                <CardFooter className="frt-flex frt-justify-end !frt-gap-3">
                                    <Switch checked={widgetState[widget.slug as keyof WidgetState].is_enabled}
                                            onCheckedChange={(value) => {
                                                updateWidgetStateFields((draftState: any) => {
                                                    draftState[widget.slug as keyof WidgetState].is_enabled = value
                                                })
                                                setWidgetStatus(widget.slug, value);
                                            }}/>
                                    <Button onClick={() => {
                                        setActiveDialog(widget.slug)
                                    }}>
                                        Customize
                                    </Button>
                                    {activeDialog == widget.slug ? (widget.viewComponent) : null}
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </SampleReviewsContextAPI>
    </div>)
};

export default Widget;