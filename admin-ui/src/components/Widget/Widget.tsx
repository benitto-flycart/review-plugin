import React, { useEffect, useState } from "react";
import "@/src/styles/dashboard/dashboard.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useLocalState } from "../zustand/localState";
import SidebarWidgetDialog from "./SidebarWidget/SidebarWidgetDialog";
import SidebarWidgetContextAPI from "./SidebarWidget/SidebarWidgetContextAPI";
import { Switch } from "../ui/switch";
import { produce } from "immer";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { axiosClient } from "../api/axios";
import SampleReviewsContextAPI from "./SampleReviewsAPI";
import ReviewDetailWidgetContextAPI from "./ReviewDetailWidget/ReviewDetailWidgetContextAPI";
import ReviewDetailDialogWidget from "./ReviewDetailWidget/ReviewDetailDialogWidget";
import { Languages } from "lucide-react";

type WidgetState = {
  product_widget: { is_enabled: boolean };
  popup_widget: { is_enabled: boolean };
  sidebar_widget: { is_enabled: boolean };
  floating_product_widget: { is_enabled: boolean };
  snippet_widget: { is_enabled: boolean };
  rating_widget: { is_enabled: boolean };
  review_form_widget: { is_enabled: boolean };
  review_detail_widget: { is_enabled: boolean };
};

const Widget = () => {
  const { localState } = useLocalState();
  const availableLanguages = localState.available_languages;
  const [activeDialog, setActiveDialog] = useState<string>("");
  const [currentLocale, setCurrentLocale] = useState<string>(
    localState.current_locale,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [widgetState, setWidgetState] = useState<WidgetState>({
    product_widget: {
      is_enabled: true,
    },
    popup_widget: {
      is_enabled: false,
    },
    sidebar_widget: {
      is_enabled: false,
    },
    floating_product_widget: {
      is_enabled: true,
    },
    snippet_widget: {
      is_enabled: false,
    },
    rating_widget: {
      is_enabled: false,
    },
    review_form_widget: {
      is_enabled: true,
    },
    review_detail_widget: {
      is_enabled: true,
    },
  });

  const reset = () => {
    setActiveDialog("");
  };

  const widgets = [
    {
      title: "Product Reviews Widget",
      slug: "product_widget",
      description: "Convert visitors into buyers",
      detailed_description:
        "Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts",
      viewComponent: (
        <ProductWidgetContextAPI>
          <ProductWidget
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </ProductWidgetContextAPI>
      ),
    },
    {
      title: "Popup Widget",
      slug: "popup_widget",
      description: "Spotlight relevant reviews",
      detailed_description:
        "Spotlight relevant reviews and drive visitors to your product pages with a subtle social proof pop-up",
      viewComponent: (
        <PopupWidgetContextAPI>
          <PopupWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </PopupWidgetContextAPI>
      ),
    },
    {
      title: "Reviews Sidebar Widget",
      slug: "sidebar_widget",
      description:
        "Give your visitors easy access to all of your store's reviews",
      detailed_description:
        "Give your visitors easy access to all of your store's reviews by clicking a tab on the side of their screen",
      viewComponent: (
        <SidebarWidgetContextAPI>
          <SidebarWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </SidebarWidgetContextAPI>
      ),
    },
    {
      title: "Floating Product Reviews Widget",
      slug: "floating_product_widget",
      description: "Present your reviews on a floating display",
      detailed_description:
        "Present your reviews on a floating display so users can browse through reviews without leaving the page they are currently on",
      viewComponent: (
        <FloatingProductWidgetContextAPI>
          <FloatingProductWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </FloatingProductWidgetContextAPI>
      ),
    },
    {
      title: "Snippet Widget",
      slug: "snippet_widget",
      description:
        "Build instant trust by showing a glimpse of your best reviews",
      detailed_description:
        "Build instant trust by showing a glimpse of your best reviews at the top of your product pages, where purchase decisions are made",
      viewComponent: (
        <SnippetWidgetContextAPI>
          <SnippetWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </SnippetWidgetContextAPI>
      ),
    },
    {
      title: "Rating Review Widget",
      slug: "rating_widget",
      description: "Display your rating icons at the top of your product",
      detailed_description:
        "Display your rating icons at the top of your product pages and across your store to enhance your product’s credibility",
      viewComponent: (
        <RatingWidgetContextAPI>
          <RatingWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </RatingWidgetContextAPI>
      ),
    },
    {
      title: "Review Form Widget",
      slug: "review_form_widget",
      description: "Customize the Review Form",
      detailed_description:
        "Add a stylish review form to your store, enabling customers to easily share feedback and enhance trust. Fully customizable, this widget lets you adjust colors, themes, and styles to match your brand's look. Encourage reviews that build credibility and connect with potential buyers",
      route: "/emails/review-request",
      viewComponent: (
        <ReviewFormWidgetContextAPI>
          <ReviewFormWidgetDialog
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </ReviewFormWidgetContextAPI>
      ),
    },
    {
      title: "Review Detail Widget",
      slug: "review_detail_widget",
      description: "Customize the Review Detail Widget",
      detailed_description:
        "Showcase customer feedback directly on your product pages with the Review Details widget to build trust and credibility. Customize colors, themes, and layout to align seamlessly with your brand's look and feel",
      route: "/emails/review-detail",
      viewComponent: (
        <ReviewDetailWidgetContextAPI>
          <ReviewDetailDialogWidget
            show={true}
            toggle={reset}
            currentLocale={currentLocale}
          />
        </ReviewDetailWidgetContextAPI>
      ),
    },
  ];

  const getWidgetStatus = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_widget_status",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        language: currentLocale,
      })
      .then((response: any) => {
        let data = response.data.data;
        setWidgetState(data);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setWidgetStatus = (type: any, is_enabled: boolean) => {
    axiosClient
      .post(``, {
        method: "widget_update_status",
        widget_type: type,
        language: currentLocale,
        is_enabled: is_enabled,
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let message = is_enabled
          ? "Widget Activated Successfully"
          : "Widget Drafted Successfully";
        toastrSuccess(message);
      })
      .catch((error) => {
        toastrError("Error Occurred");
        updateWidgetStateFields((draftState: any) => {
          draftState[type as keyof WidgetState].is_enabled = !is_enabled;
        });
      });
  };

  const updateWidgetStateFields = (cb: any) => {
    const state = produce(widgetState, (draftState: any) => {
      cb(draftState);
    });
    setWidgetState(state);
  };

  useEffect(() => {
    getWidgetStatus();
  }, [currentLocale]);

  return (
    <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
      <SampleReviewsContextAPI>
        <div>
          {availableLanguages.length > 0 && (
            <Tabs defaultValue={currentLocale} className="w-[400px]">
              <TabsList
                className={
                  "!frt-flex-wrap !frt-h-auto !frt-justify-start !frt-gap-1"
                }
              >
                {availableLanguages.map((item: any, index: number) => {
                  return (
                    <TabsTrigger
                      key={index}
                      value={item.value}
                      onClick={() => {
                        setCurrentLocale(item.value);
                      }}
                    >
                      {item.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          )}
        </div>
        <div className="frt-grid lg:frt-grid-cols-3 md:frt-grid-cols-2 sm:frt-grid-cols-1 frt-gap-4">
          {widgets.map((widget, index: number) => {
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
                  <Switch
                    checked={
                      widgetState[widget.slug as keyof WidgetState].is_enabled
                    }
                    onCheckedChange={(value) => {
                      updateWidgetStateFields((draftState: any) => {
                        draftState[
                          widget.slug as keyof WidgetState
                        ].is_enabled = value;
                      });
                      setWidgetStatus(widget.slug, value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      setActiveDialog(widget.slug);
                    }}
                  >
                    Customize
                  </Button>
                  {activeDialog == widget.slug ? widget.viewComponent : null}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </SampleReviewsContextAPI>
    </div>
  );
};

export default Widget;
