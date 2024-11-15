import React, { createContext, useEffect, useState } from "react";
import { produce } from "immer";
import { axiosClient } from "../../api/axios";
import { toastrError, toastrSuccess } from "../../../helpers/ToastrHelper";
import { useLocalState } from "../../zustand/localState";
import { nl2br } from "../../../helpers/helper";

export const ReviewFormWidgetContext = createContext({});

function ReviewFormWidgetContextAPI({ children }: { children: any }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { localState } = useLocalState();

  const [widget, setWidget] = useState({
    widget_loading: true,
    view: "desktop",
    show_setting: "",
    general: {
      title_color: "#f20ba9",
      description_color: "#ec07a3",
      button_text_color: "#f20ba9",
      button_bg_color: "#fbddef",
      input_label_color: "#ff47d7",
      input_border_color: "#f4d4ed",
      input_error_color: "#ff0808",
      dialog_bg_color: "#fffafd",
      rating_icon_color: "#f178bb",
    },
    rating: {
      title: "How would you rate {product_name?}",
    },
    photos: {
      title: "Show it Off",
      description: "We'd love to see it again",
      button_text: "Add Photos",
      discount_text: "Get {discount_value} off your next purchase!",
    },
    review_content: {
      title: "Tell us more!",
      placeholder: "Share your experience",
    },
    reviewer: {
      title: "About you",
      label_color: "purple",
      description_color: "purple",
    },
    thank_you: {
      title: "Thank you",
      description: "Your Review was submitted",
      discount_info_title:
        "Use the following discount code for {discount_value} off your next purchase",
      discount_info_description:
        "we'll also send it by email discount expires {date_expiry}",
    },
    custom_css: {
      is_enabled: false,
      styles: "",
    },
  });

  const buildStateFromResponse = (settings: any) => {
    updateWidgetFields((draftState: any) => {
      draftState.general = {
        title_color: settings.general?.title_color,
        description_color: settings.general?.description_color,
        button_text_color: settings.general?.button_text_color,
        button_bg_color: settings.general?.button_bg_color,
        input_label_color: settings.general?.input_label_color,
        input_border_color: settings.general?.input_border_color,
        input_error_color: settings.general?.input_error_color,
        dialog_bg_color: settings.general?.dialog_bg_color,
        rating_icon_color: settings.general?.rating_icon_color,
      };

      draftState.rating = {
        title: settings.rating?.title,
      };

      draftState.photos = {
        title: settings.photos?.title,
        description: settings.photos?.description,
        button_text: settings.photos?.button_text,
        discount_text: settings.photos?.discount_text,
      };

      draftState.review_content = {
        title: settings.review_content?.title,
        placeholder: settings.review_content?.placeholder,
      };

      draftState.reviewer = {
        title: settings.reviewer?.title,
        label_color: settings.reviewer?.label_color,
        description_color: settings.reviewer?.description_color,
      };

      draftState.thank_you = {
        title: settings.thank_you?.title,
        description: settings.thank_you?.description,
        discount_info_title: settings.thank_you?.discount_info_title,
        discount_info_description:
          settings.thank_you?.discount_info_description,
      };

      draftState.custom_css = {
        is_enabled: settings?.custom_css?.is_enabled,
        styles: settings?.custom_css?.styles,
      };
    });
  };

  const saveSettings = () => {
    setSaving(true);
    axiosClient
      .post("", {
        method: "save_widget_settings",
        widget_type: "review_form_widget",
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
        console.log(error);
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const getSettings = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_widget_settings",
        widget_type: "review_form_widget",
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

  const widgetMethods = {
    getAddPhotosDivStyles: () => {
      return {
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: widget.general.button_text_color,
        color: widget.general.button_text_color,
      };
    },
    getRatingTitle: () => {
      let title = widget.rating.title;

      if (title) {
        title = title?.replace(
          "{product_name}?",
          "<span className='r_rfw_rating-title__product_name'>{product_name}?</span>",
        );
      }

      return nl2br(title);
    },
    getReviewFormVariables: () => {
      return {
        "--r-rfw-dialog-bg-color": widget.general.dialog_bg_color,
        "--r-rfw-rating-icon-color": widget.general.rating_icon_color,
        "--r-rfw-input-label-color": widget.general.input_label_color,
        "--r-rfw-input-border-color": widget.general.input_border_color,
        "--r-rfw-input-error-color": widget.general.input_error_color,
        "--r-rfw-title-color": widget.general.title_color,
        "--r-rfw-description-color": widget.general.description_color,
        "--r-rfw-btn-text-color": widget.general.button_text_color,
        "--r-rfw-btn-bg-color": widget.general.button_bg_color,
      };
    },
    saveSettings,
    getSettings,
  };

  const updateWidgetFields = (cb: any) => {
    let newState = produce(widget, (draft) => {
      return cb(draft);
    });
    setWidget(newState);
  };

  useEffect(() => {
    getSettings();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ReviewFormWidgetContext.Provider
      value={{
        widget: widget,
        updateWidgetFields,
        methods: widgetMethods,
        loading,
        saving,
      }}
    >
      {children}
    </ReviewFormWidgetContext.Provider>
  );
}

export default ReviewFormWidgetContextAPI;
