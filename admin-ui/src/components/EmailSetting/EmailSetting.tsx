import React, {useState} from "react";
import {useLocalState} from "../zustand/localState";
import "../../main.css";
import {Button} from "../ui/button";
import {Tabs, TabsList, TabsTrigger} from "../ui/tabs";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../ui/dialog";
import UpdateReviewRequest from "./UpdateReviewRequest";
import UpdateReviewReminder from "./UpdateReviewReminder";
import UpdatePhotoRequest from "./UpdatePhotoRequest";
import UpdateDiscountReminder from "./UpdateDiscountReminder";
import {NavLink} from "react-router-dom";


const EmailSetting = () => {
    const {localState, setLocalState} = useLocalState();
    const [currentLocale, setCurrentLocale] = useState<string>(localState.current_locale)

    const [view, setView] = useState(false)
    const [activeEmail, setActiveEmail] = useState<any>({})

    const emails = [
        {
            title: "Review Request",
            slug: "review_request",
            description: "Review Request Settings",
            detailed_description: "This email prompts the customer to share their feedback by submitting a review of their recent purchase or experience",
            route: "/emails/review-request",
            viewComponent: UpdateReviewRequest
        },
        {
            title: "Review Reminder",
            slug: "review_request",
            description: "Review Reminder Settings",
            detailed_description: "This follow-up email serves as a gentle reminder for the customer to leave a review if they haven't done so yet",
            route: "/emails/review-reminder",
            viewComponent: UpdateReviewReminder
        },
        {
            title: "Photo Request",
            slug: "review_request",
            description: "Review Request Settings",
            detailed_description: "After the customer has submitted a review, this email encourages them to add a photo to enhance their review",
            route: "/emails/review-reminder",
            viewComponent: UpdatePhotoRequest
        },
        {
            title: "Discount Reminder",
            slug: "review_request",
            description: "Discount Reminder Settings",
            detailed_description: "This email reminds the customer of the discount they received for leaving a review, ensuring they make use of the offer",
            route: "/emails/discount-reminder",
            viewComponent: UpdateDiscountReminder
        },
        {
            title: "Reply to Review",
            slug: "review_request",
            description: "Reply to Review Settings",
            detailed_description: "This email notifies the customer when a reply has been posted to their review, keeping them engaged in the conversation",
            route: "/emails/reply-to-review",
            viewComponent: UpdateReviewRequest
        },
    ];

    const EmailComponent = activeEmail?.viewComponent;

    return (
        <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
            <div className="frt-grid frt-grid-cols-1 frt-gap-4">
                {emails.map((item: any, index: number) => {
                    return (
                        <div key={index}
                             className={"frt-shadow-primary frt-rounded-lg frt-border frt-bg-card frt-text-card-foreground frt-shadow-sm frt-flex frt-justify-between frt-gap-2 frt-p-4 frt-items-center"}>
                            <div className={"frt-flex-grow frt-flex frt-flex-col frt-gap-2"}>
                                <span className={"frt-font-extrabold"}>{item.title}</span>
                                <p>{item.description}</p>
                                <p>{item.detailed_description}</p>
                            </div>
                            <div className="frt-flex frt-justify-end frt-gap-1 frt-col-span-1">
                                <Button>
                                    <NavLink to={item.route}>
                                        Update
                                    </NavLink>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeEmail?.slug && view && (
                <Dialog open={view} onOpenChange={setView}>
                    <DialogContent className={"frt-min-h-[40vh] !frt-overflow-scroll !frt-my-4"}
                                   onInteractOutside={(e) => {
                                       e.preventDefault();
                                   }}
                    >
                        <DialogHeader className={"frt-gap-2 frt-m-2"}>
                            <DialogTitle>{activeEmail.title}</DialogTitle>
                            <DialogDescription>
                                {activeEmail.detailed_description}
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <EmailComponent locale={currentLocale}/>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
};

export default EmailSetting;
