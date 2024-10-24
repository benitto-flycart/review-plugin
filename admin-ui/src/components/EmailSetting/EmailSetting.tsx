import React, { useEffect, useState } from "react";
import { useLocalState } from "../zustand/localState";
import "../../main.css";
import { Button } from "../ui/button";
import UpdateReviewRequest from "./UpdateReviewRequest";
import UpdateReviewReminder from "./UpdateReviewReminder";
import UpdatePhotoRequest from "./UpdatePhotoRequest";
import UpdateDiscountReminder from "./UpdateDiscountReminder";
import { NavLink } from "react-router-dom";
import UpdateDiscountNotify from "./UpdateDiscountNotify";
import UpdateReplyToReview from "./UpdateReplyToReview";
import { Switch } from "../ui/switch";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { axiosClient } from "../api/axios";

type EmailState = {
  review_request: { is_enabled: boolean };
  review_reminder: { is_enabled: boolean };
  photo_request: { is_enabled: boolean };
  discount_notify: { is_enabled: boolean };
  discount_reminder: { is_enabled: boolean };
  review_reply: { is_enabled: boolean };
};


const EmailSetting = () => {
  const { localState, setLocalState } = useLocalState();
  const [currentLocale, setCurrentLocale] = useState<string>(
    localState.current_locale,
  );
  const [emailState, setEmailState] = useState<EmailState>({
    review_request: { is_enabled: false },
    review_reminder: { is_enabled: false },
    photo_request: { is_enabled: false },
    discount_notify: { is_enabled: false },
    discount_reminder: { is_enabled: false },
    review_reply: { is_enabled: false },
  });
  // const [view, setView] = useState(false);
  // const [activeEmail, setActiveEmail] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const setEmailStatus = (type: string, is_enabled: boolean) => {
    axiosClient
      .post(``, {
        method: "email_update_status",
        email_type: type,
        language: currentLocale,
        is_enabled: is_enabled,
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let message = is_enabled
          ? "Email Activated Successfully"
          : "Email Drafted Successfully";
        toastrSuccess(message);
      })
      .catch((error) => {
        toastrError("Error Occurred");
        console.log(error);
        updateEmailStateFields((draftState) => {
          draftState[type as keyof EmailState].is_enabled = !is_enabled;
        });
      });
  };

  const getEmailStatus = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_email_status",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        language: currentLocale,
      })
      .then((response: any) => {
        let data = response.data.data;
        setEmailState(data);
      })
      .catch((error: any) => {
        console.log(error);
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const emails = [
    {
      title: "Review Request",
      slug: "review_request",
      description: "Review Request Settings",
      detailed_description:
        "This email prompts the customer to share their feedback by submitting a review of their recent purchase or experience",
      route: "/emails/review-request",
      viewComponent: UpdateReviewRequest,
    },
    {
      title: "Review Reminder",
      slug: "review_reminder",
      description: "Review Reminder Settings",
      detailed_description:
        "This follow-up email serves as a gentle reminder for the customer to leave a review if they haven't done so yet",
      route: "/emails/review-reminder",
      viewComponent: UpdateReviewReminder,
    },
    {
      title: "Photo Request",
      slug: "photo_request",
      description: "Review Request Settings",
      detailed_description:
        "After the customer has submitted a review, this email encourages them to add a photo to enhance their review",
      route: "/emails/photo-request",
      viewComponent: UpdatePhotoRequest,
    },
    {
      title: "Discount Notify",
      slug: "discount_notify",
      description: "Discount Notify Settings",
      detailed_description:
        "This email notify the customer of the discount they received for leaving a review",
      route: "/emails/discount-notify",
      viewComponent: UpdateDiscountNotify,
    },
    {
      title: "Discount Reminder",
      slug: "discount_reminder",
      description: "Discount Reminder Settings",
      detailed_description:
        "This email reminds the customer of the discount they received for leaving a review, ensuring they make use of the offer",
      route: "/emails/discount-reminder",
      viewComponent: UpdateDiscountReminder,
    },
    {
      title: "Reply to Review",
      slug: "review_reply",
      description: "Reply to Review Settings",
      detailed_description:
        "This email notifies the customer when a reply has been posted to their review, keeping them engaged in the conversation",
      route: "/emails/reply-to-review",
      viewComponent: UpdateReplyToReview,
    },
  ];
  const updateEmailStateFields = (updater: (draftState: EmailState) => void) => {
    setEmailState((prevState) => {
      const draftState = { ...prevState };
      updater(draftState);
      return draftState;
    });
  };

  useEffect(() => {
    getEmailStatus();
  }, [currentLocale]);

  return (
    <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
      <div className="frt-grid frt-grid-cols-1 frt-gap-4">
        {emails.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                "frt-shadow-primary frt-rounded-lg frt-border frt-bg-card frt-text-card-foreground frt-shadow-sm frt-flex frt-justify-between frt-gap-2 frt-p-4 frt-items-center"
              }
            >
              <div className={"frt-flex-grow frt-flex frt-flex-col frt-gap-2"}>
                <span className={"frt-font-extrabold"}>{item.title}</span>
                <p>{item.description}</p>
                <p>{item.detailed_description}</p>
              </div>
              <div className="frt-flex frt-justify-end frt-gap-[15px] frt-items-center frt-col-span-1">
              <Switch
                checked={emailState[item.slug as keyof EmailState].is_enabled}
                onCheckedChange={(value) => {
                  setEmailStatus(item.slug, value);
                  updateEmailStateFields((draftState) => {
                    draftState[item.slug as keyof EmailState].is_enabled = value;
                  });
                  
                }}
              />
                <Button>
                  <NavLink to={item.route} className={"hover:frt-text-white"}>
                    Update
                  </NavLink>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmailSetting;
