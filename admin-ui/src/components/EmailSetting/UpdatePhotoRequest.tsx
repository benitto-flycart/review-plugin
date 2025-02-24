import React, { useEffect, useState } from "react";
import { useLocalState } from "../zustand/localState";
import * as yup from "yup";
import { axiosClient } from "../api/axios";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loader";
import EmailNavigation from "./utils/EmailNavigation";
import LanguageList from "./utils/LanguageList";
import useLocale from "./utils/useLocale";
import { produce } from "immer";
import { showValidationError } from "../../helpers/html";
import PreviewEmailDialog from "./PreviewEmailDialog";

const UpdatePhotoRequest = () => {
  const { localState } = useLocalState();

  const [currentLocale, setCurrentLocale, availableLanguages] = useLocale();
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
  const [emailPreviewContent, setEmailPreviewContent] = useState<any>();
  const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();
  const [state, setState] = useState({
    language: localState.current_locale,
    subject: "",
    minimum_star: "5",
    body: "",
    button_text: "",
    discount_text: "",
    subject_placeholder: "",
    body_placeholder: "",
    button_text_placeholder: "",
    discount_text_placeholder: "",
  });

  const schema = yup.object().shape({
    language: yup.string().required("Language is required"),
    subject: yup.string().required("Subject is required"),
    minimum_star: yup.string().required("Subject is required"),
    body: yup.string().required("Body is required"),
    button_text: yup.string().required("Button Text is required"),
    discount_text: yup.string().required("Button Text is required"),
  });

  const fetchReviewPhotoRequest = () => {
    setLoading(true);
    axiosClient
      .post("", {
        method: "get_photo_request",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        language: currentLocale,
      })
      .then((response: any) => {
        let data = response.data.data;
        setState({
          language: data.language,
          subject: data.settings.subject,
          body: data.settings.body,
          minimum_star: data.settings.minimum_star,
          button_text: data.settings.button_text,
          discount_text: data.settings.discount_text,
          subject_placeholder: data.placeholders.subject,
          body_placeholder: data.placeholders.body,
          button_text_placeholder: data.placeholders.button_text,
          discount_text_placeholder: data.placeholders.discount_text,
        });
        toastrSuccess(data.message);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveReviewPhotoRequest = (event: React.MouseEvent) => {
    event.preventDefault();
    setUpdating(true);
    schema
      .validate(state, { abortEarly: false })
      .then(() => {
        axiosClient
          .post("", {
            method: "save_photo_request",
            _wp_nonce_key: "flycart_review_nonce",
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
            body: state.body,
            minimum_star: state.minimum_star,
            subject: state.subject,
            discount_text: state.discount_text,
            button_text: state.button_text,
          })
          .then((response: any) => {
            let data = response.data.data;
            toastrSuccess(data.message);
          })
          .catch((error: any) => {
            toastrSuccess("Server Error Occurred");
            setErrors(error);
          })
          .finally(() => {
            setUpdating(false);
          });
      })
      .catch((validationError: any) => {
        setUpdating(false);
        toastrError("Validation Failed");
        const validationErrors = {};
        validationError?.inner?.forEach((e: any) => {
          // @ts-ignore
          validationErrors[e.path] = [e.message];
        });
        setErrors(validationErrors);
      });
  };

  const updatePhotoRequestState = (cb: (state: any) => void) => {
    setState((prevState) => produce(prevState, cb));
  };

  const loadPreview = (e: any) => {
    e.preventDefault();
    setLoadingPreview(true);
    axiosClient
      .post("", {
        method: "get_email_preview",
        email_type: "photo_request",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        language: currentLocale,
      })
      .then((response: any) => {
        let data = response.data.data;
        setEmailPreviewContent(data.content);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  };

  useEffect(() => {
    fetchReviewPhotoRequest();
  }, [currentLocale]);

  return (
    <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
      <EmailNavigation to={"/emails/photo-request"} title={"Photo Request"} />
      <LanguageList
        currentLocale={currentLocale}
        setCurrentLocale={setCurrentLocale}
        availableLanguages={availableLanguages}
      />
      {loading ? (
        <div className={"frt-m-auto frt-h-[50vh] frt-w-full"}>
          <LoadingSpinner />
        </div>
      ) : (
        <form>
          <Card className="frt-p-4 frt-flex frt-flex-col frt-gap-y-2">
            <h3 className="frt-font-extrabold">Content</h3>
            <div className={"frt-flex frt-flex-col frt-gap-y-5"}>
              <div className="frt-grid frt-gap-3">
                <label>Send Photo Reminder</label>
                <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                  <Select
                    defaultValue={state.minimum_star}
                    onValueChange={(value: string) => {
                      updatePhotoRequestState((emailState) => {
                        emailState.minimum_star = value;
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="5">
                          For 5 star reviews only
                        </SelectItem>
                        <SelectItem value="4">
                          For Reviews 4 star and above
                        </SelectItem>
                        <SelectItem value="-1">Never</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {showValidationError(errors, "minimum_star")}
                </div>
              </div>
              <div className="frt-grid frt-gap-3">
                <label>Subject</label>
                <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                  <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                    <Input
                      defaultValue={state.subject}
                      type="text"
                      onChange={(e: any) => {
                        updatePhotoRequestState((emailState) => {
                          emailState.subject = e.target.value;
                        });
                      }}
                      placeholder={state.subject_placeholder}
                    />
                    {showValidationError(errors, "subject")}
                  </div>
                  <div className={"frt-flex frt-flex-col"}>
                    <span>
                      Notes: Use [order_number] for the customer's order number
                    </span>
                  </div>
                </div>
              </div>
              <div className="frt-grid frt-gap-3">
                <label>Body</label>
                <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                  <Textarea
                    rows={5}
                    onChange={(e: any) => {
                      updatePhotoRequestState((emailState) => {
                        emailState.body = e.target.value;
                      });
                    }}
                    value={state.body}
                    placeholder={state.body_placeholder}
                  ></Textarea>
                  {showValidationError(errors, "body")}
                  <div>
                    <span>Notes:</span>
                    <span>
                      Use [name] or [first_name] or [last_name] as a placeholder
                      for the user's name, first or last name
                    </span>
                  </div>
                </div>
              </div>
              <div className="frt-grid frt-gap-3">
                <label>Discount Text</label>
                <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                  <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                    <Input
                      type="text"
                      defaultValue={state.discount_text}
                      onChange={(e: any) => {
                        updatePhotoRequestState((emailState) => {
                          emailState.discount_text = e.target.value;
                        });
                      }}
                      placeholder={state.discount_text_placeholder}
                    />
                    {showValidationError(errors, "discount_text")}
                  </div>
                  <div>
                    Note: Added when a text review is eligible for a photo
                    review discount
                  </div>
                </div>
              </div>
              <div className="frt-grid frt-gap-3">
                <label>Button Text</label>
                <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                  <Input
                    type={"text"}
                    placeholder={state.button_text_placeholder}
                    defaultValue={state.button_text}
                    onChange={(e: any) => {
                      updatePhotoRequestState((emailState) => {
                        emailState.button_text = e.target.value;
                      });
                    }}
                  />
                  {showValidationError(errors, "button_text")}
                </div>
              </div>
            </div>
            <div className={"frt-flex frt-gap-x-5 frt-my-4"}>
              <Button
                onClick={saveReviewPhotoRequest}
                className={"frt-flex frt-justify-between frt-gap-2  "}
              >
                {updating ? (
                  <span>
                    <LoadingSpinner />
                  </span>
                ) : null}
                <span>Save Changes</span>
              </Button>
              <Button
                onClick={(event: React.MouseEvent) => {
                  setShowEmailDialog(true);
                  loadPreview(event);
                }}
                className={"frt-flex frt-justify-between frt-gap-2  "}
              >
                <span>Preview</span>
              </Button>
            </div>
          </Card>
        </form>
      )}
      <PreviewEmailDialog
        show={showEmailDialog}
        previewContent={emailPreviewContent}
        toggle={setShowEmailDialog}
        loadingPreview={loadingPreview}
        title={"Photo request"}
      />
    </div>
  );
};

export default UpdatePhotoRequest;
