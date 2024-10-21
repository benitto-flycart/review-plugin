import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle,} from "../ui/dialog";
import "@/src/styles/widgets/widget.css";
import {Button} from "../ui/button";
import {Textarea} from "../ui/textarea";
import {axiosClient} from "../api/axios";
import {AxiosResponse} from "axios";
import {toastrSuccess} from "../../helpers/ToastrHelper";
import {ApiErrorResponse} from "../api/api.types";
import {useLocalState} from "../zustand/localState";
import {LoadingSpinner} from "../ui/loader";

const ReviewReplyDialog = ({
                                 review,
                                 replyContent,
                                 show,
                                 toggle,
                                  ref,
                                  getReviews
                             }: any) => {

    const {localState}=useLocalState()
    const [saveReplyLoading,setSaveReplyLoading]=useState<boolean>(false)
   const [replyContentState,setReplyContentState]=useState<string>(replyContent)
    const handleSaveReply=()=>{
        setSaveReplyLoading(true)
        axiosClient.post(``, {
            method: "handle_save_reply",
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            content:replyContentState,
            id:review.id
        }).then((response: AxiosResponse) => {
            const data:any = response.data.data
            toastrSuccess(data.message)
            getReviews();
        }).catch((error: AxiosResponse<ApiErrorResponse>) => {
            // @ts-ignore
            toastrError(getErrorMessage(error));
        }).finally(() => {
            setSaveReplyLoading(false)
        })
    }
    
    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                document.body.style.pointerEvents = ''
            }, 500)
        }
    }, [show])

    return (
        <Dialog open={show} onOpenChange={toggle}>
            <DialogContent className={"frt-rounded-md"}
                onInteractOutside={(e: any) => {
                    e.preventDefault();
                }}
            >
                <DialogTitle>Your reply </DialogTitle>
               <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                   <Textarea className={"frt-h-32"} onChange={(e)=>{
                       setReplyContentState(e.target.value)
                   }}>{replyContentState}
                   </Textarea>
                   <span className={"frt-accent-gray-400"}>This reply is public and will appear on reviews widget.</span>
               </div>
               <div className={"frt-flex frt-justify-end frt-gap-x-3"}>
                   <Button
                       variant={"outline"}
                       onClick={()=>toggle(false)}
                   >
                       Cancel
                   </Button>
                   <Button
                       className={"frt-flex frt-gap-x-1"}
                       onClick={handleSaveReply}
                   >
                       {saveReplyLoading ? <LoadingSpinner/> : null }
                       {replyContent ? "Edit reply" : "Add reply"}
                   </Button>
               </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewReplyDialog;

