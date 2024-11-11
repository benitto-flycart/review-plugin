import React, { createContext, useContext, useState } from "react";
import { produce } from "immer";
import { axiosClient } from "../../api/axios";
import { useLocalState } from "../../zustand/localState";
import { toastrError, toastrSuccess } from "../../../helpers/ToastrHelper";
import { SampleReviewsContext } from "../SampleReviewsAPI";
import { getReviewOpener, getReviewShadow } from "./Preview/preview-constants";

export const ProductWidgetContext = createContext({});

function ProductWidgetContextAPI({ children }: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { localState } = useLocalState();

  const { reviews, refetch } = useContext<any>(SampleReviewsContext);

  const [widget, setWidget] = useState({
    widget_loading: true,
    view: "desktop",
    show_setting: "",
    layout: {
      widget_layout: "list",
      header_layout: "compact",
    },
    style: {
      review_card_shadow: "dark",
      review_card_openers: "extra_rounded",
    },
    colors: {
      type: "custom",
      header: {
        text_and_icon_color: "",
        bar_fill_color: "",
        bar_bg_color: "",
      },
      widget_wrapper: "",
      button: {
        text_color: "",
        text_hover_color: "",
        bg_color: "",
        bg_hover_color: "",
        border_color: "",
      },
      reviews: {
        text_color: "",
        bg_color: "",
        bg_hover_color: "",
        shadow_color: "",
        separator_color: "",
      },
      replies: {
        text_color: "",
        bg_color: "",
      },
      verified_badge: {
        icon_color: "",
      },
    },
    preferences: {
      icon_size: "small",
      product_review_widget: "",
      show_write_a_review: true,
      toggle_loading_screen: false,
      toggle_empty_review: false,
      show_review_date: true,
      reviews_per_page: 5,
      show_sorting_options: true,
      default_sorting: "newest",
      show_rating_options: true,
    },
    custom_css: {
      is_enabled: false,
      styles: "",
    },
  });

  const buildStateFromResponse = (settings: any) => {
    updateWidgetFields((draftState: any) => {
      draftState.layout = {
        widget_layout: settings?.layout?.widget_layout,
        header_layout: settings?.layout?.header_layout,
      };

      draftState.style = {
        review_card_shadow: settings?.style?.review_card_shadow,
        review_card_openers: settings?.style?.review_card_openers,
      };

      //colors reviews
      draftState.colors = {
        //colors
        type: settings?.colors?.type,
        widget_wrapper: settings.colors.widget_wrapper,
        //colors header
        header: {
          text_and_icon_color: settings?.colors.header?.text_and_icon_color,
          bar_fill_color: settings?.colors.header?.bar_fill_color,
          bar_bg_color: settings?.colors.header?.bar_bg_color,
        },
        button: {
          text_color: settings?.colors?.button.text_color,
          text_hover_color: settings?.colors?.button.text_hover_color,
          bg_color: settings?.colors?.button.bg_color,
          bg_hover_color: settings?.colors?.button.bg_hover_color,
          border_color: settings?.colors?.button.border_color,
        },
        reviews: {
          text_color: settings?.colors?.reviews?.text_color,
          bg_color: settings?.colors?.reviews?.bg_color,
          bg_hover_color: settings?.colors?.reviews?.bg_hover_color,
          shadow_color: settings?.colors?.reviews?.shadow_color,
          separator_color: settings?.colors?.reviews?.separator_color,
        },
        replies: {
          text_color: settings?.colors?.replies?.text_color,
          bg_color: settings?.colors?.replies?.bg_color,
        },
        verified_badge: {
          icon_color: settings?.colors?.verified_badge?.icon_color,
        },
      };

      draftState.preferences = {
        icon_size: settings?.preferences?.icon_size,
        product_review_widget: settings?.preferences?.product_review_widget,
        show_write_a_review: settings?.preferences?.show_write_a_review,
        show_review_date: settings?.preferences?.show_review_date,
        reviews_per_page: settings?.preferences?.reviews_per_page,
        show_sorting_options: settings?.preferences?.show_sorting_options,
        default_sorting: settings?.preferences?.default_sorting,
        show_rating_options: settings?.preferences?.show_rating_options,
      };
      draftState.custom_css = {
        is_enabled: settings?.custom_css?.is_enabled,
        styles: settings?.custom_css?.styles,
      };
      //Colors Verified Badge
    });
  };

  const saveSettings = () => {
    const { toggle_loading_screen, toggle_empty_review, ...preferences } =
      widget.preferences;
    setSaving(true);
    axiosClient
      .post("", {
        method: "save_widget_settings",
        widget_type: "product_widget",
        language: localState.current_locale,
        layout: widget.layout,
        style: widget.style,
        preferences,
        colors: widget.colors,
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let data = response.data.data;
        let settings = data.settings;
        buildStateFromResponse(settings);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const fetchProductWidget = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_widget_settings",
        widget_type: "product_widget",
        language: localState.current_locale,
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let data = response.data.data;
        let settings = data.settings;
        buildStateFromResponse(settings);
        toastrSuccess(data.message);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchProductWidget();

    let saveInterval = setInterval(() => {
      // saveSettings();
    }, 15000);

    return () => {
      clearInterval(saveInterval);
    };
  }, []);

  const widgetMethods = {
    isAddReviewEnabled: () => {
      return widget.preferences.show_write_a_review == true;
    },

    isSortingEnabled: () => {
      return widget.preferences.show_sorting_options == true;
    },

    getDefaultSorting: () => {
      return widget.preferences.default_sorting;
    },

    isReviewDateEnabled: () => {
      return widget.preferences.show_review_date;
    },

    getThumbnailSize: () => {
      return {
        width: "50px",
        height: "50px",
      };
    },

    isRatingOptionsEnabled: () => {
      return widget.preferences.show_rating_options == true;
    },
    saveSettings,
    getSettings: fetchProductWidget,
    getProductReviewWidgetColors: () => {
      return {
        "--r-prw-wrapper-bg-color": widget.colors.widget_wrapper,
        "--r-prw-btn-color": widget.colors.button.text_color,
        "--r-prw-btn-bg-color": widget.colors.button.bg_color,
        "--r-prw-btn-bg-hover-color": widget.colors.button.bg_hover_color,
        "--r-prw-btn-border-color": widget.colors.button.border_color,
        "--r-prw-progress-fill-color": widget.colors.header.bar_fill_color,
        "--r-prw-progress-bg-color": widget.colors.header.bar_bg_color,
        "--r-prw-header-text-icon-color":
          widget.colors.header.text_and_icon_color,

        "--r-prw-review-color": widget.colors.reviews.text_color,
        "--r-prw-review-bg-color": widget.colors.reviews.bg_color,
        "--r-prw-review-bg-hover-color": widget.colors.reviews.bg_hover_color,

        "--r-prw-review-replies-color": widget.colors.replies.text_color,
        "--r-prw-review-replies-bg-color": widget.colors.replies.bg_color,
        "--r-prw-review-verified-color":
          widget.colors.verified_badge.icon_color,

        "--r-prw-review-border-radius": getReviewOpener(
          widget.style.review_card_openers,
        ),
        "--r-prw-review-box-shadow": getReviewShadow(
          widget.style.review_card_shadow,
          widget.colors.reviews.shadow_color,
        ),
        "--r-prw-review-separator-color": widget.colors.reviews.separator_color,
      };
    },
  };

  //update editor state
  const updateWidgetFields = (cb: any) => {
    let newState = produce(widget, (draft) => {
      return cb(draft);
    });
    setWidget(newState);
  };

  return (
    <ProductWidgetContext.Provider
      value={{
        widget: widget,
        updateWidgetFields,
        methods: widgetMethods,
        loading,
        saving,
        sampleReviews: reviews,
        refetch: refetch,
      }}
    >
      {children}
    </ProductWidgetContext.Provider>
  );
}

export default ProductWidgetContextAPI;
