import React, {useState} from "react";
import {useLocalState} from "../zustand/localState";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "../ui/card";
import "../../main.css";
import {Button} from "../ui/button";
import {Tabs, TabsList, TabsTrigger} from "../ui/tabs";
import {Dialog, DialogContent} from "../ui/dialog";
import UpdateReviewRequest from "./UpdateReviewRequest";
import UpdateReviewReminder from "./UpdateReviewReminder";
import UpdatePhotoRequest from "./UpdatePhotoRequest";
import UpdateDiscountReminder from "./UpdateDiscountReminder";


const EmailSetting = () => {
    const {localState, setLocalState} = useLocalState();
    const availableLanguages = localState.available_languages;
    const [currentLocale, setCurrentLocale] = useState<string>(localState.current_locale)

    const [view, setView] = useState(false)
    const [activeEmail, setActiveEmail] = useState<any>({})

    const emails = [
        {
            title: "Review Request",
            slug: "review_request",
            description: "Review Request Settings",
            detailed_description: "Encourage your customers to leave a review with an automated email",
            route: "/emails/review-request",
            viewComponent: <UpdateReviewRequest/>
        },
        {
            title: "Review Reminder",
            slug: "review_request",
            description: "Review Reminder Settings",
            detailed_description: "Encourage your customers to leave a review with an automated email",
            route: "/emails/review-reminder",
            viewComponent: <UpdateReviewReminder/>
        },
        {
            title: "Photo Request",
            slug: "review_request",
            description: "Review Request Settings",
            detailed_description: "Encourage your customers to leave a review with an automated email",
            route: "/emails/review-reminder",
            viewComponent: <UpdatePhotoRequest/>
        },
        {
            title: "Discount Reminder",
            slug: "review_request",
            description: "Discount Reminder Settings",
            detailed_description: "Encourage your customers to leave a review with an automated email",
            route: "/emails/discount-reminder",
            viewComponent: <UpdateDiscountReminder/>
        },
        {
            title: "Reply to Review",
            slug: "review_request",
            description: "Reply to Review Settings",
            detailed_description: "Inform your customers once you publicly reply to their review",
            route: "/emails/reply-to-review",
            viewComponent: <UpdateReviewRequest/>
        },
    ];

    return (
        <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
            <div>
                {availableLanguages.length > 0 && (
                    <Tabs defaultValue={currentLocale}>
                        <TabsList className={"!frt-flex-wrap !frt-h-auto !frt-justify-start !frt-gap-1"}>
                            {availableLanguages.map((item: any, index: number) => {
                                return (<TabsTrigger value={item.value}>{item.label}</TabsTrigger>)
                            })}
                        </TabsList>
                    </Tabs>
                )}

            </div>
            <div className="frt-grid frt-grid-cols-3 frt-gap-4">
                {emails.map((item: any, index: number) => {
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.detailed_description}</p>
                            </CardContent>
                            <CardFooter className="frt-flex frt-justify-end frt-gap-1">
                                <Button onClick={() => {
                                    setView(true);
                                    setActiveEmail(item);
                                }}>
                                    View
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {activeEmail?.slug && view && (
                <Dialog open={view} onOpenChange={setView}>
                    <DialogContent>
                        <div>
                            {activeEmail.viewComponent}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
};

export default EmailSetting;
