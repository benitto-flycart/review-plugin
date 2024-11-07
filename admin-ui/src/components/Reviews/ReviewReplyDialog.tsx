import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import "@/src/styles/widgets/widget.css";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { ApiErrorResponse } from "../api/api.types";
import { useLocalState } from "../zustand/localState";
import { LoadingSpinner } from "../ui/loader";
import { resetPointerEvents } from "../../helpers/resetPointerEvents";
import { getErrorMessage } from "../../helpers/helper";
import * as yup from "yup";
import { showValidationError } from "../../helpers/html";
import { TReview } from "./ReviewsType.type";

const ReviewReplyDialog = ({
  review,
  show,
  toggle,
  getReviews,
}: {
  review: TReview;
  show: any;
  toggle: any;
  getReviews: any;
}) => {
  const { localState } = useLocalState();
  const [errors, setErrors] = useState<any>();
  const [saveReplyLoading, setSaveReplyLoading] = useState<boolean>(false);
  const [replyContentState, setReplyContentState] = useState<string>(
    review?.replies?.[0]?.content || "",
  );

  const type = review?.replies?.[0] ? "edit" : "add";

  useEffect(() => {
    resetPointerEvents(show);
  }, [show]);

  const handleSaveReply = () => {
    setSaveReplyLoading(true);
    schema
      .validate({ reply_content: replyContentState }, { abortEarly: false })
      .then(() => {
        setErrors({});
        axiosClient
          .post(``, {
            method: "handle_save_reply",
            _wp_nonce_key: "flycart_review_nonce",
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            content: replyContentState,
            type: type,
            id: review.id,
            reply_id: review?.replies?.[0]?.id,
          })
          .then((response: AxiosResponse) => {
            const data: any = response.data.data;
            toastrSuccess(data.message);
            getReviews();
          })
          .catch((error: AxiosResponse<ApiErrorResponse>) => {
            toastrError(getErrorMessage(error));
          })
          .finally(() => {
            setSaveReplyLoading(false);
          });
      })
      .catch((validationError: any) => {
        setSaveReplyLoading(false);
        toastrError("Validation Failed");
        const validationErrors = {};
        validationError?.inner?.forEach((e: any) => {
          // @ts-ignore
          validationErrors[e.path] = [e.message];
        });
        setErrors(validationErrors);
      });
  };

  const schema = yup.object().shape({
    reply_content: yup.string().required("Reply content is required"),
  });

  return (
    <Dialog open={show} onOpenChange={toggle}>
      <DialogContent
        aria-describedby={undefined}
        className={"frt-rounded-md"}
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      >
        <DialogTitle>Your reply </DialogTitle>
        <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
          <Textarea
            className={"frt-h-32"}
            onChange={(e) => {
              setReplyContentState(e.target.value);
            }}
            value={replyContentState}
          ></Textarea>
          {showValidationError(errors, "reply_content")}
          <span className={"frt-accent-gray-400"}>
            This reply is public and will appear on reviews widget.
          </span>
        </div>
        <div className={"frt-flex frt-justify-end frt-gap-x-3"}>
          <Button variant={"outline"} onClick={() => toggle(false)}>
            Cancel
          </Button>
          <Button
            className={"frt-flex frt-gap-x-1"}
            onClick={() => {
              handleSaveReply();
            }}
          >
            {saveReplyLoading ? <LoadingSpinner /> : null}
            {type == "edit" ? "Edit reply" : "Add reply"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewReplyDialog;
