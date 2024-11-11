import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";

export const PopupWidgetContext = createContext({});

function PopupWidgetContextAPI({ children }: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { localState } = useLocalState();

  const [widget, setWidget] = useState({
    widget_loading: true,
    show_setting: "",
    view: "mobile",
    position: "top_left",
    corner_radius: "sharp",
    minimum_rating: "3_stars",
    initial_delay: "1",
    delay_between_popup: "1",
    popup_display_time: "1",
    show_product_thumbnail: true,
    hide_on_mobile: true,
    auto_play_video: true,
    show_on_shop_page: true,
    show_on_cart_page: true,
    show_on_product_page: true,

    colors: {
      review: {
        text_color: "#000000",
        bg_color: "#d3adad",
      },
      product: {
        text_color: "#020202",
      },
      close_icon: {
        text_color: "#000000",
        bg_color: "#d3adad",
      },
    },
    custom_css:{
      is_enabled:false,
      styles:""
    }
  });

  const buildStateFromResponse = (settings: any) => {
    updateWidgetFields((draftState: any) => {
      draftState.position = settings?.position;
      draftState.corner_radius = settings?.corner_radius;
      draftState.minimum_rating = settings?.minimum_rating;
      draftState.initial_delay = settings?.initial_delay;
      draftState.delay_between_popup = settings?.delay_between_popup;
      draftState.popup_display_time = settings?.popup_display_time;
      draftState.show_product_thumbnail = settings?.show_product_thumbnail;
      draftState.hide_on_mobile = settings?.hide_on_mobile;
      draftState.auto_play_video = settings?.auto_play_video;
      draftState.show_on_shop_page = settings?.show_on_shop_page;
      draftState.show_on_cart_page = settings?.show_on_cart_page;
      draftState.show_on_product_page = settings?.show_on_product_page;

      draftState.colors = {
        review: {
          text_color: settings?.colors?.review?.text_color,
          bg_color: settings?.colors?.review?.bg_color,
        },
        product: {
          text_color: settings?.colors?.product?.text_color,
        },
        close_icon: {
          text_color: settings?.colors?.close_icon?.text_color,
          bg_color: settings?.colors?.close_icon?.bg_color,
        },
      };
      draftState.custom_css = {
        is_enabled: settings?.custom_css?.is_enabled,
        styles:settings?.custom_css?.styles,
      };
    });
  };

  const fetchPopupWidget = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_widget_settings",
        widget_type: "popup_widget",
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

  const saveSettings = () => {
    setSaving(true);
    axiosClient
      .post("", {
        method: "save_widget_settings",
        widget_type: "popup_widget",
        language: localState.current_locale,
        ...widget,
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

  useEffect(() => {
    fetchPopupWidget();

    let saveInterval = setInterval(() => {
      // saveSettings();
    }, 15000);

    return () => {
      clearInterval(saveInterval);
    };
  }, []);

  const widgetMethods = {
    getPopupVars: () => {
      return {
        "--r-puw-text-color": widget.colors.review.text_color,
        "--r-puw-bg-color": widget.colors.review.bg_color,
        "--r-puw-product-text-color": widget.colors.product.text_color,
        "--r-puw-close-icon-color": widget.colors.close_icon.text_color,
        "--r-puw-close-icon-bg-color": widget.colors.close_icon.bg_color,
      };
    },
    getPopupPosition: () => {
      switch (widget.position) {
        case "top_right":
          return "r_puw-top_right r_puw-popup_right_slide_in";
        case "top_left":
          return "r_puw-top_left r_puw-popup_left_slide_in";
        case "bottom_right":
          return "r_puw-bottom_right r_puw-popup_right_slide_in";
        case "bottom_left":
          return "r_puw-bottom_left r_puw-popup_left_slide_in";
      }
    },

    getCornerRadius: () => {
      switch (widget.corner_radius) {
        case "sharp":
          return "r_puw-sharp";
        case "slightly_rounded":
          return "r_puw-popup_slightly_rounded";
        case "rounded":
          return "r_puw-popup_rounded";
        case "extra_rounded":
          return "r_puw-popup_extra_rounded";
        case "none":
          return "r_puw-popup_none";
      }
    },
    saveSettings,
    getSettings : fetchPopupWidget
  };

  //update editor state
  const updateWidgetFields = (cb: any) => {
    let newState = produce(widget, (draft) => {
      return cb(draft);
    });
    setWidget(newState);
  };

  return (
    <PopupWidgetContext.Provider
      value={{
        widget: widget,
        updateWidgetFields,
        methods: widgetMethods,
        loading,
        saving,
      }}
    >
      {children}
    </PopupWidgetContext.Provider>
  );
}

export default PopupWidgetContextAPI;
